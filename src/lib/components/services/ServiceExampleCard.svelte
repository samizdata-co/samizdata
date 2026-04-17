<script lang="ts">
  import { ArrowUpRight } from "@lucide/svelte";
  import CardShell from "$lib/components/ui/cards/CardShell.svelte";
  import type { ServiceExample } from "$lib/data/services";

  let {
    example,
    labels,
  }: {
    example: ServiceExample;
    labels: {
      publication: string;
      project: string;
      visit: string;
    };
  } = $props();
</script>

<CardShell
  href={example.href}
  target="_blank"
  rel="noreferrer"
  variant={example.image ? "media" : "surface"}
  class="example-card"
  aspect="auto"
>
  <div class:with-image={Boolean(example.image)} class="example-body">
    {#if example.image}
      <div class="media-frame">
        <img src={example.image} alt={example.title} loading="lazy" decoding="async" />
      </div>
    {/if}

    <div class="example-copy">
      <div class="example-meta">
        <span class="meta-kind eyebrow">
          {example.kind === "publication" ? labels.publication : labels.project}
        </span>

        <div class="meta-details">
          {#if example.source}
            <span>{example.source}</span>
          {/if}
          {#if example.year}
            <span>{example.year}</span>
          {/if}
        </div>
      </div>

      <h3>{example.title}</h3>
      <p>{example.summary}</p>

      <span class="visit-link">
        {labels.visit}
        <ArrowUpRight size={18} strokeWidth={2.2} />
      </span>
    </div>
  </div>
</CardShell>

<style>
  :global(.example-card) {
    height: 100%;
  }

  .example-body {
    display: grid;
    height: 100%;
    background: var(--color-surface-lowest);
  }

  .example-body.with-image {
    grid-template-columns: 1fr;
  }

  .media-frame {
    min-height: 16rem;
    border-bottom: 1px solid var(--color-border-soft);
    background: var(--color-surface-high);
  }

  .media-frame img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .example-copy {
    display: grid;
    gap: 0.9rem;
    padding: 1.25rem;
  }

  .example-meta {
    display: grid;
    gap: 0.45rem;
  }

  .meta-kind {
    color: var(--color-primary-container);
  }

  .meta-details {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    font-size: 0.95rem;
    line-height: 1.4;
    color: var(--color-muted);
  }

  .meta-details span + span::before {
    content: "•";
    margin-right: 0.75rem;
    color: var(--color-border-accent);
  }

  h3 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.35rem, 2vw, 1.8rem);
    font-weight: 900;
    line-height: 1.02;
    letter-spacing: -0.04em;
  }

  p {
    margin: 0;
    color: var(--color-muted);
    line-height: 1.65;
  }

  .visit-link {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    margin-top: auto;
    font-family: var(--font-display);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-primary-container);
  }

  @media (min-width: 900px) {
    .example-body.with-image {
      grid-template-columns: minmax(13rem, 16rem) minmax(0, 1fr);
    }

    .media-frame {
      min-height: 100%;
      border-right: 1px solid var(--color-border-soft);
      border-bottom: 0;
    }
  }
</style>
