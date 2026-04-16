<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import type { TrainingPageMeta } from "$lib/training/content";

  let { page }: { page: TrainingPageMeta } = $props();
</script>

<a class="block h-full no-underline" href={page.href}>
  <Card.Root
    class="h-full min-h-56 p-[clamp(1.3rem,3vw,2rem)] hover:-translate-y-[0.2rem] hover:border-[var(--color-border-accent)] hover:shadow-[var(--shadow-ambient)]"
    size="sm"
  >
    <Card.Content class="flex h-full flex-col justify-between gap-5 p-[1.4rem]">
      <p class="eyebrow muted">{page.section}</p>
      <h2 class="m-0 font-[var(--font-display)] text-[clamp(1.45rem,2vw,1.9rem)] leading-none font-black tracking-[-0.04em] text-[var(--color-ink)]">
        {page.navLabel}
      </h2>
      {#if page.description}
        <p class="m-0 leading-[1.6] text-[var(--color-muted)]">{page.description}</p>
      {/if}
    </Card.Content>
  </Card.Root>
</a>
