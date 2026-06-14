/* ===================================
DEBUG
=================================== */

console.log("SCRIPT LOADED");

/* ===================================
ABOUT CARD HOVER ANIMATION
=================================== */

const cards = document.querySelectorAll(".about-card");

cards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    // Don't fight the open/closed dossier transform.
    if (card.classList.contains('is-open')) return;
    card.style.transform = "rotate(-2deg) translateY(-10px)";
  });

  card.addEventListener("mouseleave", () => {
    if (card.classList.contains('is-open')) return;
    card.style.transform = "rotate(0deg) translateY(0px)";
  });
});

/* ===================================
   ORIGIN STORY: CLICK TO OPEN DOSSIER FILES
=================================== */
(function () {
  const aboutCards = document.querySelectorAll('.about-card[data-origin-arc]');

  if (!aboutCards || aboutCards.length === 0) return;

  function setOpen(card, open) {
    if (!card) return;

    const fileEl = card.querySelector('.origin-file');
    if (open) {
      card.classList.add('is-open');
      card.setAttribute('aria-expanded', 'true');
      if (fileEl) fileEl.setAttribute('aria-hidden', 'false');
    } else {
      card.classList.remove('is-open');
      card.setAttribute('aria-expanded', 'false');
      if (fileEl) fileEl.setAttribute('aria-hidden', 'true');
    }
  }

  function toggleCard(card) {
    const isOpen = card.classList.contains('is-open');
    setOpen(card, !isOpen);
  }

  aboutCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      // Prevent click bubbles from spawning at the dossier.
      e.stopPropagation();

      // If already open, ignore clicks on the badge area so it doesn't feel like a “button”.
      const badge = e.target && e.target.closest ? e.target.closest('.click-open-badge') : null;
      if (badge && card.classList.contains('is-open')) return;

      toggleCard(card);
    });


    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        toggleCard(card);
      }
    });
  });
})();


/* ===================================
FORMSPREE AJAX SUBMIT
=================================== */

const form = document.getElementById("contactForm");
const comicPopup = document.getElementById("comicPopup");
const comicPopupOk = document.getElementById("comicPopupOk");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // Show comic-style popup message and redirect home
        if (comicPopup) comicPopup.hidden = false;
        if (comicPopupOk) comicPopupOk.focus();

        form.reset();

        const redirectHome = () => {
          window.location.href = "./";
        };

        if (comicPopupOk) {
          comicPopupOk.onclick = redirectHome;
        }

        // Fallback redirect after a short delay
        setTimeout(redirectHome, 1800);
      } else {
        alert("Message could not be sent.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    }
  });
}

/* ===================================
   COMIC CLICK BUBBLES
=================================== */

(function () {
  const bubbleWords = [
    "BOOM!",
    "POW!",
    "BANG!",
    "SHEEESH!",
    "SLAYYY!",
    "WOW!",
    "OOF!",
    "ZAP!",
    "WHOA!",
    "YOOO!",
    "CRASH!",
    "KABOOM!",
    "EPIC!",
    "BRUH!",
    "LET'S GO!",
  ];

  const bubbleColors = [
    "#ffe600", // yellow
    "#ff2a2a", // red
    "#22d3ee", // cyan
    "#ff8a00", // orange
    "#ff4fd8", // pink
    "#22c55e", // green
  ];

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shouldIgnoreTarget(t) {
    if (!t) return true;

    const tag = (t.tagName || "").toLowerCase();

    // Ignore interactive elements and their children
    if (tag === "button" || tag === "a" || tag === "form") return true;
    if (
      tag === "input" ||
      tag === "textarea" ||
      tag === "select" ||
      tag === "option"
    ) {
      return true;
    }

    if (t.closest) {
      if (t.closest("button")) return true;
      if (t.closest("a")) return true;
      if (t.closest("form")) return true;
      if (t.closest("input, textarea, select, option")) return true;
    }

    return false;
  }

  function spawnBubble(x, y) {
    const word = bubbleWords[randInt(0, bubbleWords.length - 1)];
    const bg = bubbleColors[randInt(0, bubbleColors.length - 1)];
    const rot = randInt(-15, 15);

    const bubble = document.createElement("div");
    bubble.className = "comic-bubble";
    bubble.textContent = word;

    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
    bubble.style.setProperty("--bg", bg);
    bubble.style.setProperty("--rot", `${rot}deg`);

    document.body.appendChild(bubble);

    bubble.addEventListener(
      "animationend",
      () => {
        bubble.remove();
      },
      { once: true }
    );

    // Safety cleanup in case animationend doesn't fire
    setTimeout(() => {
      if (bubble && bubble.parentNode) bubble.remove();
    }, 1600);
  }

  document.addEventListener(
    "click",
    (e) => {
      // prevent triggering when clicking ignored elements
      if (shouldIgnoreTarget(e.target)) return;

      spawnBubble(e.clientX, e.clientY);
    },
    { passive: true }
  );
})();

