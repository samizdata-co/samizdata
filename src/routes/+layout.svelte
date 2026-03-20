<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>SAMIZDATA</title>
	<meta
		name="description"
		content="SAMIZDATA is a consultancy for data-driven storytelling."
	/>
</svelte:head>

{@render children()}
