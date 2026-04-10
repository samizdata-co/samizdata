<script lang="ts">
  import { defaultLocale, type AppLocale } from "$lib/i18n/locales";
  import { getMessages } from "$lib/i18n/messages";
  import { locale as localeStore } from "$lib/translations";
  import { siteConfig } from "$lib/data/site";
  import Logo from "$lib/components/ui/Logo.svelte";

  const activeLocale = $derived(
    ($localeStore as AppLocale | undefined) ?? defaultLocale,
  );
  const copy = $derived(getMessages(activeLocale));
</script>

<footer class="footer section-block-tight">
  <div class="shell footer-grid">
    <div class="brand">
      <Logo compact />
      <p class="eyebrow muted">{copy.footer.rights}</p>
    </div>

    <div class="connect">
      <p class="eyebrow">{copy.footer.connect}</p>
      <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      <span>{copy.footer.location}</span>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: var(--color-surface-low);
    border-top: 1px solid var(--color-border-soft);
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .brand,
  .connect {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .connect a,
  .connect span {
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-muted);
  }

  .connect .eyebrow {
    color: var(--color-ink);
    font-weight: 900;
  }

  .connect a:hover {
    text-decoration: underline;
    text-decoration-color: var(--color-primary-container);
    text-underline-offset: 0.3rem;
  }

  @media (min-width: 820px) {
    .footer-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      align-items: end;
      gap: 2rem;
    }
  }
</style>
