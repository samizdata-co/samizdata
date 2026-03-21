<script lang="ts">
  import bbcNews from "../../data/logos/bbc-news.png";
  import globalWitness from "../../data/logos/global-witness.svg";
  import infogr8 from "../../data/logos/infogr8.png";
  import newStatesman from "../../data/logos/new-statesman.png";
  import transportEnvironment from "../../data/logos/transport-environment.png";
  import vice from "../../data/logos/vice.png";

  type Logo = {
    src: string;
    alt: string;
  };

  const logos: Logo[] = [
    { src: bbcNews, alt: "BBC News" },
    { src: newStatesman, alt: "New Statesman" },
    { src: vice, alt: "VICE" },
    { src: globalWitness, alt: "Global Witness" },
    { src: transportEnvironment, alt: "Transport & Environment" },
    { src: infogr8, alt: "Infogr8" },
  ];
</script>

<section class="clients" aria-labelledby="clients-heading">
  <h2 id="clients-heading">Clients and bylines</h2>

  <ul class="logos">
    {#each logos as logo}
      <li>
        <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" />
      </li>
    {/each}
  </ul>
</section>

<style>
  .clients {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid var(--color-outline-ghost);
  }

  h2 {
    margin: 0 0 1.5rem;
    font-family: var(--font-display);
    font-size: clamp(1.1rem, 1.8vw, 1.45rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--color-ink);
  }

  .logos {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .logos li {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 5.5rem;
    padding: 0.5rem 0.75rem;
    transition: transform 180ms ease;
  }

  .logos li:hover {
    transform: translateY(-0.125rem);
  }

  img {
    display: block;
    width: 100%;
    max-width: 12rem;
    max-height: 3rem;
    object-fit: contain;
    filter: grayscale(100%);
    opacity: 0.76;
    transition:
      filter 180ms ease,
      opacity 180ms ease,
      transform 180ms ease;
  }

  .logos li:hover img {
    filter: grayscale(0%);
    opacity: 1;
    transform: scale(1.02);
  }

  @media (min-width: 700px) {
    .logos {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (min-width: 1100px) {
    .logos {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
  }
</style>
