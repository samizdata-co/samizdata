<script lang="ts">
  let {
    name,
    size = "24px",
    class: className = "",
  }: {
    name: string;
    size?: string;
    class?: string;
  } = $props();
</script>

<span
  class={`material-symbols-outlined ${className}`}
  style={`font-size:${size};`}
  aria-hidden="true"
>
  {name}
</span>
