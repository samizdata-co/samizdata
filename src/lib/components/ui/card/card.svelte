<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		size = "default",
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { size?: "default" | "sm" } = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	data-size={size}
	class={cn("border-border bg-card text-card-foreground group/card flex flex-col gap-4 overflow-hidden border py-4 text-sm has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 rounded-none transition-[transform,box-shadow,background-color,border-color] duration-200 *:[img:first-child]:rounded-none *:[img:last-child]:rounded-none", className)}
	{...restProps}
>
	{@render children?.()}
</div>
