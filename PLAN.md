# Data communications agency website

Your job is to create a modern, accessible and stunning website for a data communications agency named SAMIZDATA.

Because of the focus on data, the website should be visually engaging, easy to navigate, and optimized for performance. It should impress potential clients and showcase the agency's expertise in transforming complex data into compelling narratives. Use subtle animations to enhance the user experience. If you need to use external libraries or resources, make sure they are well-supported, lightweight and performant.

You will use Svelte 5, SvelteKit and shadcn-svelte (already installed). The website will be hosted on GitHub Pages.

Start by creating the homepage. Use placeholders where necessary, like for other pages, we will build those later.

## Technical Requirements

### Deployment Configuration
- Configure SvelteKit with `@sveltejs/adapter-static` for GitHub Pages
- Set up GitHub Actions workflow for automatic deployment
- **Repository**: `nicucalcea/samizdata` 
- **Custom Domain**: `samizdata.co` (configure CNAME)
- **No base path needed** since using custom domain
- Add `.nojekyll` file to prevent Jekyll interference
- Enable prerendering for all pages (`export const prerender = true`)

### Performance Targets
- Lighthouse Performance score: 90+ (aim for high performance)
- First Contentful Paint: < 2s
- Largest Contentful Paint: < 3s
- Cumulative Layout Shift: < 0.1
- Bundle size optimization with tree-shaking
- Optimize for fast loading on standard connections

### Accessibility Standards
- WCAG 2.1 AA compliance
- Semantic HTML structure
- Proper heading hierarchy (h1 → h6)
- Alt text for all images
- Keyboard navigation support
- Focus management for interactive elements
- Color contrast ratios meeting accessibility standards

### Responsive Design
- Mobile-first approach
- Breakpoints: 320px, 768px, 1024px, 1440px
- Touch-friendly interactive elements (min 44px)
- Fluid typography and spacing

## Component Architecture

### Page Structure
- `src/routes/+layout.svelte` - Root layout with navigation and footer
- `src/routes/+page.svelte` - Homepage
- `src/routes/about/+page.svelte` - About page (placeholder)
- `src/routes/contact/+page.svelte` - Contact page (placeholder)

### Reusable Components
- `Navigation.svelte` - Header navigation with responsive menu
- `Footer.svelte` - Site footer with newsletter signup
- `HeroSection.svelte` - Animated hero banner
- `AboutSection.svelte` - About content with team info
- `ServicesSection.svelte` - Services grid layout
- `NewsletterCarousel.svelte` - RSS-fed content carousel
- `WorkExamples.svelte` - Portfolio showcase component
- `Button.svelte` - Consistent button styling (shadcn-svelte)
- `Card.svelte` - Reusable card component (shadcn-svelte)

### Animation Strategy
- Use CSS transforms and opacity for performance
- Intersection Observer API for scroll-triggered animations
- Svelte's built-in transition directives
- **High-tech data animations**:
  - Canvas-based particle systems for data flow visualization
  - CSS animations for floating data points and connections
  - SVG path animations for line charts and graphs
  - Glitch effects using CSS filters and transforms
  - Matrix-style text effects with custom CSS
- Reduced motion support via `prefers-reduced-motion`
- Lightweight animation libraries if needed (Framer Motion, GSAP alternatives)

## External Integrations

### RSS Feed Integration
- Fetch newsletter content from `https://blog.samizdata.co/feed`
- Implement client-side RSS parsing (use `fast-xml-parser` or similar)
- Client-side caching with localStorage (24-hour cache)
- Error handling for failed requests with graceful fallbacks
- Static placeholder content for offline scenarios
- Loading states during RSS fetch

### Newsletter Signup
- Simple form with email validation
- Form validation with proper error states
- **Integration**: Basic form submission (Netlify Forms, Formspree, or similar static-friendly service)
- No complex backend requirements
- Success/error messaging
- GDPR-compliant privacy notice

### Analytics & SEO
- Meta tags and Open Graph implementation
- Structured data markup (JSON-LD)
- Sitemap generation
- robots.txt configuration
- Google Analytics 4 integration (optional)

## Asset Management

### Images
- WebP format with fallbacks
- Responsive image sets with `srcset`
- Lazy loading for below-the-fold content
- Optimize for 1x, 2x, 3x pixel densities

### Icons
- SVG icon system (consider Lucide icons)
- Consistent sizing and styling
- Accessible labels and descriptions

### Fonts
- Google Fonts integration with font-display: swap
- Preload critical font files
- Subset fonts to reduce file size

## Development Guidelines

### Code Quality
- TypeScript strict mode enabled
- ESLint and Prettier configuration
- Husky pre-commit hooks
- Component documentation with JSDoc

### Testing Strategy
- Playwright for E2E testing
- Vitest for unit testing
- Accessibility testing with axe-core
- Visual regression testing (optional)

