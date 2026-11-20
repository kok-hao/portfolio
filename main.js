// Typing effect in the hero
const words = ["full-stack apps", "CI/CD pipelines", "REST APIs", "secure systems"];
const typedEl = document.getElementById("typed");
let wordIndex = 0;
let charIndex = words[0].length;
let deleting = true;

function typeLoop() {
  const word = words[wordIndex];
  typedEl.textContent = word.slice(0, charIndex);

  if (deleting) {
    charIndex--;
    if (charIndex < 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      charIndex = 0;
    }
  } else {
    charIndex++;
    if (charIndex > words[wordIndex].length) {
      deleting = true;
      setTimeout(typeLoop, 1800); // pause on the full word
      return;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 85);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setTimeout(typeLoop, 2000);
}

// Fade sections in as they scroll into view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Dark mode toggle, remembered between visits
const root = document.documentElement;
const toggle = document.getElementById("themeToggle");

function getSavedTheme() {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.dataset.theme = getSavedTheme() || (prefersDark ? "dark" : "light");

toggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try {
    localStorage.setItem("theme", root.dataset.theme);
  } catch {
    /* storage unavailable, ignore */
  }
});

// Copy email to clipboard
const copyBtn = document.getElementById("copyEmail");
const toast = document.getElementById("toast");

copyBtn.addEventListener("click", async () => {
  const email = copyBtn.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    toast.textContent = `Copied ${email}`;
  } catch {
    window.location.href = `mailto:${email}`;
  }
  setTimeout(() => (toast.textContent = ""), 2500);
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
