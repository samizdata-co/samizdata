<script lang="ts">
  import { defaultLocale, type AppLocale } from "$lib/i18n/locales";
  import { locale as localeStore } from "$lib/translations";
  import Logo from "./Logo.svelte";

  const copy = {
    en: {
      connect: "Connect",
      rights: "© 2026 SAMIZDATA Ltd.",
      location: "London, UK",
    },
    ro: {
      connect: "Conectare",
      rights: "© 2026 SAMIZDATA Ltd.",
      location: "Londra, Regatul Unit",
    },
  } as const;

  const activeLocale = $derived(
    ($localeStore as AppLocale | undefined) ?? defaultLocale,
  );
  const strings = $derived(copy[activeLocale]);
</script>

<footer class="footer">
  <div class="shell footer-grid">
    <div class="brand">
      <Logo compact />
      <p class="eyebrow muted">{strings.rights}</p>
    </div>

    <div class="connect">
      <p class="eyebrow">{strings.connect}</p>
      <a href="mailto:mail@samizdata.co">mail@samizdata.co</a>
      <span>{strings.location}</span>
    </div>
  </div>
</footer>

<style>
  .footer {
    padding-block: 2.5rem;
    background: var(--color-surface-low);
    border-top: 1px solid rgba(222, 191, 197, 0.2);
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
