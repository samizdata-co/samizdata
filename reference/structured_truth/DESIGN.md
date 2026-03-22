# Design System Strategy: Structured Truth

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Forensic Editorial."** 

In an era of information sprawl, this system is designed to feel like a high-end intelligence report—authoritative, surgically precise, yet deeply human. We move beyond the "generic SaaS" aesthetic by embracing **Organic Brutalism**: a philosophy where the layout is governed by a rigid, mathematical grid (The Truth), but the execution is softened by sophisticated cream tones and fluid, oversized typography (The Story). 

To achieve a "bespoke" feel, designers must avoid centered layouts. Instead, use **Intentional Asymmetry**. Lead with heavy left-aligned display type and use whitespace as a functional element rather than a "gap." The goal is a digital experience that feels like a prestigious printed broadsheet translated into a high-performance data environment.

---

## 2. Color: The Tonal Spectrum
The palette is built for legibility and "Data-Driven Storytelling," using high-contrast pairings to guide the eye through complex information hierarchies.

### The Palette
- **Primary / Accent:** `primary (#7b003c)` and `primary_container (#9f1853)`. This deep berry is our "Red Thread"—use it sparingly for critical insights, CTAs, and data highlights.
- **The Surface (Cream):** `surface (#fbf9f4)`. This is our sophisticated off-white base. It reduces eye strain and provides a more premium feel than pure white (#ffffff).
- **The Ink (Charcoal):** `on_surface (#1b1c19)`. Used for all primary reading experiences to maintain high-contrast accessibility.

### The "No-Line" Rule
**Borders are prohibited for sectioning.** To separate a header from a body, or a sidebar from a feed, do not use a 1px line. Instead, use a background shift. 
*Example:* Place a `surface_container_low (#f5f3ee)` sidebar against a `surface (#fbf9f4)` main stage. The boundary is defined by the change in value, not a stroke.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of paper.
- **Base Layer:** `surface`
- **In-Page Containers:** `surface_container` or `surface_container_low`
- **Active/Floating Elements:** `surface_container_highest`
Use these shifts to create "nested" depth. A data module should sit inside a `surface_container`, giving it a dedicated "zone" without needing a box.

### The "Glass & Gradient" Rule
For hero sections or high-impact data visualizations, use a subtle gradient transition from `primary (#7b003c)` to `primary_container (#9f1853)`. For floating navigation or modal overlays, apply **Glassmorphism**: use `surface` at 80% opacity with a `backdrop-blur` of 20px. This ensures the "Structured Truth" feels modern and airy, not heavy.

---

## 3. Typography: The Technical Humanist
Typography is the backbone of storytelling. We pair the mathematical precision of **Space Grotesk** with the readability of **Work Sans**.

| Level | Token | Font | Size | Intent |
| :--- | :--- | :--- | :--- | :--- |
| **Display LG** | `display-lg` | Space Grotesk | 3.5rem | High-impact data headlines. |
| **Headline MD** | `headline-md` | Space Grotesk | 1.75rem | Section headers; should feel "architectural." |
| **Title LG** | `title-lg` | Work Sans | 1.375rem | Article titles or card headings. |
| **Body LG** | `body-lg` | Work Sans | 1.0rem | Standard reading text; generous line-height. |
| **Label SM** | `label-sm` | Space Grotesk | 0.6875rem | All-caps metadata, timestamps, or data units. |

**Editorial Direction:** Use `display-lg` with tight letter-spacing (-0.02em) to create a bold, "ink-heavy" look. Use `label-sm` with increased letter-spacing (+0.05em) for a technical, "monospaced-adjacent" feel in data captions.

---

## 4. Elevation & Depth
In this design system, depth is achieved through **Tonal Layering** rather than shadows.

1.  **The Layering Principle:** Stack containers to create hierarchy. A card should be `surface_container_lowest (#ffffff)` placed on a `surface_container (#f0eee9)` background. This creates a natural "lift" that feels integrated into the grid.
2.  **Ambient Shadows:** If an element must float (e.g., a dropdown), use a shadow tinted with the brand color: `rgba(123, 0, 60, 0.06)` with a 32px blur and 16px offset. Never use pure black/grey shadows.
3.  **The "Ghost Border" Fallback:** If a divider is mandatory for accessibility, use `outline_variant (#debfc5)` at 20% opacity. 

---

## 5. Components: Precision Primitives

### Buttons
- **Primary:** Filled `primary (#7b003c)` with `on_primary (#ffffff)` text. **0px border radius.**
- **Secondary:** Outlined with `outline (#8a7076)` at 30% opacity.
- **Interaction:** On hover, the primary button shifts to `primary_container (#9f1853)`.

### Cards & Data Modules
- **Rule:** Forbid divider lines within cards. 
- **Structure:** Use `spacing-8 (1.75rem)` to separate the title from the body. Use background shifts (`surface_container_high`) for the "footer" of a card where metadata lives.

### Input Fields
- **Style:** Underline only. No "box" inputs. 
- **Active State:** The underline transitions from `outline` to `primary (#7b003c)` with a 2px weight.

### Data Visualization (Specific to SAMIZDATA)
- **The "Truth Line":** In charts, use `primary` for the main data trend. 
- **Grid Lines:** Use `surface_variant` at 40% opacity. They should be visible but recede into the background.

---

## 6. Do’s and Don’ts

### Do
- **Do** use strict 0px rounding. Every corner should be a sharp, precise 90-degree angle.
- **Do** embrace whitespace. If a section feels crowded, double the spacing token (e.g., move from `spacing-10` to `spacing-20`).
- **Do** left-align almost everything. Centered text is for "standard" websites; left-alignment is for "editorial" authority.

### Don't
- **Don't** use 1px solid borders to create "boxes" around content.
- **Don't** use generic grey shadows. If it needs depth, use color-tinted ambient glows.
- **Don't** use standard "Blue" for links. Always use `primary (#7b003c)` or `tertiary (#6d1e3e)`.
- **Don't** mix more than two fonts. Stick strictly to the Space Grotesk/Work Sans pairing to maintain technical clarity.