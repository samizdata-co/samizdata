<script lang="ts">
  import { onMount } from 'svelte';
  
  let isMenuOpen = false;
  let scrolled = false;
  
  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
  
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };
  
  const closeMenu = () => {
    isMenuOpen = false;
  };
</script>

<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" class:bg-background={scrolled} class:shadow-sm={scrolled}>
  <div class="samizdata-container">
    <div class="flex items-center justify-between py-4">
      <!-- Logo -->
      <a href="/" class="text-2xl font-bold hover:opacity-80 transition-colors samizdata-logo" style="color: #404040;">
        SAMIZDATA.CO
      </a>
      
      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-8">
        <a href="/" class="text-foreground hover:text-primary transition-colors">Home</a>
        <a href="https://blog.samizdata.co/" target="_blank" rel="noopener noreferrer" 
           class="text-foreground hover:text-primary transition-colors">
          Newsletter
          <span class="sr-only">(opens in new tab)</span>
        </a>
        <a href="https://training.nicu.md/" target="_blank" rel="noopener noreferrer"
           class="text-foreground hover:text-primary transition-colors">
          Training
          <span class="sr-only">(opens in new tab)</span>
        </a>
        <a href="#about" class="text-foreground hover:text-primary transition-colors">About</a>
        <a href="#contact" class="text-foreground hover:text-primary transition-colors">Contact</a>
      </div>
      
      <!-- Mobile Menu Button -->
      <button 
        type="button"
        class="md:hidden p-2 text-foreground hover:text-primary transition-colors"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        on:click={toggleMenu}
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {#if isMenuOpen}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          {:else}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          {/if}
        </svg>
      </button>
    </div>
    
    <!-- Mobile Navigation Menu -->
    {#if isMenuOpen}
      <div class="md:hidden border-t border-border">
        <div class="py-4 space-y-4">
          <a href="/" class="block text-foreground hover:text-primary transition-colors" on:click={closeMenu}>
            Home
          </a>
          <a href="https://blog.samizdata.co/" target="_blank" rel="noopener noreferrer"
             class="block text-foreground hover:text-primary transition-colors" on:click={closeMenu}>
            Newsletter
            <span class="sr-only">(opens in new tab)</span>
          </a>
          <a href="https://training.nicu.md/" target="_blank" rel="noopener noreferrer"
             class="block text-foreground hover:text-primary transition-colors" on:click={closeMenu}>
            Training
            <span class="sr-only">(opens in new tab)</span>
          </a>
          <a href="#about" class="block text-foreground hover:text-primary transition-colors" on:click={closeMenu}>
            About
          </a>
          <a href="#contact" class="block text-foreground hover:text-primary transition-colors" on:click={closeMenu}>
            Contact
          </a>
        </div>
      </div>
    {/if}
  </div>
</nav>

<!-- Skip to main content link for accessibility -->
<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded">
  Skip to main content
</a>
