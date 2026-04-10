<script lang="ts">
  import ContactBlock from "$lib/components/content/ContactBlock.svelte";

  let { data } = $props();
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta name="description" content={data.meta.description} />
  <link rel="canonical" href={data.meta.canonical} />
</svelte:head>

<main class="contact-page">
  <ContactBlock standalone />
</main>

<style>
  .contact-page {
    min-height: 100vh;
    background: var(--color-surface);
  }
</style>
