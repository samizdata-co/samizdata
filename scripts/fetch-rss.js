import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';
import path from 'path';

async function fetchRSSFeed() {
  try {
    console.log('Fetching RSS feed...');
    const response = await fetch('https://blog.samizdata.co/feed');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const xmlText = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text'
    });
    
    const result = parser.parse(xmlText);
    const items = result.rss?.channel?.item || [];
    
    // Ensure items is an array
    const itemsArray = Array.isArray(items) ? items : [items];
    
    const parsedItems = itemsArray.slice(0, 6).map((item) => {
      const title = (item.title || '').slice(0, 100);
      const description = cleanDescription((item.description || '')).slice(0, 200);
      const link = item.link || '';
      const pubDate = item.pubDate || '';
      
      // Try to extract image from enclosure first, then from content
      let image = extractImageFromEnclosure(item) || extractImageFromContent(item['content:encoded'] || item.description || '');
      
      return {
        title,
        description,
        link,
        pubDate,
        image
      };
    });
    
    // Create static directory if it doesn't exist
    const staticDir = path.join(process.cwd(), 'static');
    if (!fs.existsSync(staticDir)) {
      fs.mkdirSync(staticDir, { recursive: true });
    }
    
    // Write to static JSON file
    const outputPath = path.join(staticDir, 'newsletter-items.json');
    fs.writeFileSync(outputPath, JSON.stringify(parsedItems, null, 2));
    
    console.log(`✅ RSS feed cached to ${outputPath}`);
    console.log(`📄 Found ${parsedItems.length} items`);
    
  } catch (error) {
    console.warn('⚠️ Failed to fetch RSS feed:', error);
    
    // Create fallback data
    const fallbackItems = [
      {
        title: "The Art of Data Storytelling",
        description: "Exploring how to transform raw data into compelling narratives that resonate with your audience.",
        link: "https://blog.samizdata.co/",
        pubDate: "2024-01-15",
      },
      {
        title: "Visualization Best Practices",
        description: "Essential principles for creating effective and accessible data visualizations.",
        link: "https://blog.samizdata.co/",
        pubDate: "2024-01-10",
      },
      {
        title: "Interactive Dashboards That Work",
        description: "Building user-friendly dashboards that actually help people make better decisions.",
        link: "https://blog.samizdata.co/",
        pubDate: "2024-01-05",
      }
    ];
    
    const staticDir = path.join(process.cwd(), 'static');
    if (!fs.existsSync(staticDir)) {
      fs.mkdirSync(staticDir, { recursive: true });
    }
    
    const outputPath = path.join(staticDir, 'newsletter-items.json');
    fs.writeFileSync(outputPath, JSON.stringify(fallbackItems, null, 2));
    
    console.log(`📝 Created fallback newsletter data at ${outputPath}`);
  }
}

function cleanDescription(description) {
  // Remove HTML tags and decode entities
  return description
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function extractImageFromEnclosure(item) {
  // Check for enclosure tag with image
  if (item.enclosure && item.enclosure['@_url']) {
    const enclosureUrl = item.enclosure['@_url'];
    
    // Check if the enclosure is an image
    if (enclosureUrl.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i) || 
        (item.enclosure['@_type'] && item.enclosure['@_type'].startsWith('image/'))) {
      return enclosureUrl;
    }
  }
  
  return null;
}

function extractImageFromContent(content) {
  if (!content) return null;
  
  // Try to extract the first image URL from HTML content
  const imgRegex = /<img[^>]+src=["|']([^"|']+)["|'][^>]*>/i;
  const match = content.match(imgRegex);
  
  if (match && match[1]) {
    let imageUrl = match[1];
    
    // If it's a relative URL, make it absolute
    if (imageUrl.startsWith('/')) {
      imageUrl = 'https://blog.samizdata.co' + imageUrl;
    }
    
    // Only return web-compatible image formats
    if (imageUrl.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i)) {
      return imageUrl;
    }
  }
  
  return null;
}

fetchRSSFeed();
