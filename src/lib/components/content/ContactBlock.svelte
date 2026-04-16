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

<section
  class={`section-block bg-[var(--color-surface)] ${standalone ? "min-h-[calc(100vh-6rem)] pt-48" : ""}`}
  id="contact"
>
  <div class="shell grid grid-cols-1 items-start gap-12 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(24rem,36rem)] min-[900px]:gap-16">
    <div class="intro">
      <h2 class="section-title">{copy.contactBlock.title}</h2>
      <p class="body-copy max-w-128">{copy.contactBlock.body}</p>
    </div>

    <div class="grid gap-5">
      <a
        class="group flex items-center justify-between gap-6 border border-[var(--color-border-soft)] bg-[var(--color-surface-low)] p-8 transition-[background-color,color,transform,border-color] duration-220 hover:-translate-y-[0.15rem] hover:border-[var(--color-primary-container)] hover:bg-[var(--color-primary-container)] hover:text-white max-[640px]:gap-4 max-[640px]:p-8"
        href={`mailto:${siteConfig.email}`}
      >
        <div class="min-w-0">
          <span class="eyebrow mb-[0.6rem] block text-[var(--color-primary-container)] group-hover:text-white/76">
            {copy.contactBlock.email}
          </span>
          <strong class="font-[var(--font-display)] text-[clamp(1.6rem,6vw,3rem)] font-black tracking-[-0.06em] break-words">
            {siteConfig.email}
          </strong>
        </div>
        <ArrowUpRight size={36} strokeWidth={2.1} />
      </a>

      <div class="grid grid-cols-1 gap-5 min-[641px]:grid-cols-2">
        <div class="border border-[var(--color-border-soft)] bg-[var(--color-surface-high)] p-8 text-[var(--color-ink)] max-[640px]:p-8">
          <span class="eyebrow muted">{copy.contactBlock.social}</span>
          <p class="mt-[0.9rem] font-[var(--font-display)] text-[2rem] font-black tracking-[-0.04em] text-[var(--color-ink)]">
            <a href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </p>
        </div>
        <div class="border border-[var(--color-border-soft)] bg-[var(--color-surface-high)] p-8 text-[var(--color-ink)] max-[640px]:p-8">
          <span class="eyebrow muted">{copy.contactBlock.locationLabel}</span>
          <p class="mt-[0.9rem] font-[var(--font-display)] text-[2rem] font-black tracking-[-0.04em] text-[var(--color-ink)]">
            {copy.contactBlock.location}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .intro :global(a) {
    text-decoration: underline;
    text-decoration-color: var(--color-primary-container);
    text-underline-offset: 0.5rem;
  }
</style>
