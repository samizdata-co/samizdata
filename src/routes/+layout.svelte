<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/media/favicon.ico" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="SAMIZDATA - Transform your data into compelling stories that inform, make an impact, and move people. Data storytelling and visualization services.">
	<meta name="keywords" content="data storytelling, data visualization, infographics, data journalism, data communication">
	
	<!-- Open Graph -->
	<meta property="og:title" content="SAMIZDATA - Data Storytelling & Visualization">
	<meta property="og:description" content="Transform your data into compelling stories that inform, make an impact, and move people.">
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://samizdata.co">
	<meta property="og:image" content="https://samizdata.co/og-image.jpg">
	
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="SAMIZDATA - Data Storytelling & Visualization">
	<meta name="twitter:description" content="Transform your data into compelling stories that inform, make an impact, and move people.">
	<meta name="twitter:image" content="https://samizdata.co/og-image.jpg">
	
	<!-- Preconnect to external domains -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</svelte:head>

<Navigation />

<main id="main">
	{@render children?.()}
</main>

<Footer />
