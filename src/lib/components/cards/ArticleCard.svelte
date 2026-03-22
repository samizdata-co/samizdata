<script lang="ts">
  import type { ArticleCardData } from "$lib/data/site";
  import CardShell from "./CardShell.svelte";

  let { card }: { card: ArticleCardData } = $props();
</script>

<CardShell
  class="article-card"
  href={card.href}
  target="_blank"
  rel="noreferrer"
  variant="media"
>
  <img src={card.image} alt={card.headline} />
  <div class="overlay">
    <div class="meta eyebrow">
      <span>{card.publication}</span>
      <span>{card.year}</span>
    </div>
    <div class="content">
      <h3>{card.headline}</h3>
    </div>
  </div>
</CardShell>

<style>
  :global(.article-card) {
    display: flex;
    color: var(--color-surface);
  }

  img,
  .overlay {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  img {
    object-fit: cover;
    transition: transform 600ms ease;
  }

  .overlay {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.75rem;
    background: linear-gradient(
      180deg,
      rgba(12, 13, 12, 0.5) 0%,
      rgba(12, 13, 12, 0.97) 100%
    );
  }

  :global(.card-shell:hover .article-card) img {
    transform: scale(1.04);
  }

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 1rem;
    color: rgba(255, 255, 255, 0.96);
    text-shadow: 0 0.1rem 0.6rem rgba(0, 0, 0, 0.5);
  }

  .content {
    display: flex;
    align-items: end;
    min-height: 100%;
  }

  h3 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.25rem, 2vw, 1.8rem);
    font-weight: 900;
    letter-spacing: -0.04em;
    text-shadow: 0 0.15rem 0.8rem rgba(0, 0, 0, 0.55);
  }
</style>
