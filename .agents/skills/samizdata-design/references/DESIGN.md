---
version: alpha
name: SAMIZDATA
description: Portfolio and studio site for data journalist Nicu Calcea — editorial data journalism, investigations, and interactive tools.
colors:
  primary: "#7b003c"
  primary-container: "#9f1853"
  accent-text: "#7b003c"
  on-primary: "#ffffff"
  logo-mark: "#7b003c"
  surface: "#fbf9f4"
  surface-low: "#f5f3ee"
  surface-container: "#f0eee9"
  surface-high: "#eae8e3"
  surface-highest: "#e4e2dd"
  surface-lowest: "#ffffff"
  surface-dim: "#dbdad5"
  ink: "#1b1c19"
  ink-soft: "rgba(27, 28, 25, 0.72)"
  muted: "#574146"
  outline: "rgba(138, 112, 118, 0.30)"
  outline-ghost: "rgba(222, 191, 197, 0.20)"
  border-soft: "rgba(138, 112, 118, 0.18)"
  border-strong: "rgba(138, 112, 118, 0.28)"
  border-accent: "rgba(159, 24, 83, 0.26)"
  primary-glow: "rgba(123, 0, 60, 0.10)"
  destructive: "#c0476b"
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 160px
    fontWeight: 900
    lineHeight: 0.85
    letterSpacing: -0.05em
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 128px
    fontWeight: 900
    lineHeight: 0.85
    letterSpacing: -0.05em
  display-md:
    fontFamily: Space Grotesk
    fontSize: 140px
    fontWeight: 900
    lineHeight: 0.94
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: -0.06em
  intro:
    fontFamily: Space Grotesk
    fontSize: 38px
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: -0.04em
  card-title:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: 900
    lineHeight: 1.04
    letterSpacing: -0.04em
  body-lg:
    fontFamily: Work Sans
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.75
  label-md:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0.18em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0.22em
  button-label:
    fontFamily: Space Grotesk
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0.18em
  caption:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.14em
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 64px
  grid-gap: 24px
  shell-max: 1440px
  section-block: 128px
  section-block-tight: 64px
  nav-offset: 88px
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
components:
  button-primary:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.none}"
    padding: 16px 32px
    typography: "{typography.button-label}"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
  button-outline:
    backgroundColor: "{colors.surface-lowest}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: 16px 32px
    typography: "{typography.button-label}"
  button-ghost:
    backgroundColor: "{colors.surface-lowest}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.full}"
  button-icon:
    size: 44px
    rounded: "{rounded.full}"
  card:
    backgroundColor: "{colors.surface-lowest}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: 16px
  card-accent:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary}"
  tag:
    backgroundColor: "{colors.surface-lowest}"
    textColor: "{colors.muted}"
    rounded: "{rounded.none}"
    padding: 6px 11px
  tag-active:
    backgroundColor: "{colors.primary-glow}"
    textColor: "{colors.primary-container}"
  nav-link:
    textColor: "{colors.ink-soft}"
    typography: "{typography.label-md}"
  nav-link-active:
    textColor: "{colors.accent-text}"
---

# SAMIZDATA DESIGN

## Overview

SAMIZDATA is the portfolio and studio site of Nicu Calcea, a data journalist specialising in investigations, data analysis, and interactive tools. The visual identity balances editorial gravitas with a quiet, contemporary editorial intelligence — it should feel **precise, credible, and quietly confident**, like a well-sourced newsroom rather than a marketing agency.

The brand pairs a single accent of deep raspberry against warm limestone neutrals, disciplined geometric display type (Space Grotesk) with an approachable humanist body face (Work Sans), and structural forms that are deliberately sharp. The tone is professional and understated for a journalist's own body of work: dense enough to feel rigorous, airy enough to invite reading. Sections alternate between the primary surface and a gently lower "surface-low" backdrop to create rhythm without noise.

The site is fully bilingual (English / Romanian), theme-adaptive between light and dark, and static-generated.

## Colors

The palette is **warm and paper-like**, rooted in high-contrast neutral surfaces with a single, evocative raspberry accent used with restraint. The low saturation and warm undertones make the accent feel editorial rather than corporate.

