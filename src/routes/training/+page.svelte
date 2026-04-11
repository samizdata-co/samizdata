<script lang="ts">
  import ContactBlock from "$lib/components/content/ContactBlock.svelte";
  import TrainingResourceCard from "$lib/components/training/TrainingResourceCard.svelte";
  import { trainingPages } from "$lib/training/content";

  let { data } = $props();

  const topicGroups = ["Data analysis", "Visualisation", "AI workflows", "Storytelling"];
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta name="description" content={data.meta.description} />
  <link rel="canonical" href={data.meta.canonical} />
</svelte:head>

<main class="training-home">
  <section class="hero section-block-tight">
    <div class="grid-pattern" aria-hidden="true"></div>
    <div class="shell hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">Open Training Library</p>
        <h1 class="display-title">Tell stories with data.</h1>
        <p class="intro">
          Free practical resources on data journalism, sourcing, spreadsheets and responsible AI,
          plus bespoke training for newsrooms, NGOs and journalism schools.
        </p>
        <div class="button-row">
          <a class="btn btn-primary" href="#contact">
            Ask about training
          </a>
          <a class="btn btn-secondary" href="#library">Browse resources</a>
        </div>
      </div>

      <div class="hero-card surface-card-muted">
        <p class="eyebrow muted">What I teach</p>
        <ul>
          {#each topicGroups as topic}
            <li>{topic}</li>
          {/each}
        </ul>
        <p>
          Since 2021 I have taught data journalism to postgraduate students at City, University of
          London and run newsroom workshops at conferences including Climate Arena and Dataharvest.
        </p>
      </div>
    </div>
  </section>

  <section class="library section-block-tight" id="library">
    <div class="shell library-shell">
      <p class="eyebrow muted">Library</p>
      <div class="library-grid">
        {#each trainingPages as trainingPage}
          <TrainingResourceCard page={trainingPage} />
        {/each}
      </div>
    </div>
  </section>

  <ContactBlock />
</main>

<style>
  .training-home {
    background: var(--color-surface);
  }

  .hero {
    position: relative;
    padding-top: 6rem;
    overflow: hidden;
    background:
      radial-gradient(circle at top left, var(--color-primary-glow), transparent 36%),
      var(--color-surface);
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

  .hero-grid,
  .library-grid {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .hero-grid {
    align-items: center;
    padding-top: clamp(1.5rem, 4vw, 3rem);
    padding-bottom: 1rem;
  }

  .hero-copy h1 {
    margin: 0.25rem 0 1rem;
  }

  .intro {
    max-width: 41rem;
    margin: 0 0 1.25rem;
    font-size: clamp(1.1rem, 1.7vw, 1.3rem);
    line-height: 1.55;
    color: var(--color-muted);
  }

  .hero-card,
  :global(.resource-card) {
    padding: clamp(1.3rem, 3vw, 2rem);
  }

  .hero-card {
    max-width: 28rem;
  }

  .hero-card ul {
    margin: 1rem 0;
    padding-left: 1rem;
    display: grid;
    gap: 0.4rem;
  }

  .hero-card p:last-child {
    margin: 0;
    color: var(--color-muted);
    line-height: 1.6;
  }

  .library-shell {
    padding-top: 0;
  }

  .library-shell > p {
    margin: 0 0 0.85rem;
  }

  .library-grid {
    --card-grid-gap: 1rem;
    gap: 1rem;
  }

  @media (min-width: 900px) {
    .hero-grid {
      grid-template-columns: minmax(0, 1fr) minmax(18rem, 24rem);
      align-items: start;
    }

    .library-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 1200px) {
    .library-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
</style>
