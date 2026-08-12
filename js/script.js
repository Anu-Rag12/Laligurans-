// Mobile menu
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
if (menu && nav) {
  menu.addEventListener("click", () => nav.classList.toggle("show"));
  document.querySelectorAll(".nav-links a").forEach(a =>
    a.addEventListener("click", () => nav.classList.remove("show"))
  );
}

// Active nav on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) link.classList.add("active");
      });
    }
  });
}, { passive: true });

// Smooth scroll-reveal (like official site)
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
revealEls.forEach((el) => revealObserver.observe(el));

// Stats bar in-view for staggered entrance
const statsBar = document.querySelector(".stats-bar");
if (statsBar) {
  const statsObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          statsObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );
  statsObs.observe(statsBar);
}

// Animated counters
const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const isPercent = target === 99;
      const duration = 1600;
      const start = performance.now();

      function tick(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const n = Math.round(eased * target);
        el.textContent = isPercent ? n + "%" : n + "+";
        if (t < 1) requestAnimationFrame(tick);
        else {
          el.textContent = isPercent ? target + "%" : target + "+";
          el.classList.add("counted");
        }
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.35 }
);
counters.forEach((c) => counterObserver.observe(c));

// Click pulse on stats
document.querySelectorAll(".stat-item").forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.add("pulse");
    setTimeout(() => item.classList.remove("pulse"), 400);
  });
});

// Safety: force-show any reveal still hidden after 1.5s (no stuck content)
setTimeout(() => {
  document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
    el.classList.add("visible");
  });
  if (statsBar) statsBar.classList.add("in-view");
}, 1500);

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

function handleSubmit(e) {
  e.preventDefault();
  const msg = document.getElementById("form-message");
  msg.textContent =
    "Thank you! Connect this form to your email/backend before publishing.";
  e.target.reset();
}
