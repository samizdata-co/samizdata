<script lang="ts">
  import {
    ArrowRight,
    ChartNoAxesCombined,
    Database,
    FileSearch,
    GraduationCap,
  } from "@lucide/svelte";
  import type { ServiceCardData } from "$lib/data/site";
  import CardShell from "./CardShell.svelte";

  type ServiceCardIcon =
    | "file-search"
    | "chart-no-axes-combined"
    | "database"
    | "graduation-cap";

  let { card, large = false }: { card: ServiceCardData; large?: boolean } =
    $props();

  const external = $derived(card.href.startsWith("http"));
  const iconComponents = {
    "file-search": FileSearch,
    "chart-no-axes-combined": ChartNoAxesCombined,
    database: Database,
    "graduation-cap": GraduationCap,
  } satisfies Record<ServiceCardIcon, typeof FileSearch>;
  const Icon = $derived(iconComponents[card.icon as ServiceCardIcon]);
</script>

<CardShell
  href={card.href}
  target={external ? "_blank" : undefined}
  rel={external ? "noreferrer" : undefined}
  class={`service-card${card.variant === "accent" ? " accent" : ""}${large ? " large" : ""}`}
  aspect="square"
  lgAspect={large ? "wide" : "square"}
>
  <div class="content">
    <div>
      <Icon size={36} class="icon" />
      <h3>{card.title}</h3>
      <p>{card.description}</p>
    </div>

    {#if card.cta}
      <div class="cta">
        <span>{card.cta}</span>
        <ArrowRight size={18} strokeWidth={2.2} />
      </div>
    {:else if card.label}
      <div class="eyebrow footer-label">{card.label}</div>
    {/if}
  </div>
</CardShell>

<style>
  :global(.service-card) {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: clamp(1.15rem, 3vw, 1.6rem);
    color: inherit;
  }

  .content {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
  }

  :global(.service-card.accent) {
    background: var(--color-primary-container);
    color: white;
    box-shadow: var(--shadow-ambient);
  }

  :global(.service-card) :global(.icon),
  :global(.service-card) :global(svg) {
    color: var(--color-primary-container);
  }

  :global(.service-card.accent) :global(.icon),
  :global(.service-card.accent) :global(svg) {
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
    line-height: 1.55;
    color: var(--color-muted);
    display: -webkit-box;
    line-clamp: 5;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  :global(.service-card.accent) p {
    color: rgba(255, 255, 255, 0.84);
  }

  .cta,
  .footer-label {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    color: inherit;
  }

  .cta {
    font-family: var(--font-display);
    font-size: clamp(0.68rem, 0.9vw, 0.8rem);
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-primary-container);
  }

  .footer-label {
    padding-top: 0.9rem;
    border-top: 1px solid rgba(255, 255, 255, 0.18);
  }

  :global(.service-card.large) {
    padding: clamp(1.25rem, 3vw, 1.85rem);
  }

  @media (max-width: 479px) {
    :global(.service-card.large) {
      padding: 1rem;
    }

    :global(.service-card.large) h3 {
      font-size: 1.35rem;
    }

    :global(.service-card.large) p {
      line-clamp: 4;
      -webkit-line-clamp: 4;
    }
  }

  @media (min-width: 1200px) {
    :global(.service-card.large) {
      padding: clamp(1.6rem, 2vw, 2.25rem);
    }

    :global(.service-card.large) h3 {
      margin: 1rem 0 0.7rem;
      font-size: clamp(1.8rem, 2.5vw, 2.5rem);
      line-clamp: 2;
      -webkit-line-clamp: 2;
    }

    :global(.service-card.large) p {
      font-size: clamp(0.95rem, 1vw, 1.06rem);
      line-height: 1.55;
      line-clamp: 4;
      -webkit-line-clamp: 4;
    }
  }
</style>
