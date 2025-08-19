<script lang="ts">
  const portfolioExamples = [
    {
      title: "Spotify's Global Music Trends",
      description: "Data visualization exploring worldwide music preferences and streaming patterns.",
      image: "/images/placeholder-400x300.svg",
      link: "#"
    },
    {
      title: "Pet Health Data Insights",
      description: "Interactive infographic revealing key trends in pet health and care.",
      image: "/images/placeholder-400x300.svg", 
      link: "#"
    },
    {
      title: "Real Estate Market Analysis",
      description: "Comprehensive dashboard analyzing property market dynamics and forecasts.",
      image: "/images/placeholder-400x300.svg",
      link: "#"
    }
  ];
</script>

<section id="about" class="samizdata-section bg-muted/30">
  <div class="samizdata-container">
    <div class="max-w-4xl mx-auto text-center mb-16">
      <h2 class="samizdata-heading samizdata-h2 mb-6 text-foreground">
        About SAMIZDATA
      </h2>
      
      <div class="samizdata-body text-foreground space-y-6 text-left">
        <p>
          SAMIZDATA is the personal information design studio of <strong>Nicu Calcea</strong>, 
          a data strategist and journalist from Moldova. We focus on empowering organisations 
          in Eastern Europe and Central Asia to transform complex data into compelling data 
          stories and visuals that stick in people's minds.
        </p>
        
        <p>
          Nicu has crafted data-led stories for companies such as Spotify, Mars Petcare, 
          Oracle, Zoopla and The World Gold Council.
        </p>
        
        <p>
          He has published data stories in BBC News, The Guardian, VICE and the New Statesman.
        </p>
      </div>
    </div>
    
    <!-- Portfolio Examples -->
    <!-- <div class="mb-16">
      <h3 class="samizdata-heading samizdata-h3 text-center mb-12 text-foreground">
        Featured Work
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each portfolioExamples as example}
          <div class="card group hover:scale-105 transition-transform duration-300">
            <div class="aspect-video bg-muted rounded-t-lg overflow-hidden">
              <img 
                src={example.image} 
                alt={example.title}
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            
            <div class="p-6">
              <h4 class="samizdata-heading samizdata-h4 mb-3 text-foreground">
                {example.title}
              </h4>
              
              <p class="text-muted-foreground mb-4 text-sm">
                {example.description}
              </p>
              
              <a 
                href={example.link}
                class="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
              >
                View Project
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        {/each}
      </div>
    </div> -->
  </div>
</section>
