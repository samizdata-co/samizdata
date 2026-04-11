<script lang="ts">
  import type { Snippet } from "svelte";

  type Aspect = "square" | "wide" | "auto";
  type Variant = "surface" | "media";

  const aspectPadding = (aspect: Aspect) => {
    if (aspect === "square") return "100%";
    if (aspect === "wide") {
      return "calc((100% - var(--card-grid-gap, 0rem)) / 2)";
    }

    return "0";
  };

  let {
    href,
    target,
    rel,
    aspect = "square",
    mdAspect,
    lgAspect,
    variant = "surface",
    class: className = "",
    children,
  }: {
    href?: string;
    target?: string;
    rel?: string;
    aspect?: Aspect;
    mdAspect?: Aspect;
    lgAspect?: Aspect;
    variant?: Variant;
    class?: string;
    children?: Snippet;
  } = $props();

  const baseAspect = $derived(aspect);
  const tabletAspect = $derived(mdAspect ?? baseAspect);
  const desktopAspect = $derived(lgAspect ?? tabletAspect);
  const isAuto = $derived(
    baseAspect === "auto" ||
      tabletAspect === "auto" ||
      desktopAspect === "auto",
  );
  const aspectStyle = $derived(
    !isAuto
      ? `--card-aspect-base:${aspectPadding(baseAspect)};--card-aspect-md:${aspectPadding(tabletAspect)};--card-aspect-lg:${aspectPadding(desktopAspect)};`
      : undefined,
  );
</script>

<svelte:element
  this={href ? "a" : "article"}
  class="card-shell"
  class:has-aspect={!isAuto}
  class:aspect-auto={isAuto}
  class:variant-media={variant === "media"}
  {href}
  target={href ? target : undefined}
  rel={href ? rel : undefined}
  style={aspectStyle}
>
  <div class={`card-body ${className}`.trim()}>
    {@render children?.()}
  </div>
</svelte:element>

<style>
  .card-shell {
    position: relative;
    display: block;
    align-self: start;
    overflow: clip;
    border: 1px solid var(--color-border-soft);
    background: var(--color-surface-lowest);
    text-decoration: none;
    transition:
      transform 220ms ease,
      box-shadow 220ms ease,
      background-color 220ms ease,
      border-color 220ms ease;
  }

  .card-body {
    position: absolute;
    inset: 0;
  }

  .card-shell.aspect-auto {
    height: 100%;
    align-self: stretch;
  }

  .aspect-auto .card-body {
    position: relative;
    height: 100%;
  }

  .has-aspect::before {
    content: "";
    display: block;
    padding-top: var(--card-aspect-base);
  }

  .card-shell:hover {
    transform: translateY(-0.2rem);
    box-shadow: var(--shadow-ambient);
    border-color: var(--color-border-accent);
  }

  .card-shell:focus-visible {
    outline-offset: 4px;
  }

  .variant-media {
    background: var(--color-surface-highest);
  }

  @media (min-width: 768px) {
    .has-aspect::before {
      padding-top: var(--card-aspect-md);
    }
  }

  @media (min-width: 1200px) {
    .has-aspect::before {
      padding-top: var(--card-aspect-lg);
    }
  }
</style>
