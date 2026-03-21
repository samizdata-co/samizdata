<script lang="ts">
  import ContactSection from "$lib/components/ContactSection.svelte";
</script>

<main class="contact-page">
  <ContactSection standalone />
</main>

<style>
  .contact-page {
    min-height: 100vh;
    background: var(--color-surface);
  }
</style>
