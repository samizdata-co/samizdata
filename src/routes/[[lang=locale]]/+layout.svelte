<script lang="ts">
  import icon from "$lib/assets/icon.png";
  import Footer from "$lib/components/layout/Footer.svelte";
  import TopNav from "$lib/components/layout/TopNav.svelte";
  import { siteConfig } from "$lib/data/site";

  let { children, data } = $props();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    email: siteConfig.email,
    sameAs: [siteConfig.linkedinUrl],
  };

  const organizationSchemaJson = JSON.stringify(organizationSchema);
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta name="description" content={data.meta.description} />
  <link rel="canonical" href={data.meta.canonical} />
  {#each data.meta.alternates as alternate}
    <link rel="alternate" hreflang={alternate.locale} href={alternate.href} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={data.meta.alternates[0].href} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={siteConfig.name} />
  <meta property="og:title" content={data.meta.title} />
  <meta property="og:description" content={data.meta.description} />
  <meta property="og:url" content={data.meta.canonical} />
  <meta property="og:image" content={icon} />
  <meta property="og:locale" content={data.locale === "ro" ? "ro_RO" : "en_GB"} />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content={data.meta.title} />
  <meta name="twitter:description" content={data.meta.description} />
  <meta name="twitter:image" content={icon} />
  {@html `<script type="application/ld+json">${organizationSchemaJson}<\/script>`}
</svelte:head>

<TopNav pathname={data.pathname} />

{@render children()}

<Footer />
