<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const buttonVariants = tv({
		base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 active:not-aria-[haspopup]:translate-y-px aria-invalid:ring-3 [&_svg:not([class*='size-'])]:size-4 group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 rounded-none",
		variants: {
			variant: {
				default:
					"bg-primary text-white shadow-[var(--shadow-ambient)] hover:bg-[var(--color-primary)] hover:text-white",
				outline:
					"border-border bg-background text-foreground hover:border-[var(--color-primary)] hover:bg-background aria-expanded:border-[var(--color-primary)] aria-expanded:bg-background",
				secondary:
					"border-border bg-background text-[var(--color-ink-soft)] hover:border-[var(--color-border-accent)] hover:bg-[var(--color-surface-high)] hover:text-primary aria-expanded:border-[var(--color-border-accent)] aria-expanded:bg-[var(--color-surface-high)] aria-expanded:text-primary",
				ghost:
					"border-border bg-background text-[var(--color-ink-soft)] hover:border-[var(--color-border-accent)] hover:bg-[var(--color-surface-high)] hover:text-primary aria-expanded:border-[var(--color-border-accent)] aria-expanded:bg-[var(--color-surface-high)] aria-expanded:text-primary rounded-full",
				destructive: "bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default:
					"h-auto gap-3 px-6 py-4 text-[0.8rem] font-bold uppercase tracking-[0.18em] has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
				xs: "h-6 gap-1 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
				sm: "h-auto gap-2 px-4 py-3 text-[0.74rem] font-bold uppercase tracking-[0.16em]",
				lg: "h-auto gap-3 px-7 py-4 text-[0.8rem] font-bold uppercase tracking-[0.18em]",
				icon: "size-11 rounded-full p-0",
				"icon-xs": "size-6 rounded-full p-0 [&_svg:not([class*='size-'])]:size-3",
				"icon-sm": "size-10 rounded-full p-0",
				"icon-lg": "size-12 rounded-full p-0",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
	export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		size = "default",
		ref = $bindable(null),
		href = undefined,
		type = "button",
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? "link" : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
