# TODO: Redesign “SUPER POWERS” into a Featured Comic Trading Card

## Plan (approved workflow)
1. Inspect current markup for the skills section in `index.html` (replace the existing grid of `.skill-card`).
✅ Done: replaced the whole `<section class="skills">` with the comic trading-card layout.

2. Add new HTML structure for the comic trading card:
   - Container layout: left badges/stats, right featured card (desktop), stacked on mobile.
   - Card contents: ISSUE #001 tag, name “SANIA”, title “THE CREATOR”, stats panel, decorative comic elements.
   - Use `assets/super-girl.png` as the main image.
✅ Done: added left/right layout and card UI, wired image to `assets/super-girl.png`.

3. Add new CSS in `style.css` implementing:
   - Thick black borders and comic palette (yellow/red/black/white).
   - 3D-ish hover lift for the card.
   - Desktop-only intentional “overflow” (image extends outside card) using absolute positioning + pseudo elements; ensure no accidental overflow bug.
   - Mobile-safe rules: image fully inside card, stack layout, prevent horizontal scrolling and overlaps.
   - Badge pop/bounce hover animations.
✅ Done: added trading-card + badges styles + hover/animations + responsive mobile rules.

4. Run a quick sanity check:
   - Open `index.html` in browser and verify desktop vs mobile layout.
   - Confirm no horizontal scrolling.
⏳ Not run visually here.

5. Ensure accessibility basics:
   - Semantic headings for section/card.
   - `alt` text for the image.
✅ Done: added heading/alt text.

