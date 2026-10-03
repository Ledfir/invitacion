// Centralized motion helpers built on anime.js
import anime from "animejs";

export const EASE_QUART = "cubicBezier(.215, .61, .355, 1)";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Split text into per-letter spans wrapped in an inline-block for transform animation.
export const splitLetters = (text) =>
  text.split("").map((ch, i) => ({
    char: ch === " " ? "\u00A0" : ch,
    key: i,
  }));

// Staggered letter assembly — letters fly in from varied directions with elastic weight.
export function animateLetters(target, { delay = 0, from } = {}) {
  if (prefersReducedMotion()) {
    anime.set(target, { opacity: 1, translateX: 0, translateY: 0, rotate: 0, scale: 1 });
    return;
  }
  anime({
    targets: target,
    opacity: [0, 1],
    translateX: () => [anime.random(-220, 220), 0],
    translateY: () => [anime.random(120, 320), 0],
    rotate: () => [anime.random(-90, 90), 0],
    scale: [0.4, 1],
    duration: 1100,
    delay: anime.stagger(45, { start: delay }),
    easing: "easeOutElastic(1, .6)",
  });
}

// Generic reveal: fade + translateY for headings / blocks.
export function reveal(target, { delay = 0, y = 40, duration = 900 } = {}) {
  if (prefersReducedMotion()) {
    anime.set(target, { opacity: 1, translateY: 0 });
    return;
  }
  anime({
    targets: target,
    opacity: [0, 1],
    translateY: [y, 0],
    duration,
    delay,
    easing: EASE_QUART,
  });
}

// Draw an SVG path using stroke-dashoffset.
export function drawLine(pathTarget, { delay = 0, duration = 1400 } = {}) {
  if (prefersReducedMotion()) {
    anime.set(pathTarget, { strokeDashoffset: 0 });
    return;
  }
  anime({
    targets: pathTarget,
    strokeDashoffset: [anime.setDashoffset, 0],
    duration,
    delay,
    easing: EASE_QUART,
  });
}

// Text shuffle / glitch used for the contact email.
export function shuffleText(el, finalText, { duration = 900 } = {}) {
  if (prefersReducedMotion()) {
    el.textContent = finalText;
    return;
  }
  const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@._-0123456789";
  let frame = 0;
  const total = finalText.length;
  const revealAt = Math.floor((duration / total) / 16); // frames per char reveal
  const interval = setInterval(() => {
    let out = "";
    for (let i = 0; i < total; i++) {
      if (i < frame / revealAt) {
        out += finalText[i];
      } else if (finalText[i] === " ") {
        out += " ";
      } else {
        out += glyphs[Math.floor(Math.random() * glyphs.length)];
      }
    }
    el.textContent = out;
    frame++;
    if (frame > total * revealAt + revealAt) {
      clearInterval(interval);
      el.textContent = finalText;
    }
  }, 16);
}