<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";

  let { compact = false }: { compact?: boolean } = $props();

  let svgEl: SVGSVGElement;
  let state: "bars" | "scatter" | "transitioning" = "bars";
  let idleTimer: ReturnType<typeof setTimeout>;
  let animFrame: number;
  let driftActive = false;
  let motionToken = 0;

  const NS = "http://www.w3.org/2000/svg";

  // Each bar: resting rect geometry + where it lands as a dot (cx, cy, dotSize)
  const BARS = [
    { x: 0, y: 2, w: 24, h: 5, op: 0.25, dot: { cx: 18, cy: 4.5, s: 2.2 } },
    { x: 0, y: 10, w: 24, h: 5, op: 1, dot: { cx: 7, cy: 12.5, s: 2.2 } },
    { x: 0, y: 18, w: 16, h: 5, op: 0.25, dot: { cx: 13, cy: 19.5, s: 2.2 } },
  ];

  // Axis lines: x-axis along bottom, y-axis along left
  const AXES = [
    { x1: 0.5, y1: 23.5, x2: 23.5, y2: 23.5 }, // x-axis
    { x1: 0.5, y1: 0.5, x2: 0.5, y2: 23.5 }, // y-axis
  ];

  let barEls: SVGRectElement[] = [];
  let axisEls: SVGLineElement[] = [];

  function mkEl<T extends SVGElement>(
    tag: string,
    attrs: Record<string, string | number>,
  ): T {
    const e = document.createElementNS(NS, tag) as T;
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
    return e;
  }

  const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  function tween(
    ms: number,
    onTick: (t: number) => void,
    token = motionToken,
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const start = performance.now();
      function frame(now: number) {
        if (token !== motionToken) {
          resolve(false);
          return;
        }
        const raw = Math.min((now - start) / ms, 1);
        onTick(easeInOut(raw));
        if (raw < 1) animFrame = requestAnimationFrame(frame);
        else resolve(true);
      }
      animFrame = requestAnimationFrame(frame);
    });
  }

  function wait(ms: number) {
    return new Promise<void>((r) => setTimeout(r, ms));
  }

  // ── Build DOM ────────────────────────────────────────────────────────────

  function buildAxes() {
    axisEls = AXES.map((a) => {
      const line = mkEl<SVGLineElement>("line", {
        x1: a.x1,
        y1: a.y1,
        x2: a.x2,
        y2: a.y2,
        stroke: "currentColor",
        "stroke-width": 0.6,
        "stroke-linecap": "round",
        opacity: 0,
      });
      svgEl.appendChild(line);
      return line;
    });
  }

  function buildBars() {
    barEls = BARS.map((d) => {
      const r = mkEl<SVGRectElement>("rect", {
        x: d.x,
        y: d.y,
        width: d.w,
        height: d.h,
        rx: 1,
        fill: "currentColor",
        opacity: d.op,
      });
      svgEl.appendChild(r);
      return r;
    });
  }

  // ── Scan-in on mount ─────────────────────────────────────────────────────

  async function scanIn() {
    barEls.forEach((r) => {
      r.setAttribute("width", "0");
      r.setAttribute("opacity", "0");
    });

    for (let i = 0; i < barEls.length; i++) {
      await wait(i === 0 ? 100 : 160);
      const d = BARS[i];
      await tween(400, (t) => {
        barEls[i].setAttribute("width", String(lerp(0, d.w, t)));
        barEls[i].setAttribute("opacity", String(lerp(0, d.op, t)));
      });
    }
    scheduleIdle();
  }

  // ── Idle: bars shift widths every 20s then restore ───────────────────────

  function scheduleIdle() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(doIdle, 20_000);
  }

  async function doIdle() {
    if (state !== "bars") {
      scheduleIdle();
      return;
    }
    state = "transitioning";

    const alt = [18, 24, 20];
    const orig = BARS.map((d) => d.w);
    const token = ++motionToken;

    const widened = await tween(
      800,
      (t) => {
        barEls.forEach((r, i) =>
          r.setAttribute("width", String(lerp(orig[i], alt[i], t))),
        );
      },
      token,
    );
    if (!widened || token !== motionToken) return;
    await wait(500);
    const restored = await tween(
      800,
      (t) => {
        barEls.forEach((r, i) =>
          r.setAttribute("width", String(lerp(alt[i], orig[i], t))),
        );
      },
      token,
    );
    if (!restored || token !== motionToken) return;

    state = "bars";
    scheduleIdle();
  }

  // ── Hover in: bars morph into dots, axes draw in ─────────────────────────

  async function toScatter() {
    if (state === "scatter") return;
    driftActive = false;
    cancelAnimationFrame(animFrame);
    clearTimeout(idleTimer);
    state = "transitioning";
    const token = ++motionToken;

    // Bars collapse to their dot position while axes draw in
    const completed = await tween(
      480,
      (t) => {
        barEls.forEach((r, i) => {
          const d = BARS[i];
          const dot = d.dot;
          const w = lerp(d.w, dot.s, t);
          const h = lerp(d.h, dot.s, t);
          const cx = lerp(d.x + d.w / 2, dot.cx, t);
          const cy = lerp(d.y + d.h / 2, dot.cy, t);
          r.setAttribute("x", String(cx - w / 2));
          r.setAttribute("y", String(cy - h / 2));
          r.setAttribute("width", String(w));
          r.setAttribute("height", String(h));
          r.setAttribute("rx", String(lerp(1, dot.s / 2, t)));
          r.setAttribute("opacity", String(lerp(d.op, 0.85, t)));
        });

        // x-axis draws left-to-right, y-axis draws top-to-bottom
        const xAxis = AXES[0];
        axisEls[0].setAttribute("x2", String(lerp(xAxis.x1, xAxis.x2, t)));
        axisEls[0].setAttribute("opacity", String(lerp(0, 0.3, t)));
        const yAxis = AXES[1];
        axisEls[1].setAttribute("y2", String(lerp(yAxis.y1, yAxis.y2, t)));
        axisEls[1].setAttribute("opacity", String(lerp(0, 0.3, t)));
      },
      token,
    );
    if (!completed || token !== motionToken) return;

    state = "scatter";
    startDrift();
  }

  // Gentle sine-arc drift of the dots while hovered
  function startDrift() {
    driftActive = true;
    const offsets = BARS.map((_, i) => ({
      dx: (((i * 7 + 3) % 5) - 2) * 0.6,
      dy: (((i * 11 + 5) % 5) - 2) * 0.6,
    }));
    const PERIOD = 2600;
    let start: number | null = null;

    function frame(now: number) {
      if (!driftActive) return;
      if (!start) start = now;
      const t = Math.sin((((now - start) % PERIOD) / PERIOD) * Math.PI);
      barEls.forEach((r, i) => {
        const dot = BARS[i].dot;
        const cx = dot.cx + offsets[i].dx * t;
        const cy = dot.cy + offsets[i].dy * t;
        const s = parseFloat(r.getAttribute("width") ?? String(dot.s));
        r.setAttribute("x", String(cx - s / 2));
        r.setAttribute("y", String(cy - s / 2));
      });
      animFrame = requestAnimationFrame(frame);
    }
    animFrame = requestAnimationFrame(frame);
  }

  // ── Hover out: dots expand back into bars, axes fade out ─────────────────

  async function toBars() {
    if (state === "bars") return;
    driftActive = false;
    cancelAnimationFrame(animFrame);
    state = "transitioning";
    const token = ++motionToken;

    // Snapshot current dot positions (may have drifted)
    const snap = barEls.map((r) => ({
      cx:
        parseFloat(r.getAttribute("x") ?? "0") +
        parseFloat(r.getAttribute("width") ?? "0") / 2,
      cy:
        parseFloat(r.getAttribute("y") ?? "0") +
        parseFloat(r.getAttribute("height") ?? "0") / 2,
    }));

    const completed = await tween(
      480,
      (t) => {
        barEls.forEach((r, i) => {
          const d = BARS[i];
          const w = lerp(d.dot.s, d.w, t);
          const h = lerp(d.dot.s, d.h, t);
          const cx = lerp(snap[i].cx, d.x + d.w / 2, t);
          const cy = lerp(snap[i].cy, d.y + d.h / 2, t);
          r.setAttribute("x", String(cx - w / 2));
          r.setAttribute("y", String(cy - h / 2));
          r.setAttribute("width", String(w));
          r.setAttribute("height", String(h));
          r.setAttribute("rx", String(lerp(d.dot.s / 2, 1, t)));
          r.setAttribute("opacity", String(lerp(0.85, d.op, t)));
        });

        axisEls[0].setAttribute("opacity", String(lerp(0.3, 0, t)));
        axisEls[1].setAttribute("opacity", String(lerp(0.3, 0, t)));
      },
      token,
    );
    if (!completed || token !== motionToken) return;

    // Snap to exact resting values
    barEls.forEach((r, i) => {
      const d = BARS[i];
      r.setAttribute("x", String(d.x));
      r.setAttribute("y", String(d.y));
      r.setAttribute("width", String(d.w));
      r.setAttribute("height", String(d.h));
      r.setAttribute("rx", "1");
      r.setAttribute("opacity", String(d.op));
    });
    axisEls[0].setAttribute("x2", String(AXES[0].x1));
    axisEls[1].setAttribute("y2", String(AXES[1].y1));

    state = "bars";
    scheduleIdle();
  }

  onMount(() => {
    buildAxes();
    buildBars();
    scanIn();
  });

  onDestroy(() => {
    if (!browser) return;
    clearTimeout(idleTimer);
    cancelAnimationFrame(animFrame);
    driftActive = false;
  });
</script>

<div
  class="logo"
  onmouseenter={toScatter}
  onmouseleave={toBars}
  role="img"
  aria-label="Samizdata"
>
  <div class="mark" aria-hidden="true">
    <svg
      bind:this={svgEl}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    ></svg>
  </div>
  <span class:compact>{compact ? "SAMIZDATA" : "SAMIZDATA"}</span>
</div>

<style>
  .logo {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    cursor: default;
  }

  :global(a) .logo {
    cursor: pointer;
  }

  .mark {
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.5rem;
    flex-shrink: 0;
    color: var(--color-logo-mark);
  }

  svg {
    width: 1.75rem;
    height: 1.75rem;
    overflow: visible;
  }

  :global(:root[data-theme="dark"]) svg {
    filter: brightness(1.14) saturate(1.06)
      drop-shadow(0 0 0.35rem rgba(198, 33, 104, 0.2));
  }

  span {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 900;
    letter-spacing: -0.06em;
    line-height: 1;
    text-transform: uppercase;
    animation: fade-up 0.5s ease-out 0.75s both;
  }

  span.compact {
    font-size: 1.25rem;
  }

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(3px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    span {
      animation: none;
    }
  }
</style>