### Content Management
- **Static content approach**: Content embedded directly in components
- Centralized content in TypeScript constants/objects for easy editing
- No CMS required - content updates via code changes
- Version control for all content changes
- Minimal maintenance overhead

## Homepage Structure & Content

### Navigation Bar
- **Logo**: SAMIZDATA wordmark (placeholder SVG)
- **Home**: Current page indicator
- **Newsletter**: External link to https://blog.samizdata.co/ (opens in new tab)
- **Training**: External link to https://training.nicu.md/ (opens in new tab)
- **About**: Internal navigation (smooth scroll or separate page)
- **Contact**: Internal navigation (smooth scroll or separate page)
- **Mobile**: Hamburger menu with slide-out navigation
- **Accessibility**: Skip to main content link, keyboard navigation

### Hero Section
**Headline**: Turn your **data** into stories that **inform / make an impact / move people**.
- **High-Tech Data Animation**:
  - Animated floating data points/nodes connecting in the background
  - Subtle matrix-style binary code rain effect
  - Interactive data visualization elements (charts, graphs) that morph and transform
  - Glitch effect on emphasized words (**data**, **inform**, **impact**, **move people**)
  - Code-like typing animation revealing key statistics or data points
  - Particle system representing data flow/transformation
  - CSS Grid/flexbox animations showing data structure
- **CTA Button**: "Transform Your Data" or "See Our Work"
- **Visual Elements**: Dynamic data visualization background with subtle tech aesthetic
- **Responsive**: Stack vertically on mobile, maintain high-tech feel with scaled animations

### About Section
**Content**:
SAMIZDATA is the personal information design studio of **Nicu Calcea**, a data strategist and journalist from Moldova. We focus on empowering organisations in Eastern Europe and Central Asia to transform complex data into compelling data stories and visuals that stick in people's minds.

Nicu has crafted data-led stories for companies such as Spotify, Mars Petcare, Oracle, Zoopla and The World Gold Council.

He has published data stories in BBC News, The Guardian, VICE and the New Statesman.

**Portfolio Examples** (Three image cards with titles):
1. **"Spotify's Global Music Trends"**
   - Hero image placeholder (data visualization mockup)
   - Client: Spotify
   - "View Project" link
2. **"Pet Health Data Insights"**
   - Hero image placeholder (infographic mockup)
   - Client: Mars Petcare
   - "View Project" link
3. **"Real Estate Market Analysis"**
   - Hero image placeholder (dashboard mockup)
   - Client: Zoopla
   - "View Project" link

**Layout**: 3-column grid (1 column on mobile), equal height cards with hover effects

### Services Section ("What we do")
**Structure**: Three-column grid (single column on mobile)

1. **Data storytelling**
   - Data journalism
   - Presentations
   - Reports
   
2. **Dataviz**
   - Charts and infographics
   - Social media
   - Video and animation
   
3. **Websites**
   - Data-led stories
   - Dashboards
   
4. **Training**
   - Standalone service highlight

**Visual Treatment**: Icon + heading + description format
**Interactions**: Hover effects, subtle animations on scroll

### Newsletter Section
**Title**: "From our newsletter"
**Content**: Carousel/grid of recent stories
- **Data Source**: RSS feed from `https://blog.samizdata.co/feed`
- **Fallback**: Static placeholder content if RSS fails
- **Structure**: 
  - Article featured image (if available)
  - Title
  - Excerpt (first 150 characters)
  - Publication date
  - "Read more" link to full article
- **Responsive**: 3 items desktop, 2 tablet, 1 mobile
- **Navigation**: Dots or arrows for carousel, auto-rotation optional
- **Performance**: Client-side RSS parsing with caching

### Footer
**Layout**: Three-column layout (stack on mobile)

1. **Newsletter Signup**
   - "Subscribe to our newsletter"
   - Email input field
   - Subscribe button
   - Privacy notice

2. **Contact Information**
   - Physical address (London and Chișinău)
   - Contact link/button
   - Social media links (if applicable)

3. **Branding**
   - "Made with ❤️ in London and Chișinău"
   - Copyright notice
   - Any legal links (Privacy Policy, Terms)

**Styling**: Consistent with overall design system

## Design System

### Color Palette
**Primary Colors**:
- Background: `#faf9f6` (warm off-white)
- Accent: `#9f1853` (deep pink/burgundy)

**IBM Design Language Colors** (to be implemented):
- Cool Gray 10: `#f2f4f8`
- Cool Gray 30: `#dde1e6`
- Cool Gray 70: `#525252`
- Cool Gray 100: `#161616`
- Blue 60: `#0f62fe`
- Green 50: `#24a148`
- Orange 50: `#ff832b`
- Red 50: `#fa4d56`

