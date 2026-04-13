<script lang="ts">
  import { page } from "$app/state";
  import { trainingNav } from "$lib/training/content";
  import type { Snippet } from "svelte";

  let {
    title,
    description,
    children,
  }: {
    title: string;
    description?: string;
    children?: Snippet;
  } = $props();
</script>

<section class="training-shell section-block-tight">
  <div class="shell">
    <div class="content">
      <header class="page-head">
        <p class="eyebrow muted">Open Training Library</p>
        <h1>{title}</h1>
        {#if description}
          <p class="lead">{description}</p>
        {/if}
      </header>

      <aside class="sidebar surface-card-muted">
        {#each trainingNav as section}
          <div class="nav-section">
            <h2>{section.title}</h2>
            <nav aria-label={section.title}>
              {#each section.items as item}
                <a href={item.href} aria-current={page.url.pathname === item.href ? "page" : undefined}>
                  {item.title}
                </a>
              {/each}
            </nav>
          </div>
        {/each}
      </aside>

      <article class="prose surface-card">
        {@render children?.()}
      </article>
    </div>
  </div>
</section>

<style>
  .training-shell {
    background: var(--color-surface-low);
    padding-top: clamp(8rem, 12vw, 10rem);
    padding-bottom: clamp(3rem, 6vw, 5rem);
  }

  .sidebar,
  .prose {
    border: 1px solid var(--color-border-soft);
  }

  .sidebar {
    margin-bottom: 1.25rem;
    padding: 1.25rem;
  }

  .nav-section + .nav-section {
    margin-top: 1.4rem;
    padding-top: 1.4rem;
    border-top: 1px solid var(--color-border-soft);
  }

  .nav-section h2 {
    margin: 0 0 0.7rem;
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: -0.03em;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  nav a {
    display: inline-flex;
    align-items: center;
    min-height: 2.25rem;
    padding: 0.35rem 0.7rem;
    border: 1px solid var(--color-border-soft);
    color: var(--color-muted);
    font-size: 0.875rem;
    line-height: 1.25;
    background: var(--color-surface-lowest);
  }

  nav a:hover,
  nav a[aria-current="page"] {
    color: var(--color-primary-container);
    border-color: var(--color-border-accent);
  }

  nav a[aria-current="page"] {
    font-weight: 700;
    background: var(--color-primary-glow);
  }

  .content {
    min-width: 0;
    width: min(100%, 56rem);
    margin: 0 auto;
  }

  .page-head {
    margin-bottom: 1rem;
    padding-top: 0.5rem;
  }

  .page-head h1 {
    margin: 0.35rem 0 0;
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: 900;
    letter-spacing: -0.06em;
    line-height: 0.92;
  }

  .lead {
    margin: 0.85rem 0 0;
    max-width: 42rem;
    color: var(--color-muted);
    font-size: 1.1rem;
    line-height: 1.6;
  }

  .prose {
    padding: clamp(1.5rem, 3vw, 3rem);
    background: var(--color-surface-lowest);
  }
</style>
