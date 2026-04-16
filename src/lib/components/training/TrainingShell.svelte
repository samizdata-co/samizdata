<script lang="ts">
  import { page } from "$app/state";
  import { trainingNav } from "$lib/training/content";
  import type { Snippet } from "svelte";

  let {
    title,
    description,
    children,
  }: {
    title: string;
    description?: string;
    children?: Snippet;
  } = $props();
</script>

<section class="section-block-tight bg-[var(--color-surface-low)] pb-[clamp(3rem,6vw,5rem)] pt-[clamp(8rem,12vw,10rem)]">
  <div class="shell">
    <div class="mx-auto min-w-0 w-[min(100%,56rem)]">
      <header class="mb-4 pt-2">
        <p class="eyebrow muted">Open Training Library</p>
        <h1 class="mt-[0.35rem] mb-0 font-[var(--font-display)] text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.92] font-black tracking-[-0.06em]">
          {title}
        </h1>
        {#if description}
          <p class="mt-[0.85rem] max-w-[42rem] text-[1.1rem] leading-[1.6] text-[var(--color-muted)]">
            {description}
          </p>
        {/if}
      </header>

      <aside class="mb-5 border border-[var(--color-border-soft)] bg-[var(--color-surface-low)] p-5">
        {#each trainingNav as section, index}
          <div class={index === 0 ? "" : "mt-[1.4rem] border-t border-[var(--color-border-soft)] pt-[1.4rem]"}>
            <h2 class="mb-[0.7rem] mt-0 font-[var(--font-display)] text-base font-extrabold tracking-[-0.03em]">
              {section.title}
            </h2>
            <nav aria-label={section.title}>
              {#each section.items as item}
                <a
                  class={`inline-flex min-h-9 items-center border border-[var(--color-border-soft)] bg-[var(--color-surface-lowest)] px-[0.7rem] py-[0.35rem] text-sm leading-5 text-[var(--color-muted)] ${page.url.pathname === item.href ? "border-[var(--color-border-accent)] bg-[var(--color-primary-glow)] font-bold text-[var(--color-primary-container)]" : "hover:border-[var(--color-border-accent)] hover:text-[var(--color-primary-container)]"}`}
                  href={item.href}
                  aria-current={page.url.pathname === item.href ? "page" : undefined}
                >
                  {item.title}
                </a>
              {/each}
            </nav>
          </div>
        {/each}
      </aside>

      <article class="prose border border-[var(--color-border-soft)] bg-[var(--color-surface-lowest)] p-[clamp(1.5rem,3vw,3rem)]">
        {@render children?.()}
      </article>
    </div>
  </div>
</section>