**Semantic Colors**:
- Text Primary: Cool Gray 100 (`#161616`)
- Text Secondary: Cool Gray 70 (`#525252`)
- Success: Green 50 (`#24a148`)
- Warning: Orange 50 (`#ff832b`)
- Error: Red 50 (`#fa4d56`)
- Info: Blue 60 (`#0f62fe`)

### Typography
**Font Stack**:
- **Headings**: 'Roboto Slab', serif
- **Body**: 'Roboto', sans-serif
- **Monospace**: 'Roboto Mono', monospace (for data/code)

**Type Scale** (responsive using `clamp()`):
- H1: `clamp(2.5rem, 5vw, 4rem)` - Hero headline
- H2: `clamp(2rem, 4vw, 3rem)` - Section headers
- H3: `clamp(1.5rem, 3vw, 2rem)` - Subsections
- H4: `clamp(1.25rem, 2.5vw, 1.5rem)` - Cards/components
- Body: `clamp(1rem, 2vw, 1.125rem)` - Main text
- Small: `0.875rem` - Captions, metadata

**Line Heights**:
- Headings: 1.2
- Body text: 1.6
- Captions: 1.4

### Spacing System
**Base unit**: 8px
**Scale**: 4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px, 128px

**Component Spacing**:
- Section padding: 64px (desktop), 32px (mobile)
- Component margins: 32px
- Element spacing: 16px
- Micro spacing: 8px

### Layout Grid
**Container Max Width**: 1200px
**Gutters**: 24px (desktop), 16px (mobile)
**Columns**: 12-column grid system
**Breakpoints**:
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Large: 1440px+

### Interactive Elements
**Buttons**:
- Primary: Background `#9f1853`, white text
- Secondary: Border `#9f1853`, accent text
- Ghost: Transparent background, accent text
- Border radius: 4px
- Padding: 12px 24px
- Font weight: 500

**Links**:
- Default: Accent color (`#9f1853`)
- Hover: Darker shade with underline
- Focus: Outline with accent color
- Visited: Slightly muted accent

**Cards**:
- Background: White
- Border: 1px solid Cool Gray 30
- Border radius: 8px
- Shadow: `0 2px 8px rgba(0,0,0,0.1)`
- Hover: Subtle lift with increased shadow

### Animation Guidelines
**Timing Functions**:
- Standard: `cubic-bezier(0.4, 0.0, 0.2, 1)` (Material Design)
- Decelerate: `cubic-bezier(0.0, 0.0, 0.2, 1)`
- Accelerate: `cubic-bezier(0.4, 0.0, 1, 1)`

**Durations**:
- Micro interactions: 150ms
- Component transitions: 250ms
- Page transitions: 300ms
- Complex animations: 500ms

**Reduced Motion Support**:
- Respect `prefers-reduced-motion: reduce`
- Provide alternative feedback (color changes, etc.)

## Implementation Checklist

### Setup Phase
- [ ] Install and configure `@sveltejs/adapter-static`
- [ ] Set up GitHub Actions workflow for `samizdata.co` custom domain
- [ ] Configure DNS for `samizdata.co` with CNAME to `nicucalcea.github.io`
- [ ] Add `CNAME` file with `samizdata.co` to static directory
- [ ] Add `.nojekyll` file to static directory
- [ ] Set up TypeScript configuration
- [ ] Install RSS parsing library (`fast-xml-parser`)
- [ ] Configure shadcn-svelte components

### Development Phase
- [ ] Create responsive navigation component
- [ ] Implement high-tech hero section with data animations:
  - [ ] Floating data points/particle system
  - [ ] Matrix-style background effects  
  - [ ] Glitch effects on emphasized text
  - [ ] Interactive data visualization elements
- [ ] Build about section with portfolio image cards (3 examples)
- [ ] Create services section layout
- [ ] Implement newsletter carousel with RSS feed from `https://blog.samizdata.co/feed`
- [ ] Build footer with simple newsletter signup form
- [ ] Add proper meta tags and SEO optimization
- [ ] Implement accessibility features (WCAG 2.1 AA)
- [ ] Add error handling and loading states for RSS
- [ ] Optimize images and assets for web delivery

### Testing Phase
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing
- [ ] Accessibility audit with axe-core
- [ ] Performance testing with Lighthouse
- [ ] RSS feed integration testing
- [ ] Form validation testing

### Deployment Phase
- [ ] Set up GitHub Pages deployment from `nicucalcea/samizdata` repository
- [ ] Configure custom domain `samizdata.co` in GitHub Pages settings
- [ ] Set up DNS records for custom domain
- [ ] Test production build and animations performance
- [ ] Verify RSS feed integration in production
- [ ] Test newsletter signup form functionality
- [ ] Monitor Core Web Vitals and performance metrics