- **Primary (#7b003c):** A deep dried-raspberry ink used for hover states, strong emphasis, and the logo. It reads as serious and slightly archival.
- **Primary-container (#9f1853):** The brighter raspberry used for primary-button and accent-card fills, focus rings, borders, and large display accents.
- **Accent text (#7b003c light / #f078a6 dark):** The accessible raspberry used for links, active navigation, CTAs, and small accent labels. Keep it separate from fill colors so all text remains WCAG AA across the surface ramp.
- **Surface (#fbf9f4):** A warm limestone. The foundation of every page; softer than pure white.
- **Surface-low (#f5f3ee):** A solid, slightly deeper backdrop used as a tonal step-up for the work, about, and training sections and the footer.
- **Surface-lowest (#ffffff):** Pure white reserved for cards that sit *on* a tonal surface, giving them crisp contrast.
- **Surface-high (#eae8e3)** and **surface-highest (#e4e2dd):** Deepest neutrals used as hover fills and media-card placeholders.
- **Ink (#1b1c19):** A warm near-black for headlines and primary text.
- **Muted (#574146):** A plum-brown secondary text used for body copy on light surfaces; the site's "quiet voice".
- **Outline / Border (#8a7076):** A dusty rose-taupe used only at low alpha for grid lines, borders, and hairlines.
- **Destructive (#c0476b):** A raspberry-pink reserved for destructive actions and error states.

The palette is subdivided into a **tonal surface ramp** (`surface-low`, `surface-container`, `surface-high`, `surface-highest`, `surface-dim`) that carries elevation without heavy shadows, and a **border ramp** (`border-soft`, `border-strong`, `border-accent`, `outline`, `outline-ghost`) that keeps structure quiet and warm.

**Dark mode** flips to near-black warm charcoal surfaces (`#111311`), keeps **primary-container #c62168** for fills and non-text controls, uses **accent-text #f078a6** for links and small accent labels, and uses **logo-mark #d14a7b** with warm bone-white ink (`#f4efe9`). The text accent maintains at least 4.5:1 contrast across the dark surface ramp; do not substitute the darker fill token for small text. Dark counterparts for muted = `#c2b7b3`, destructive = `#d06b8c`, and all rgba borders/outlines shift toward white at a matching low alpha (e.g. `border-soft` becomes `rgba(255,255,255,0.11)`).

## Typography

The typography pairs a **geometric display face** (Space Grotesk) with a **humanist body face** (Work Sans) for a distinct editorial-technical voice: Space Grotesk carries the structural, headline-level voice and hand-drawn "data" flavour, while Work Sans provides long-form readability.

- **Display & headlines:** Space Grotesk at weight 900 (or 700 for intro), with tight negative letter-spacing (`-0.04em` to `-0.06em`) and compressed line-height (`0.85`–`0.94`). This is where the brand's confidence lives. The themes use fluid `clamp()` sizes across breakpoints, e.g. `display-title` ranges `clamp(3.75rem, 8vw, 10rem)`.
- **Eyebrows & labels:** Space Grotesk at small sizes but **bold, uppercase, and generously letter-spaced** (0.18em–0.22em). Used for the section "eyebrow", primary navigation, and button labels. This is the brand's "data label" voice — technical and precise.
- **Body:** Work Sans at 400, line-height 1.6–1.75. Body copy is set in the plum-brown **muted** tone rather than pure ink, keeping dense text pages soft and readable.
- **Code & data:** `ui-monospace` stack for inline and block code inside training/prose content.

Fluid maximum values are encoded as tokens; real-world sizes scale down fluidly on mobile. `lineHeight` values are unitless multipliers of `fontSize`.

## Layout

The layout follows a **fluid shell + fixed max-width grid** desktop: content is constrained to a `.shell` of **max 1440px** with a generous margin (1rem on mobile, growing to 2rem on desktop), and a strict, 4px-derived (Tailwind 4-point) spacing scale keeps a consistent rhythm.

Key layout primitives:

- **Spacing rhythm:** 4px base (Tailwind) — 4/8/16/24/32/64 — used for padding and gaps everywhere; never arbitrary.
- **Section block padding** runs `clamp(4rem, 9vw, 8rem)`, with a "tight" variant at `clamp(2rem, 5vw, 4rem)` for rhythm-dense sections like Work and Training.
- **Work grid:** a responsive card grid that is 1 column mobile → 2 columns (≥640px) → 4 columns (≥1200px), with 24px gaps and `span-2` features for large service cards.
- **Nav:** fixed top bar (Height offsets scroll targets by 88px via `--scroll-target-offset`) with a blurred, 80% surface backdrop.
- **Columns** use a 2-column split at ≥900px for contact and services intro layouts.

## Elevation & Depth

Depth is achieved primarily through **tonal layering** rather than heavy shadows; elevation is communicated by stacking neutral surfaces, never by big drop shadows. The system leans on **backdrop blur** (nav, sheet overlays) for floating chrome and **micro-shift** (cards) for hover.

- **Cards:** on tonal surfaces, content sits on pure white (surface-lowest) cards; hover translates the card `-0.2rem` upward and adds an ambient raspberry glow shadow plus an accent border.
- **Ambient shadow (`--shadow-ambient`):** `0 1rem 2rem rgba(123, 0, 60, 0.08)` in light mode; in dark mode a deeper neutral `0 1.25rem 2.75rem rgba(0, 0, 0, 0.35)`.
- **Accent card:** the primary service card inverts to a flat primary-container block with the ambient raspberry shadow, standing alone as the single raised element.
- **Popovers / menus:** defined as tonal floating layers using `surface-lowest` backgrounds with a soft blur when over content.

## Shapes

The shape language is **architectural sharpness**. Structural surfaces — cards, buttons, inputs, tags, sheets — default to **0 radius** (`rounded-none`), reinforcing a precise, editorial rigidity.

Rounding is introduced **selectively and semantically**:

- **Icon-only buttons** (theme toggle, language switcher, mobile menu) use full circles (`rounded-full`).
- **Floating popovers** (dropdown/menu content, sheet content) are the only elements rounded with `rounded-2xl` (16px) and `rounded-xl` (12px) items — a deliberate signal that a layer is *transient and detached* from the canvas.
- The logo's bars use 1px-radius endpoints as a typographic echo of the sharp aesthetic.

## Components

The shared component UI sits on **shadcn-svelte / bits-ui** primitives with the tokens above mapped in (in `app.css` under `@theme inline`).

- **Buttons** — a taxonomy of five variants:
  - **Primary (default):** primary-container fill, white text, ambient shadow. Hover deepens to `primary`. Approximately square on the sides.
  - **Outline:** transparent body, visible soft border, ink text; hover draws a primary container border. Used for secondary CTAs.
  - **Ghost:** borderless with an ink-soft label; used for bare in-content actions; **rounded-full**.
  - **Destructive:** translucent destructive fill (10–20%) with destructive text, used only for destructive intent.
  - **Link:** underline-on-hover text-only link.
  - All buttons share a **fixed uppercase, letter-spaced, bold label** and tight focus ring (2px primary-container, 3px offset). Sizes: default (16px/32px padding), `icon` (44px circle), `sm`, `lg`.
- **Cards —** a core `CardShell`: `surface-lowest` fill, `border-soft` 1px border, 0 radius, responsive aspect ratios (square/wide/auto). Hover: lift + ambient shadow + accent border. Variants: `surface` (default) and `media` (`surface-highest` placeholder for image cards). An `accent` service card inverts to `primary-container` with white text and the ambient glow.
- **Cards** have a small footer row: an uppercase Space Grotesk eyebrow or a "→" CTA of muted → primary-color.
- **Tags / chips** (training library): `surface-lowest` fill, `border-soft`, 0 radius, muted text; the active page inverts to `primary-glow` background pill with primary-container text and a bold weight.
- **Contact blocks:** large bordered tiles on `surface` with 32px padding; the primary email tile inverts to `primary-container` fill with white text on hover, with the arrow icon sliding out.

## Do's and Don'ts

- Do use the raspberry accent (**primary / primary-container**) **sparingly** — a single italic accent word in headlines, and active states. It is emphatic, not decorative.
- Don't mix sharp (0px) cards with floating (16px) menus on the same surface region without intending them to read as detached/transient layers.
- Do use the tonal `surface` ramp instead of shadows to separate sections from one another.
- Don't introduce raw saturated colors outside the palette; stick to the warm neutrals + one accent + the plum text tone.
- Do set all labels, nav, and button text in Space Grotesk uppercase with generous tracking (0.18em+).
- Don't set body copy as pure black; use `muted` (plum) on light surfaces and `#c2b7b3` on dark.
- Do maintain WCAG AA contrast (4.5:1 for body), including the deep raspberry on white.
- Don't exceed two font weights per screen — Space Grotesk 900/700 + Work Sans 400 is the limit.
- Do respect the responsive fluid `clamp` sizes and verify them at the 640, 800, 900, and 1200px breakpoints.
- Don't guess — the tokens (`#7b003c`, spacing, `0` radius, Typefaces) in the front matter are normative; mirrored in `app.css`.