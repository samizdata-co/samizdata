<script lang="ts">
  import type { TrainingPageMeta } from "$lib/training/content";
  import CardShell from "$lib/components/ui/cards/CardShell.svelte";

  let { page }: { page: TrainingPageMeta } = $props();
</script>

<CardShell href={page.href} class="resource-card" aspect="auto">
  <div class="content">
    <p class="eyebrow muted">{page.section}</p>
    <h2>{page.navLabel}</h2>
    {#if page.description}
      <p class="summary">{page.description}</p>
    {/if}
  </div>
</CardShell>

<style>
  :global(.resource-card) {
    position: relative;
    min-height: 14rem;
  }

  .content {
    position: static;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.25rem;
    padding: 1.4rem;
  }

  h2 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.45rem, 2vw, 1.9rem);
    font-weight: 900;
    letter-spacing: -0.04em;
    line-height: 1;
    color: var(--color-ink);
  }

  .summary {
    margin: 0;
    color: var(--color-muted);
    line-height: 1.6;
  }
</style>
