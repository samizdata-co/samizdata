<script lang="ts">
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import TopNav from '$lib/components/TopNav.svelte';
	import WorkSection from '$lib/components/WorkSection.svelte';
	import { navItems } from '$lib/data/homepage';
</script>

<svelte:head>
	<meta property="og:title" content="SAMIZDATA" />
	<meta
		property="og:description"
		content="SAMIZDATA is a consultancy for data-driven storytelling."
	/>
</svelte:head>

<TopNav items={navItems} />

<main>
	<HeroSection />
	<WorkSection />
	<ContactSection />
</main>

<Footer />
