<script lang="ts">
  import { page } from "$app/state";
  import TrainingShell from "$lib/components/training/TrainingShell.svelte";
  import { siteConfig } from "$lib/data/site";
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

  const canonical = $derived(`${siteConfig.url}${page.url.pathname}`);
</script>

<svelte:head>
  <title>{siteConfig.name} • {title}</title>
  {#if description}
    <meta name="description" content={description} />
  {/if}
  <link rel="canonical" href={canonical} />
</svelte:head>

<TrainingShell {title} {description}>
  {@render children?.()}
</TrainingShell>
