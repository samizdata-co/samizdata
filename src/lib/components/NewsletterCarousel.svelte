<script lang="ts">
  import { onMount } from 'svelte';
  import * as Carousel from '$lib/components/ui/carousel';
  import type { CarouselAPI } from '$lib/components/ui/carousel/context';
  
  interface NewsletterItem {
    title: string;
    description: string;
    link: string;
    pubDate: string;
    image?: string;
  }
  
  let newsletterItems: NewsletterItem[] = $state([]);
  let loading = $state(true);
  let error = $state(false);
  let api: CarouselAPI | undefined = $state(undefined);
  let current = $state(0);
  let count = $state(0);
  
  // Fallback content for when RSS fails or is loading
  const fallbackItems: NewsletterItem[] = [
    {
      title: "The Art of Data Storytelling",
      description: "Exploring how to transform raw data into compelling narratives that resonate with your audience.",
      link: "https://blog.samizdata.co/",
      pubDate: "2024-01-15",
      image: "/images/placeholder-300x200.svg"
    },
    {
      title: "Visualization Best Practices",
      description: "Essential principles for creating effective and accessible data visualizations.",
      link: "https://blog.samizdata.co/",
      pubDate: "2024-01-10", 
      image: "/images/placeholder-300x200.svg"
    },
    {
      title: "Interactive Dashboards That Work",
      description: "Building user-friendly dashboards that actually help people make better decisions.",
      link: "https://blog.samizdata.co/",
      pubDate: "2024-01-05",
      image: "/images/placeholder-300x200.svg"
    }
  ];
  
  onMount(async () => {
    await loadNewsletterItems();
  });
  
  async function loadNewsletterItems() {
    try {
      // Try to fetch from pre-built static JSON file
      const response = await fetch('/newsletter-items.json');
      
      if (!response.ok) {
        throw new Error('Failed to fetch newsletter items');
      }
      
      const items = await response.json();
      
      if (items && items.length > 0) {
        // Add placeholder images to items that don't have them
        newsletterItems = items.map((item: any) => ({
          ...item,
          image: item.image || "/images/placeholder-300x200.svg"
        }));
      } else {
        throw new Error('No items found');
      }
      
    } catch (err) {
      console.warn('Failed to load newsletter items from static file, using fallback:', err);
      error = true;
      newsletterItems = fallbackItems;
    } finally {
      loading = false;
    }
  }
  
  function setCarouselApi(carouselApi: CarouselAPI | undefined) {
    api = carouselApi;
  }
  
  $effect(() => {
    if (!api) return;
    
    count = api.scrollSnapList().length;
    current = api.selectedScrollSnap();
    
    api.on('select', () => {
      if (api) {
        current = api.selectedScrollSnap();
      }
    });
  });
  
  // Auto-rotate slides
  onMount(() => {
    const interval = setInterval(() => {
      if (api && api.canScrollNext()) {
        api.scrollNext();
      } else if (api) {
        api.scrollTo(0);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  });
</script>

<section id="newsletter" class="samizdata-section bg-muted/30">
  <div class="samizdata-container">
    <div class="max-w-4xl mx-auto text-center mb-12">
      <h2 class="samizdata-heading samizdata-h2 mb-6 text-foreground">
        From our newsletter
      </h2>
      
      <p class="samizdata-body text-muted-foreground">
        Stay up to date with the latest insights, tips, and stories from the world of data communication.
      </p>
      
      {#if error}
        <p class="text-warning text-sm mt-4">
          Unable to load latest posts. Showing featured content.
        </p>
      {/if}
    </div>
    
    {#if loading}
      <!-- Loading state -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each Array(3) as _}
          <div class="card animate-pulse">
            <div class="aspect-video bg-muted rounded-t-lg"></div>
            <div class="p-6">
              <div class="h-4 bg-muted rounded mb-3"></div>
              <div class="h-3 bg-muted rounded mb-2"></div>
              <div class="h-3 bg-muted rounded w-2/3"></div>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <!-- Newsletter items carousel -->
      <Carousel.Root 
        setApi={setCarouselApi}
        opts={{ 
          align: 'start',
          loop: true,
          slidesToScroll: 1
        }}
        class="w-full"
      >
        <Carousel.Content class="-ml-2 md:-ml-4">
          {#each newsletterItems as item}
            <Carousel.Item class="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <article class="card group hover:scale-105 transition-transform duration-300 h-full">
                {#if item.image}
                  <div class="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                {/if}
                
                <div class="p-6">
                  <h3 class="samizdata-heading samizdata-h4 mb-3 text-foreground line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p class="text-muted-foreground mb-4 text-sm line-clamp-3">
                    {item.description}
                  </p>
                  
                  {#if item.pubDate}
                    <p class="text-xs text-muted-foreground mb-4">
                      {new Date(item.pubDate).toLocaleDateString()}
                    </p>
                  {/if}
                  
                  <a 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Read more
                    <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span class="sr-only">(opens in new tab)</span>
                  </a>
                </div>
              </article>
            </Carousel.Item>
          {/each}
        </Carousel.Content>
        
        <!-- Navigation controls -->
        {#if newsletterItems.length > 3}
          <div class="flex items-center justify-center mt-8 space-x-4">
            <Carousel.Previous class="static translate-y-0" />
            
            <!-- Dots indicator -->
            <div class="flex space-x-2">
              {#each Array(count) as _, index}
                <button
                  type="button"
                  class="w-2 h-2 rounded-full transition-colors {index === current ? 'bg-primary' : 'bg-muted'}"
                  aria-label="Go to slide {index + 1}"
                  onclick={() => api?.scrollTo(index)}
                ></button>
              {/each}
            </div>
            
            <Carousel.Next class="static translate-y-0" />
          </div>
        {/if}
      </Carousel.Root>
    {/if}
    
    <!-- Newsletter CTA -->
    <div class="text-center mt-12">
      <a 
        href="https://blog.samizdata.co/" 
        target="_blank" 
        rel="noopener noreferrer"
        class="btn btn-secondary"
      >
        Read the newsletter
        <span class="sr-only">(opens in new tab)</span>
      </a>
    </div>
  </div>
</section>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
