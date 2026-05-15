<script lang="ts">
  import type { ServiceExample } from "$lib/data/services";

  let { examples }: { examples: ServiceExample[] } = $props();
  let viewportWidth = $state(0);
  let imageRatios = $state<Record<string, number>>({});

  const getAriaLabel = (example: ServiceExample) =>
    [example.title, example.source, example.year].filter(Boolean).join(", ");

  const getExampleKey = (example: ServiceExample) =>
    example.href ?? `${example.title}-${example.source ?? "unknown"}-${example.year ?? "unknown"}`;

  const getEstimatedHeight = (example: ServiceExample) => {
    if (!example.image) {
      return 1.2;
    }

    const ratio = imageRatios[getExampleKey(example)];

    return ratio && ratio > 0 ? 1 / ratio : 0.75;
  };

  const updateImageRatio = (example: ServiceExample, event: Event) => {
    const target = event.currentTarget;

    if (!(target instanceof HTMLImageElement) || !target.naturalWidth || !target.naturalHeight) {
      return;
    }

    const nextRatio = target.naturalWidth / target.naturalHeight;
    const key = getExampleKey(example);

    if (imageRatios[key] === nextRatio) {
      return;
    }

    imageRatios = {
      ...imageRatios,
      [key]: nextRatio,
    };
  };

  const columnCount = $derived(
    viewportWidth >= 1120 ? 3 : viewportWidth >= 760 ? 2 : 1,
  );

  const columns = $derived.by(() => {
    const distributed = Array.from({ length: columnCount }, () => [] as ServiceExample[]);
    const heights = Array.from({ length: columnCount }, () => 0);

    examples.forEach((example, index) => {
      if (index < columnCount) {
        distributed[index].push(example);
        heights[index] += getEstimatedHeight(example);
        return;
      }

      let targetColumn = 0;

      for (let current = 1; current < heights.length; current += 1) {
        if (heights[current] < heights[targetColumn]) {
          targetColumn = current;
        }
      }

      distributed[targetColumn].push(example);
      heights[targetColumn] += getEstimatedHeight(example);
    });

    return distributed;
  });
</script>

<svelte:window bind:innerWidth={viewportWidth} />

<div class="example-masonry" style={`--gallery-columns:${columnCount};`}>
  {#each columns as column}
    <div class="gallery-column">
      {#each column as example}
        <svelte:element
          this={example.href ? "a" : "article"}
          class="gallery-item"
          href={example.href || undefined}
          target={example.href ? "_blank" : undefined}
          rel={example.href ? "noreferrer" : undefined}
          aria-label={example.href ? getAriaLabel(example) : undefined}
        >
          {#if example.image}
            <img
              src={example.image}
              alt={example.title}
              loading="lazy"
              decoding="async"
              onload={(event) => updateImageRatio(example, event)}
            />
            <div class="overlay">
              <div class="meta eyebrow">
                {#if example.source}
                  <span>{example.source}</span>
                {/if}
                {#if example.year}
                  <span>{example.year}</span>
                {/if}
              </div>

              <h3>{example.title}</h3>
            </div>
          {:else}
            <div class="fallback-copy">
              <div class="meta eyebrow">
                {#if example.source}
                  <span>{example.source}</span>
                {/if}
                {#if example.year}
                  <span>{example.year}</span>
                {/if}
              </div>

              <h3>{example.title}</h3>
            </div>
          {/if}
        </svelte:element>
      {/each}
    </div>
  {/each}
</div>

<style>
  .example-masonry {
    display: grid;
    grid-template-columns: repeat(var(--gallery-columns), minmax(0, 1fr));
    gap: 1rem;
    align-items: start;
  }

  .gallery-column {
    display: grid;
    gap: 1rem;
  }

  .gallery-item {
    position: relative;
    display: block;
    width: 100%;
    overflow: clip;
    border: 1px solid var(--color-border-soft);
    background: var(--color-surface-highest);
    text-decoration: none;
    transition:
      transform 220ms ease,
      box-shadow 220ms ease,
      border-color 220ms ease;
  }

  .gallery-item:hover {
    transform: translateY(-0.2rem);
    box-shadow: var(--shadow-ambient);
    border-color: var(--color-border-accent);
  }

  .gallery-item:focus-visible {
    outline-offset: 4px;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    background: var(--color-surface-highest);
    transition: transform 600ms ease;
  }

  .overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.1rem;
    color: white;
    background: linear-gradient(
      180deg,
      rgba(12, 13, 12, 0.2) 0%,
      rgba(12, 13, 12, 0.84) 100%
    );
    opacity: 0;
    transform: translateY(0.35rem);
    transition:
      opacity 220ms ease,
      transform 220ms ease;
    pointer-events: none;
  }

  .gallery-item:hover .overlay,
  .gallery-item:focus-visible .overlay {
    opacity: 1;
    transform: translateY(0);
  }

  .gallery-item:hover img,
  .gallery-item:focus-visible img {
    transform: scale(1.02);
  }

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 0.8rem;
    color: rgba(255, 255, 255, 0.96);
    text-shadow: 0 0.1rem 0.6rem rgba(0, 0, 0, 0.5);
  }

  h3 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.25rem, 2vw, 1.8rem);
    font-weight: 900;
    line-height: 1.02;
    letter-spacing: -0.04em;
    color: white;
    text-shadow: 0 0.15rem 0.8rem rgba(0, 0, 0, 0.55);
  }

  .fallback-copy {
    display: grid;
    gap: 0.9rem;
    min-height: 14rem;
    padding: 1.25rem;
    background: var(--color-surface-lowest);
  }

  .fallback-copy .meta {
    color: var(--color-primary-container);
    text-shadow: none;
  }

  .fallback-copy h3 {
    color: var(--color-ink);
    text-shadow: none;
  }

</style>
