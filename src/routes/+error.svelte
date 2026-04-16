<script lang="ts">
  import { page } from "$app/state";
  import { Button } from "$lib/components/ui/button";
  import Footer from "$lib/components/layout/Footer.svelte";
  import TopNav from "$lib/components/layout/TopNav.svelte";
  import { siteConfig } from "$lib/data/site";
  import {
    getLocaleFromParam,
    localizePath,
    stripLocaleFromPathname,
  } from "$lib/i18n/locales";
  import { ArrowLeft, Compass, Mail } from "@lucide/svelte";

  const locale = $derived(getLocaleFromParam(page.url.pathname.split("/")[1]));
  const pathname = $derived(stripLocaleFromPathname(page.url.pathname));
  const status = $derived(page.status || 500);
  const errorMessage = $derived(page.error?.message);
  const isNotFound = $derived(status === 404);
  const pageCopy = $derived(
    locale === "ro"
      ? {
          title: "Pagina cautata nu exista.",
          body:
            "Linkul poate fi invechit, mutat sau introdus gresit. Incearca una dintre rutele utile de mai jos.",
          eyebrow: "Eroare 404",
          primaryCta: "Inapoi la homepage",
          secondaryCta: "Vezi training",
          contactCta: "Contact",
          genericTitle: "A aparut o problema neasteptata.",
          genericBody:
            "Pagina nu a putut fi afisata corect. Poti reveni la homepage sau incerca din nou peste cateva momente.",
        }
      : {
          title: "The page you were looking for is not here.",
          body:
            "The link may be outdated, moved, or typed incorrectly. Try one of the useful routes below.",
          eyebrow: "Error 404",
          primaryCta: "Back to homepage",
          secondaryCta: "Browse training",
          contactCta: "Contact us",
          genericTitle: "Something unexpected went wrong.",
          genericBody:
            "The page could not be displayed correctly. You can return to the homepage or try again in a moment.",
        },
  );

  const homeHref = $derived(localizePath("/", locale));
  const contactHref = $derived(localizePath("/contact", locale));
</script>

<svelte:head>
  <title>
    {siteConfig.name} • {isNotFound ? pageCopy.title : pageCopy.genericTitle}
  </title>
  <meta
    name="description"
    content={isNotFound ? pageCopy.body : pageCopy.genericBody}
  />
  <meta name="robots" content="noindex" />
</svelte:head>

<TopNav pathname={pathname} localeOverride={locale} />

<main class="error-shell">
  <section class="shell error-grid section-block">
    <div class="error-intro">
      <p class="eyebrow status-line">{pageCopy.eyebrow}</p>
      <h1 class="display-title error-code">{status}</h1>
      <h2 class="error-title">
        {isNotFound ? pageCopy.title : pageCopy.genericTitle}
      </h2>
      <p class="body-copy error-body">
        {isNotFound ? pageCopy.body : pageCopy.genericBody}
      </p>

      <div class="button-row cta-row">
        <Button href={homeHref}>
          <ArrowLeft size={18} strokeWidth={2.25} />
          {pageCopy.primaryCta}
        </Button>
        <Button href="/training" variant="outline">
          <Compass size={18} strokeWidth={2.25} />
          {pageCopy.secondaryCta}
        </Button>
        <Button href={contactHref} variant="outline">
          <Mail size={18} strokeWidth={2.25} />
          {pageCopy.contactCta}
        </Button>
      </div>

      {#if !isNotFound && errorMessage}
        <p class="error-message">{errorMessage}</p>
      {/if}
    </div>
  </section>
</main>

<Footer localeOverride={locale} />

<style>
  .error-shell {
    min-height: 100vh;
    padding-top: 5.5rem;
    background:
      radial-gradient(circle at top left, var(--color-primary-glow), transparent 30%),
      linear-gradient(180deg, var(--color-surface-low), var(--color-surface));
  }

  .error-grid {
    display: grid;
    gap: 2rem;
    justify-items: start;
  }

  .error-intro {
    display: grid;
    gap: 1.5rem;
    max-width: 44rem;
  }

  .status-line {
    color: var(--color-primary-container);
  }

  .error-code {
    margin: 0;
    color: var(--color-primary-container);
    text-shadow: 0 0 2.5rem var(--color-primary-glow);
  }

  .error-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3.25rem);
    line-height: 0.95;
    letter-spacing: -0.04em;
  }

  .error-body {
    max-width: 38rem;
  }

  .cta-row :global(svg) {
    flex-shrink: 0;
  }

  .error-message {
    margin: 0;
    color: var(--color-muted);
    line-height: 1.7;
    max-width: 38rem;
    padding: 0.85rem 1rem;
    background: var(--color-surface-low);
    border-left: 3px solid var(--color-primary-container);
  }

  @media (min-width: 900px) {
    .error-grid {
      min-height: calc(100vh - 5.5rem - 11rem);
      align-items: center;
    }
  }

  @media (max-width: 640px) {
    .error-shell {
      padding-top: 5rem;
    }
  }
</style>
