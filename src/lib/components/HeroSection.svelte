<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  let particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; originalVx: number; originalVy: number }> = [];
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let animationId: number;
  let mouseX = 0;
  let mouseY = 0;
  let currentTextIndex = 0;
  
  const textOptions = ['inform', 'make an impact', 'move people', 'inspire action', 'drive decisions'];
  
  onMount(() => {
    mounted = true;
    
    if (canvas) {
      ctx = canvas.getContext('2d');
      if (ctx) {
        initParticles();
        animate();
      }
    }
    
    // Text cycling animation
    const textInterval = setInterval(() => {
      currentTextIndex = (currentTextIndex + 1) % textOptions.length;
    }, 2000);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      clearInterval(textInterval);
    };
  });
  
  function initParticles() {
    if (!canvas) return;
    
    particles = [];
    const particleCount = window.innerWidth < 768 ? 50 : 100;
    
    for (let i = 0; i < particleCount; i++) {
      const vx = (Math.random() - 0.5) * 0.5;
      const vy = (Math.random() - 0.5) * 0.5;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx,
        vy,
        originalVx: vx,
        originalVy: vy,
        size: Math.random() * 3 + 1
      });
    }
  }
  
  function animate() {
    if (!ctx || !canvas) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles.forEach(particle => {
      // Calculate distance to mouse
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 150;
      
      // Apply mouse influence
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        const angle = Math.atan2(dy, dx);
        particle.vx = particle.originalVx + Math.cos(angle) * force * 0.5;
        particle.vy = particle.originalVy + Math.sin(angle) * force * 0.5;
      } else {
        // Return to original velocity
        particle.vx += (particle.originalVx - particle.vx) * 0.02;
        particle.vy += (particle.originalVy - particle.vy) * 0.02;
      }
      
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;
      
      // Draw particle - ctx is guaranteed to exist here
      if (ctx) {
        ctx.fillStyle = 'rgba(159, 24, 83, 0.6)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    
    // Draw connections
    particles.forEach((particle, i) => {
      particles.slice(i + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100 && ctx) {
          ctx.strokeStyle = `rgba(159, 24, 83, ${0.2 * (1 - distance / 100)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      });
    });
    
    animationId = requestAnimationFrame(animate);
  }
  
  function resizeCanvas() {
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    }
  }
  
  function handleMouseMove(event: MouseEvent) {
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    }
  }
  
  onMount(() => {
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  });
  
  $: currentText = textOptions[currentTextIndex];
</script>

<section class="relative h-screen flex items-center justify-center overflow-hidden bg-background" on:mousemove={handleMouseMove} role="banner">
  <!-- Animated Background -->
  <canvas 
    bind:this={canvas}
    class="absolute inset-0 w-full h-full"
    style="z-index: 1;"
    aria-hidden="true"
  ></canvas>
  
  <!-- Content -->
  <div class="relative z-10 samizdata-container text-center">
    <div class="max-w-4xl mx-auto">
      {#if mounted}
        <h1 class="samizdata-heading samizdata-h1 mb-6 animate-fade-in">
          We turn <span class="text-primary font-bold">data</span> into stories that 
          <span class="inline-block min-w-[200px] text-left">
            {#key currentText}
              <span class="glitch text-primary font-bold" data-text={currentText}>
                {currentText}
              </span>
            {/key}
          </span>.
        </h1>
      {:else}
        <h1 class="samizdata-heading samizdata-h1 mb-6">
          Turn your <span class="text-primary font-bold">data</span> into stories that 
          <span class="text-primary font-bold">inform</span>.
        </h1>
      {/if}
      
      <p class="samizdata-body text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up">
        SAMIZDATA works with media organisations and non-profits to transform complex data into insight. We specialise in research, data storytelling, visualisation, and interactive experiences.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
        <a href="#contact" class="btn btn-primary">
          Let's talk!
        </a>
        <a href="#services" class="btn btn-secondary">
          What we do
        </a>
      </div>
    </div>
  </div>
  
  <!-- Scroll indicator -->
  <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
    <div class="text-center">
      <p class="text-muted-foreground text-sm mb-2">Scroll to explore</p>
      <svg class="w-6 h-6 text-muted-foreground mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </div>
</section>

<style>
  @media (prefers-reduced-motion: reduce) {
    canvas {
      display: none;
    }
  }
  
  .glitch {
    animation: textFadeIn 0.5s ease-in-out;
  }
  
  @keyframes textFadeIn {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
