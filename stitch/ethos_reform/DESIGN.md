# Midnight Archive: Design System Document

## 1. Overview & Creative North Star
**Creative North Star: The Modern Scholar**
The "Midnight Archive" system is designed to evoke the quiet, heavy atmosphere of a classical theological library, reimagined for a digital age. It rejects the "flat" web through a sophisticated interplay of deep midnight blues, aged gold, and tactile textures.

The system breaks the standard grid-locked "template" look by using intentional asymmetric layouts, large-scale high-contrast typography, and a heavy emphasis on vertical editorial rhythms. It is a system of "Presence and Silence"—where deep dark voids (Primary #000613) meet airy, light surfaces to create a sense of intellectual weight and clarity.

## 2. Colors
The palette is rooted in the contrast between **Deep Navy/Black** (Authority/Archive) and **Muted Gold** (Heritage/Value).

- **Primary Role:** Used for high-emphasis background blocks (Hero) and core branding. It represents the depth of history.
- **Secondary (Gold) Role:** Used for accents, underlines, and primary actions. It represents "light" and "revelation."
- **The "No-Line" Rule:** Visual boundaries are created exclusively through shifts in background levels (e.g., transitioning from `surface` to `surface_container_low`). 1px solid borders are strictly prohibited for sectioning; instead, use the `surface_container` hierarchy or a 4px accent border on one side of a card (as seen in the Quick Icons section).
- **Surface Hierarchy & Nesting:** Use `surface_container_lowest` (#FFFFFF) for cards and high-elevation floating elements. Use `surface_container` (#EDEEEF) to ground the primary content area.
- **The "Glass & Gradient" Rule:** Navigation and overlay elements must use a 85% opacity background with a 20px backdrop blur to maintain connection with the content beneath.
- **Signature Textures:** A 3% opacity "Natural Paper" texture should be overlaid on large dark sections to provide organic warmth.

## 3. Typography
The system uses a refined typographic scale that prioritizes readability and "Prestige."

- **Headline Font:** Plus Jakarta Sans / Pretendard (High-end sans-serif with tight tracking -0.03em).
- **Body/Label Font:** Inter / Pretendard (Optimized for long-form reading with -0.02em tracking).

**Extracted Scale & Rhythm:**
- **Display 1 (Hero):** 4.5rem (72px) / Bold / 1.1 Line Height.
- **Headline 1:** 2.25rem (36px) / Bold.
- **Headline 2:** 1.875rem (30px) / Bold.
- **Body Large:** 1.125rem (18px) / Light for descriptions.
- **Body Standard:** 1rem (16px) / Regular.
- **Label / Tag:** 0.625rem (10px) / Bold / All-Caps for metadata.

## 4. Elevation & Depth
Elevation is expressed through tonal layering and light-based shadows rather than physical "lifting."

- **The Layering Principle:** Stack `surface_container_low` components on a `surface` background.
- **Ambient Shadows:** 
  - **Level 1 (Soft):** `0 1px 3px rgba(0,0,0,0.1)` (Small cards).
  - **Level 2 (Deep):** `0 20px 25px -5px rgba(0,0,0,0.1)` (Quick Link cards).
  - **Level 3 (Editorial):** `0 2px 10px rgba(0,0,0,0.3)` used specifically as `text-shadow` for headlines over dark images.
- **Glassmorphism:** Navigation menus use `backdrop-filter: blur(20px)` combined with a subtle `shadow-lg` only on hover to simulate interactive depth.

## 5. Components
- **Buttons:**
  - *Primary:* Solid Gold (Secondary), sharp corners (0.125rem radius), transform on hover (-4px Y-axis).
  - *Ghost:* White/Primary border (1px) with backdrop-blur for hero use.
- **Cards:** Use asymmetrical accents (4px border-left) to distinguish between content types (Gold for Academic, Navy for Administrative).
- **Lists:** Horizontal "Editorial" rows with `chevron_right` icons that appear only on hover. Background shifts from transparent to `surface_container_low` on interaction.
- **Chips/Tags:** Rounded-full with 20% opacity backgrounds of their respective role color.
- **Images:** Apply a `grayscale` filter by default, transitioning to full color on hover/focus to emphasize the "archival" feel.

## 6. Do's and Don'ts
- **Do:** Use large amounts of whitespace (Spacing: 3) to allow content to "breathe."
- **Do:** Mix weights—thin body text (300) paired with heavy headlines (700).
- **Don't:** Use vibrant, high-saturation colors outside of the Gold/Navy spectrum.
- **Don't:** Use large border-radii; keep the system architectural and sharp (max 8px for main containers).
- **Do:** Ensure text-shadow is applied when placing white typography over busy library imagery.