<script lang="ts">
  import {
    defaultLocale,
    localizePath,
    type AppLocale,
  } from "$lib/i18n/locales";
  import { getMessages } from "$lib/i18n/messages";
  import { locale as localeStore } from "$lib/translations";

  const activeLocale = $derived(
    ($localeStore as AppLocale | undefined) ?? defaultLocale,
  );
  const copy = $derived(getMessages(activeLocale));
  const contactHref = $derived(`${localizePath("/", activeLocale)}#contact`);
  const workHref = $derived(`${localizePath("/", activeLocale)}#work`);
</script>

<section class="hero" id="top">
  <div class="grid-pattern" aria-hidden="true"></div>
  <div class="shell hero-inner">
    <div class="copy">
      <h1 class="display-title">
        <span class="title-lead">{copy.homeHero.titleLead}</span>
        <span class="title-accent">{copy.homeHero.titleAccent}</span>
        <span class="title-tail">{copy.homeHero.titleTail}</span>
      </h1>
      <p class="hero-copy">{copy.homeHero.body}</p>
      <div class="button-row">
        <a class="btn btn-primary" href={contactHref}>{copy.homeHero.primaryCta}</a>
        <a class="btn btn-secondary" href={workHref}>{copy.homeHero.secondaryCta}</a>
      </div>
    </div>

    <div class="scroll-cue" aria-hidden="true">
      <span class="eyebrow">{copy.homeHero.scrollCue}</span>
      <div class="line"><i></i></div>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100vh;
    min-height: 100svh;
    padding-top: 6rem;
    overflow: hidden;
    background: var(--color-surface);
  }

  .grid-pattern {
    position: absolute;
    inset: 0;
    opacity: 0.1;
    background-image: linear-gradient(var(--color-outline) 1px, transparent 1px),
      linear-gradient(90deg, var(--color-outline) 1px, transparent 1px);
    background-size: 2.5rem 2.5rem;
    pointer-events: none;
  }

  .hero-inner {
    position: relative;
    z-index: 1;
    min-height: calc(100vh - 6rem);
    min-height: calc(100svh - 6rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    padding-top: clamp(5rem, 10vw, 8rem);
    padding-bottom: 3rem;
  }

  .copy {
    max-width: 84rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
  }

  h1 {
    font-size: clamp(3.35rem, 7vw, 8.75rem);
    margin: 0 0 1.5rem;
    line-height: 0.94;
    letter-spacing: -0.04em;
    text-wrap: balance;
  }

  .title-lead,
  .title-accent,
  .title-tail {
    display: inline;
  }

  .title-accent {
    color: var(--color-primary-container);
    font-style: italic;
  }

  .hero-copy {
    max-width: 40rem;
    margin: 0 0 2.25rem;
    font-size: clamp(1.12rem, 1.7vw, 1.35rem);
    line-height: 1.5;
    color: var(--color-muted);
  }

  .scroll-cue {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-bottom: 0;
  }

  .scroll-cue span {
    color: var(--color-primary-container);
    font-weight: 900;
    letter-spacing: 0.4em;
  }

  .line {
    position: relative;
    width: 2px;
    height: 3rem;
    background: rgba(159, 24, 83, 0.2);
    overflow: hidden;
  }

  .line i {
    position: absolute;
    inset: 0 0 auto;
    display: block;
    height: 50%;
    background: var(--color-primary-container);
    animation: pulse 1.5s infinite ease-in-out;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(100%);
    }
  }

  @media (max-height: 900px) {
    .hero-inner {
      padding-top: clamp(2.5rem, 6vh, 4rem);
      padding-bottom: 1.5rem;
      gap: 1.25rem;
    }

    h1 {
      font-size: clamp(2.85rem, 6.3vw, 6.3rem);
      margin-bottom: 1.2rem;
      line-height: 0.96;
    }

    .hero-copy {
      margin-bottom: 1.5rem;
    }

    .line {
      height: 2.25rem;
    }
  }

  @media (max-height: 760px) {
    .hero-inner {
      padding-top: 1.5rem;
      padding-bottom: 1rem;
      gap: 0.85rem;
    }

    h1 {
      font-size: clamp(2.35rem, 5.2vw, 4.75rem);
      margin-bottom: 0.85rem;
      line-height: 0.98;
    }

    .hero-copy {
      font-size: clamp(1rem, 1.45vw, 1.12rem);
      margin-bottom: 1.15rem;
      line-height: 1.4;
    }

    .scroll-cue {
      gap: 0.75rem;
    }

    .scroll-cue span {
      letter-spacing: 0.24em;
    }

    .line {
      height: 1.75rem;
    }
  }
</style>
