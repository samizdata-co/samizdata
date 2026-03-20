<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import TopNav from '$lib/components/TopNav.svelte';

	let { children, data } = $props();

	const descriptions = {
		en: 'SAMIZDATA is a consultancy for data-driven storytelling.',
		ro: 'SAMIZDATA este o consultanta de storytelling bazat pe date.'
	} as const;
</script>

<svelte:head>
	<title>SAMIZDATA</title>
	<meta name="description" content={descriptions[data.locale]} />
	<meta property="og:title" content="SAMIZDATA" />
	<meta property="og:description" content={descriptions[data.locale]} />
</svelte:head>

<TopNav pathname={data.pathname} />

{@render children()}

<Footer />
