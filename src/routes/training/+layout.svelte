<script lang="ts">
  import Footer from "$lib/components/layout/Footer.svelte";
  import TopNav from "$lib/components/layout/TopNav.svelte";

  let { children } = $props();
</script>

<TopNav pathname="/training" showLanguageSwitcher={false} />

{@render children()}

<Footer />
