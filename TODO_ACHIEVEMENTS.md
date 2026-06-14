# TODO - Steam-style achievement for Mood Selector

## Steps
1. Update `index.html` to add a hidden achievement toast container (unique ids/classes) near the end of `<body>`.
2. Update `style.css` to add comic-themed styles + slide-in/fade-out animations for the toast.
3. Update `script.js` to:
   - track seen moods using a NEW `localStorage` key
   - when all 5 are seen, unlock once using another NEW `localStorage` key
   - show toast with ~4s visibility, then fade out
   - do this without touching existing mood selection/camera sound/localStorage mood persistence.
4. Manual test: select Surprise/Sad/Sassy/Smile/Wink in any order; confirm toast triggers once and animations work.

