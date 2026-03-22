<script lang="ts">
  import {
    defaultLocale,
    localizePath,
    type AppLocale,
  } from "$lib/i18n/locales";
  import { locale as localeStore } from "$lib/translations";

  const copy = {
    en: {
      titleLead: "SAMIZDATA is a",
      titleAccent: "data-driven storytelling",
      titleTail: " consultancy.",
      body: "We research, write and build data tools for media organisations, NGOs and other public-benefit institutions.",
      primaryCta: "Let's talk!",
      secondaryCta: "What we do",
      scrollCue: "Portfolio & Expertise",
    },
    ro: {
      titleLead: "SAMIZDATA este o agenție de",
      titleAccent: "storytelling de date",
      titleTail: ".",
      body: "Cercetăm, scriem și construim instrumente de date pentru organizații media, ONG-uri și alte instituții de interes public.",
      primaryCta: "Hai să vorbim!",
      secondaryCta: "Ce facem",
      scrollCue: "Portofoliu și expertiză",
    },
  } as const;

  const activeLocale = $derived(
    ($localeStore as AppLocale | undefined) ?? defaultLocale,
  );
  const strings = $derived(copy[activeLocale]);
  const contactHref = $derived(`${localizePath("/", activeLocale)}#contact`);
  const workHref = $derived(`${localizePath("/", activeLocale)}#work`);
</script>

<section class="hero" id="top">
  <div class="grid-pattern" aria-hidden="true"></div>
  <div class="shell hero-inner">
    <div class="copy">
      <h1 class="display-title">
        <span class="title-lead">{strings.titleLead}</span>
        <span class="title-accent">{strings.titleAccent}</span><span
          class="title-tail">{strings.titleTail}</span
        >
      </h1>
      <p>{strings.body}</p>
      <div class="button-row">
        <a class="btn btn-primary" href={contactHref}>{strings.primaryCta}</a>
        <a class="btn btn-secondary" href={workHref}>{strings.secondaryCta}</a>
      </div>
    </div>

    <div class="scroll-cue" aria-hidden="true">
      <span class="eyebrow">{strings.scrollCue}</span>
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
    margin-left: 0.18ch;
  }

  p {
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
    width: 1px;
    height: 3rem;
    background: rgba(159, 24, 83, 0.3);
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

    p {
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

    p {
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
