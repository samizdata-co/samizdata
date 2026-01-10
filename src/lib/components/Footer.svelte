<script lang="ts">
  // No form handling needed for iframe embed
</script>

<footer id="contact" class="bg-foreground text-background">
  <div class="samizdata-container py-16">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Contact Information -->
      <div>
        <h2 class="samizdata-heading samizdata-h3 mb-6">
          Get in touch
        </h2>
        
        <p class="samizdata-body mb-8 opacity-90">
          Ready to transform your data into compelling stories? Let's discuss how we can help 
          your organisation communicate more effectively with data.
        </p>
        
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <svg class="w-5 h-5 text-[var(--samizdata-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a 
              href="mailto:mail@samizdata.co" 
              class="hover:text-[var(--samizdata-accent)] transition-colors"
            >
              mail@samizdata.co
            </a>
          </div>
          
          <div class="flex items-center space-x-3">
            <svg class="w-5 h-5 text-[var(--samizdata-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="opacity-90">London, UK</span>
          </div>
        </div>
        
        <!-- Social Links -->
        <div class="mt-8">
          <h3 class="samizdata-heading samizdata-h4 mb-4">Follow us</h3>
          <div class="flex space-x-4">
            <a 
              href="https://blog.samizdata.co/" 
              target="_blank" 
              rel="noopener noreferrer"
              class="p-2 rounded-full bg-background/10 hover:bg-[var(--samizdata-accent)] transition-colors"
              aria-label="Newsletter"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </a>
            
            <a 
              href="https://training.nicu.md/" 
              target="_blank" 
              rel="noopener noreferrer"
              class="p-2 rounded-full bg-background/10 hover:bg-[var(--samizdata-accent)] transition-colors"
              aria-label="Training"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Newsletter Signup -->
      <div>
        <h3 class="samizdata-heading samizdata-h3 mb-6">
          Stay updated
        </h3>
                
        <div class="flex justify-center lg:justify-start">
          <iframe 
            src="https://blog.samizdata.co/embed" 
            width="480" 
            height="320" 
            class="rounded-lg border border-background/20 shadow-sm hover:shadow-md transition-shadow duration-250 max-w-full"
            style="background: var(--background);" 
            frameborder="0" 
            scrolling="no"
            title="Newsletter Subscription"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</footer>
