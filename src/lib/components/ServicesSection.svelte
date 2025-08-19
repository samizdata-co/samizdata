<script lang="ts">
  const services = [
    {
      title: "Data storytelling",
      description: "Transform complex datasets into compelling narratives that engage and inform your audience.",
      items: ["Data journalism", "Reports"],
      icon: "📊"
    },
    {
      title: "Dataviz",
      description: "Create stunning visual representations of your data that make complex information accessible.",
      items: ["Charts and infographics", "Video and animation"],
      icon: "📈"
    },
    {
      title: "Websites", 
      description: "Build interactive digital experiences that bring your data stories to life.",
      items: ["Data-led stories", "Dashboards"],
      icon: "💻"
    },
    {
      title: "Training",
      description: "Empower your team with the skills to create impactful data visualizations and stories.",
      items: ["Workshops", "Custom curricula"],
      icon: "🎓",
      highlight: true
    }
  ];
</script>

<section id="services" class="samizdata-section bg-background">
  <div class="samizdata-container">
    <div class="max-w-4xl mx-auto text-center mb-16">
      <h2 class="samizdata-heading samizdata-h2 mb-6 text-foreground">
        What we do
      </h2>
      
      <p class="samizdata-body text-muted-foreground max-w-2xl mx-auto">
        We offer comprehensive data communication services to help you tell better stories with your data.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each services as service}
        <div class="card group {service.highlight ? 'ring-2 ring-primary ring-opacity-50' : ''}">
          <div class="p-6 text-center">
            <!-- Icon -->
            <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {service.icon}
            </div>
            
            <!-- Title -->
            <h3 class="samizdata-heading samizdata-h4 mb-4 text-foreground">
              {service.title}
              {#if service.highlight}
                <span class="inline-block ml-2 px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
                  Featured
                </span>
              {/if}
            </h3>
            
            <!-- Description -->
            <p class="text-muted-foreground mb-4 text-sm">
              {service.description}
            </p>
            
            <!-- Service Items -->
            <ul class="space-y-2">
              {#each service.items as item}
                <li class="text-sm text-foreground font-medium">
                  • {item}
                </li>
              {/each}
            </ul>
            
            {#if service.highlight}
              <div class="mt-6">
                <a 
                  href="https://training.nicu.md/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="btn btn-primary btn-sm"
                >
                  Learn More
                  <span class="sr-only">(opens in new tab)</span>
                </a>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
    
    <!-- Call to Action -->
    <div class="text-center mt-16">
      <p class="samizdata-body text-muted-foreground mb-6">
        Ready to transform your data into impactful stories?
      </p>
      
      <a href="#contact" class="btn btn-primary">
        Get Started
      </a>
    </div>
  </div>
</section>

<style>
  .btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    min-height: 36px;
  }
</style>
