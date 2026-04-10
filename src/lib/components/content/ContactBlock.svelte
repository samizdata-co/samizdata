<script lang="ts">
  import { ArrowUpRight } from "@lucide/svelte";
  import { defaultLocale, type AppLocale } from "$lib/i18n/locales";
  import { getMessages } from "$lib/i18n/messages";
  import { locale as localeStore } from "$lib/translations";
  import { siteConfig } from "$lib/data/site";

  let { standalone = false }: { standalone?: boolean } = $props();

  const activeLocale = $derived(
    ($localeStore as AppLocale | undefined) ?? defaultLocale,
  );
  const copy = $derived(getMessages(activeLocale));
</script>

<section class:standalone class="contact section-block" id="contact">
  <div class="shell contact-grid">
    <div class="intro">
      <h2 class="section-title">{copy.contactBlock.title}</h2>
      <p class="body-copy">{copy.contactBlock.body}</p>
    </div>

    <div class="stack">
      <a class="email-card surface-card-muted" href={`mailto:${siteConfig.email}`}>
        <div>
          <span class="eyebrow">{copy.contactBlock.email}</span>
          <strong>{siteConfig.email}</strong>
        </div>
        <ArrowUpRight size={36} strokeWidth={2.1} />
      </a>

      <div class="meta-grid">
        <div class="meta-card surface-card-strong">
          <span class="eyebrow muted">{copy.contactBlock.social}</span>
          <p>
            <a href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </p>
        </div>
        <div class="meta-card surface-card-strong">
          <span class="eyebrow muted">{copy.contactBlock.locationLabel}</span>
          <p>{copy.contactBlock.location}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .contact {
    background: var(--color-surface);
  }

  .contact.standalone {
    padding-top: 12rem;
    min-height: calc(100vh - 6rem);
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    align-items: start;
  }

  h2 {
    margin: 0 0 2rem;
  }

  .intro p {
    max-width: 32rem;
  }

  .stack {
    display: grid;
    gap: 1.25rem;
  }

  .email-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    padding: 2.5rem;
    transition:
      background-color 220ms ease,
      color 220ms ease,
      transform 220ms ease,
      border-color 220ms ease;
  }

  .email-card > div {
    min-width: 0;
  }

  .email-card:hover {
    background: var(--color-primary-container);
    border-color: var(--color-primary-container);
    color: white;
    transform: translateY(-0.15rem);
  }

  .email-card .eyebrow {
    display: block;
    margin-bottom: 0.6rem;
    color: var(--color-primary-container);
  }

  .email-card:hover .eyebrow {
    color: rgba(255, 255, 255, 0.76);
  }

  .email-card strong {
    font-family: var(--font-display);
    font-size: clamp(2rem, 6vw, 3rem);
    font-weight: 900;
    letter-spacing: -0.06em;
    overflow-wrap: anywhere;
  }

  .meta-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
  }

  .meta-card {
    padding: 2rem;
    color: var(--color-ink);
  }

  .meta-card p {
    margin-top: 0.9rem;
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 900;
    letter-spacing: -0.04em;
    color: var(--color-ink);
  }

  .meta-card a {
    text-decoration: underline;
    text-decoration-color: var(--color-primary-container);
    text-underline-offset: 0.5rem;
  }

  @media (min-width: 900px) {
    .contact-grid {
      grid-template-columns: minmax(0, 1fr) minmax(24rem, 36rem);
      gap: 4rem;
    }
  }

  @media (max-width: 640px) {
    .email-card,
    .meta-card {
      padding: 2rem;
    }

    .email-card {
      gap: 1rem;
    }

    .email-card strong {
      font-size: clamp(1.6rem, 6vw, 2.3rem);
    }

    .meta-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