/* ===================================
   SKILLS: FLY-AWAY on click
=================================== */

(function () {
  const skills = document.querySelectorAll('.skill-card');


  function animateFlyAway(el) {

    if (!el) return;


    // prevent stacking animations
    if (el.dataset.animating === 'true') return;
    el.dataset.animating = 'true';

    const originalTransform = el.style.transform || '';

    // Ensure it can animate smoothly
    el.style.transition = 'transform 350ms ease, box-shadow 350ms ease, opacity 350ms ease';

    // Pick a direction
    const dx = (Math.random() < 0.5 ? -1 : 1) * (40 + Math.random() * 35);
    const dy = -60 - Math.random() * 40;
    const rot = (Math.random() < 0.5 ? -1 : 1) * (10 + Math.random() * 10);

    // Fly away
    el.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(0.95)`;
    el.style.boxShadow = '8px 8px 0 rgba(0,0,0,0.35)';
    el.style.opacity = '0.85';

    // Come back and sit right back
    setTimeout(() => {
      el.style.transform = originalTransform;
      el.style.boxShadow = '';
      el.style.opacity = '';
    }, 220);

    // Reset state after total animation
    setTimeout(() => {
      el.dataset.animating = 'false';
    }, 600);
  }

  skills.forEach((el) => {
    el.addEventListener('click', (e) => {
      // keep click from triggering other handlers (like bubbles)
      e.stopPropagation();
      animateFlyAway(el);
    });
  });
})();

/* ===================================
   COMIC “CHOOSE YOUR MOOD” (HERO)
=================================== */

(function () {
  const moodBtn = document.getElementById("moodBtn");
  const moodModal = document.getElementById("moodModal");
  const moodCloseBtn = document.getElementById("moodCloseBtn");
  const moodLabel = document.getElementById("moodLabel");
  const heroImage = document.getElementById("heroImage");
  const moodOptions = document.querySelectorAll(".mood-option");

  const state = {
    isFading: false,
  };

  function openModal() {
    if (!moodModal) return;
    moodModal.hidden = false;
    if (moodBtn) moodBtn.setAttribute("aria-expanded", "true");
    if (moodCloseBtn) setTimeout(() => moodCloseBtn.focus(), 0);
  }

  function closeModal() {
    if (!moodModal) return;
    moodModal.hidden = true;
    if (moodBtn) moodBtn.setAttribute("aria-expanded", "false");
  }

  function setLabel(moodName) {
    if (moodLabel) moodLabel.textContent = `Mood: ${moodName}`;
  }

  function fadeAndSwapHero(nextSrc) {
    if (!heroImage) return;
    if (state.isFading) return;
    state.isFading = true;

    heroImage.classList.add("mood-fade");

    setTimeout(() => {
      heroImage.src = nextSrc;
      heroImage.classList.remove("mood-fade");
      state.isFading = false;
    }, 130);
  }

  const moodSoundUrl = "assets/camera_sound.mp3";
  const flashDurationMs = 230;
  let audioRef = null;

  function restartMoodSound() {
    if (!moodSoundUrl) return;

    // Create a fresh audio element each time so rapid switches restart from 0.
    try {
      if (audioRef) {
        try {
          audioRef.pause();
          audioRef.currentTime = 0;
        } catch (_) {}
      }

      audioRef = new Audio(moodSoundUrl);
      audioRef.currentTime = 0;
      // Play only on mood selection.
      audioRef.play().catch(() => {});
    } catch (_) {}
  }

  function triggerCameraFlash() {
    if (!heroImage) return;

    // Use an inline overlay so we don't change your CSS/theme.
    const flash = document.createElement("div");
    flash.style.position = "absolute";
    flash.style.inset = "0";
    flash.style.background = "rgba(255,255,255,0.85)";
    flash.style.pointerEvents = "none";
    flash.style.zIndex = "4";
    flash.style.opacity = "0";
    flash.style.transition = "opacity 60ms ease";

    // Ensure hero is a positioning context.
    if (getComputedStyle(heroImage.parentElement).position === "static") {
      heroImage.parentElement.style.position = "relative";
    }

    // Add to hero section container.
    const host = heroImage.parentElement;
    if (!host) return;
    host.appendChild(flash);

    // Trigger flash.
    requestAnimationFrame(() => {
      flash.style.opacity = "1";
    });

    setTimeout(() => {
      flash.style.opacity = "0";
      setTimeout(() => flash.remove(), 220);
    }, flashDurationMs);
  }

  function chooseMood(optionEl) {
    const moodName = optionEl?.dataset?.mood;
    const nextSrc = optionEl?.dataset?.heroSrc;
    if (!moodName || !nextSrc) return;

    // Sound + flash ONLY on selection.
    restartMoodSound();
    triggerCameraFlash();

    // ==============================
    // ACHIEVEMENTS (Mood Selector)
    // ==============================
    (function recordMoodAndMaybeUnlockAchievement() {
      const TOAST_ID = "comicAchievementToast";
      const STORAGE_SEEN_KEY = "comic_mood_seen";
      const STORAGE_UNLOCKED_KEY = "comic_mood_achievement_unlocked";

      const ALL_MOODS = ["Surprise", "Sad", "Sassy", "Smile", "Wink"];
      if (!ALL_MOODS.includes(moodName)) return;

      let seen = {};
      try {
        const raw = localStorage.getItem(STORAGE_SEEN_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === "object") seen = parsed;
        }
      } catch (_) {}

      if (!seen[moodName]) {
        seen[moodName] = true;
        try {
          localStorage.setItem(STORAGE_SEEN_KEY, JSON.stringify(seen));
        } catch (_) {}
      }

      console.log(`Mood recorded: ${moodName}`);

      const countSeen = ALL_MOODS.reduce((acc, m) => acc + (seen[m] ? 1 : 0), 0);
      const allSeen = countSeen >= ALL_MOODS.length;

      let alreadyUnlocked = false;
      try {
        alreadyUnlocked = localStorage.getItem(STORAGE_UNLOCKED_KEY) === "1";
      } catch (_) {}

      if (!allSeen || alreadyUnlocked) return;

      try {
        localStorage.setItem(STORAGE_UNLOCKED_KEY, "1");
      } catch (_) {}

      console.log("Achievement unlocked!");

      const toast = document.getElementById(TOAST_ID);
      if (!toast) return;

      const titleEl = toast.querySelector(".comic-achievement-title");
      const descEl = toast.querySelector(".comic-achievement-desc");
      if (titleEl) titleEl.textContent = "🏆 Playing With My Emotions, Huh!?";
      if (descEl) descEl.textContent = "You tried every version of Sania.";

      toast.classList.remove("is-showing");
      toast.hidden = false;
      toast.offsetHeight;
      toast.classList.add("is-showing");


      setTimeout(() => {
        toast.classList.remove("is-showing");
        toast.hidden = true;
      }, 4800);
    })();

    setLabel(moodName);

    fadeAndSwapHero(nextSrc);
    closeModal();
  }



  if (moodBtn && moodModal) {
    moodBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const expanded = moodBtn.getAttribute("aria-expanded") === "true";
      if (expanded) closeModal();
      else openModal();
    });
  }

  if (moodCloseBtn) {
    moodCloseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeModal();
    });
  }


  moodOptions.forEach((opt) => {
    opt.addEventListener("click", (e) => {
      e.stopPropagation();
      chooseMood(opt);
    });
  });

  if (moodModal) {
    moodModal.addEventListener("click", (e) => {
      if (e.target === moodModal) closeModal();
    });
  }

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && moodModal && !moodModal.hidden) closeModal();
  });
})();

/* ===================================
   STEAM-STYLE ACHIEVEMENT: MOOD SELECTOR
=================================== */
(function () {
  const TOAST_ID = "comicAchievementToast";
  const STORAGE_SEEN_KEY = "comic_mood_seen";
  const STORAGE_UNLOCKED_KEY = "comic_mood_achievement_unlocked";

  const ALL_MOODS = ["Surprise", "Sad", "Sassy", "Smile", "Wink"];
  const REQUIRED_COUNT = ALL_MOODS.length;

  const ACHIEVEMENT_TITLE = "🏆 Playing With My Emotions, Huh!?";
  const ACHIEVEMENT_DESC = "You tried every version of Sania.";

  function getToastEl() {
    return document.getElementById(TOAST_ID);
  }
  console.log("Toast Found:", getToastEl());
  

  function readSeenMap() {
    try {
      const raw = localStorage.getItem(STORAGE_SEEN_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return {};
      return parsed;
    } catch (_) {
      return {};
    }
  }

  function writeSeenMap(map) {
    try {
      localStorage.setItem(STORAGE_SEEN_KEY, JSON.stringify(map));
    } catch (_) {}
  }

  function hasUnlocked() {
    try {
      return localStorage.getItem(STORAGE_UNLOCKED_KEY) === "1";
    } catch (_) {
      return false;
    }
  }

  function setUnlocked() {
    try {
      localStorage.setItem(STORAGE_UNLOCKED_KEY, "1");
    } catch (_) {}
  }

  function updateToastText(title, desc) {
    const toast = getToastEl();
    if (!toast) return;

    const titleEl = toast.querySelector(".comic-achievement-title");
    const descEl = toast.querySelector(".comic-achievement-desc");

    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
  }

  function showToast() {
    const toast = getToastEl();
    if (!toast) return;

    updateToastText(ACHIEVEMENT_TITLE, ACHIEVEMENT_DESC);

    toast.classList.remove("is-showing");
    toast.hidden = false;

    // Force reflow so the animation can restart reliably.
    toast.offsetHeight;

    toast.classList.add("is-showing");

    // Visible ~4 seconds, then hide.
    setTimeout(() => {
      toast.classList.remove("is-showing");
      toast.hidden = true;
    }, 4800);
  }

  function markMoodSeen(moodName) {
    if (!ALL_MOODS.includes(moodName)) return { allSeen: false };

    const seen = readSeenMap();
    seen[moodName] = true;
    writeSeenMap(seen);

    const countSeen = ALL_MOODS.reduce((acc, m) => acc + (seen[m] ? 1 : 0), 0);
    return { allSeen: countSeen >= REQUIRED_COUNT };
  }

  function handleMoodClick(e) {
    const target = e.target && e.target.closest ? e.target.closest(".mood-option") : null;
    if (!target) return;

    const moodName = target.getAttribute("data-mood");
    if (!moodName) return;

    const { allSeen } = markMoodSeen(moodName);
    if (!allSeen) return;

    if (hasUnlocked()) return;
    console.log("ACHIEVEMENT UNLOCKED!");
    setUnlocked();
    showToast();
  }

document.addEventListener("click", handleMoodClick, { passive: true });

  // Debug (safe): remove later if needed.
  // console.log("[Achievement] mood tracking active");
})();

window.addEventListener("scroll", () => {

    const section =
    document.getElementById("system-status-card");

    if(!section) return;

    const sectionTop =
    section.getBoundingClientRect().top;

    const screenHeight =
    window.innerHeight;

    if(sectionTop < screenHeight - 150){

        document
        .querySelectorAll(
            ".system-progress-bar"
        )
        .forEach(bar => {

            if(bar.dataset.animated)
                return;

            bar.style.width =
            bar.dataset.width;

            bar.dataset.animated =
            "true";

        });

    }

});

window.addEventListener("load", () => {

    const bars =
    document.querySelectorAll(".system-progress-bar");

    bars.forEach(bar => {

        const target =
        bar.style.getPropertyValue("--p");

        setTimeout(() => {
            bar.style.width = target;
        }, 300);

    });

});








