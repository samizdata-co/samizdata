<script lang="ts">
  import type { FeatureCardData } from "$lib/data/site";
  import CardShell from "./CardShell.svelte";
  import MaterialIcon from "../MaterialIcon.svelte";

  let { card, large = false }: { card: FeatureCardData; large?: boolean } =
    $props();
</script>

<CardShell
  class={`card${card.variant === "accent" ? " accent" : ""}${large ? " large" : ""}`}
  aspect="square"
  lgAspect={large ? "wide" : "square"}
>
  <div>
    <MaterialIcon
      name={card.icon === "dashboard" ? "dashboard_customize" : "school"}
      size="36px"
      class="icon"
    />
    <h3>{card.title}</h3>
    <p>{card.description}</p>
  </div>

  {#if card.cta}
    <a href={card.href} class="cta">
      <span>{card.cta}</span>
      <MaterialIcon name="arrow_forward" size="18px" />
    </a>
  {:else if card.label}
    <div class="eyebrow footer-label">{card.label}</div>
  {/if}
</CardShell>

<style>
  :global(.card) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    height: 100%;
    padding: clamp(1.1rem, 3vw, 1.5rem);
    box-sizing: border-box;
  }

  :global(.card.accent) {
    background: var(--color-primary-container);
    color: white;
    box-shadow: 0 1rem 2rem rgba(159, 24, 83, 0.1);
  }

  :global(.card) :global(.icon),
  :global(.card) :global(.material-symbols-outlined) {
    color: var(--color-primary-container);
  }

  :global(.card.accent) :global(.material-symbols-outlined) {
    color: white;
  }

  h3 {
    margin: 0.85rem 0 0.55rem;
    font-family: var(--font-display);
    font-size: clamp(1.45rem, 3.8vw, 2rem);
    font-weight: 900;
    letter-spacing: -0.04em;
    line-height: 1.04;
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  p {
    margin: 0;
    font-size: clamp(0.92rem, 1.4vw, 1rem);
    line-height: 1.5;
    color: var(--color-muted);
    display: -webkit-box;
    line-clamp: 5;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  :global(.card.accent) p {
    color: rgba(255, 255, 255, 0.82);
  }

  .cta {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-family: var(--font-display);
    font-size: clamp(0.68rem, 0.9vw, 0.8rem);
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-primary-container);
    flex-wrap: nowrap;
  }

  .footer-label {
    color: inherit;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  :global(.card.large) {
    padding: clamp(1.2rem, 3vw, 1.7rem);
  }

  @media (max-width: 479px) {
    :global(.card.large) {
      padding: 1rem;
    }

    :global(.card.large) h3 {
      font-size: 1.35rem;
    }

    :global(.card.large) p {
      line-clamp: 4;
      -webkit-line-clamp: 4;
    }
  }

  @media (min-width: 1200px) {
    :global(.card.large) {
      gap: 1.25rem;
      padding: clamp(1.6rem, 2vw, 2.25rem);
    }

    :global(.card.large) h3 {
      margin: 1rem 0 0.7rem;
      font-size: clamp(1.8rem, 2.5vw, 2.5rem);
      line-clamp: 2;
      -webkit-line-clamp: 2;
    }

    :global(.card.large) p {
      font-size: clamp(0.95rem, 1vw, 1.06rem);
      line-height: 1.55;
      line-clamp: 4;
      -webkit-line-clamp: 4;
    }
  }
</style>
