(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll progress bar
  const bar = document.getElementById("scroll-progress");
  if (bar) {
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? (window.scrollY / h) * 100 : 0;
      bar.style.width = p + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  if (reduce) return;

  // Hero parallax
  const heroBg = document.querySelector(".hero-bg");
  const heroOrbs = document.querySelector(".hero-orbs");
  if (heroBg) {
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        if (y < 700) {
          heroBg.style.transform = `scale(1.08) translateY(${y * 0.25}px)`;
          if (heroOrbs) heroOrbs.style.transform = `translateY(${y * 0.15}px)`;
        }
      },
      { passive: true }
    );
  }

  // Floating particles on hero canvas
  const canvas = document.getElementById("hero-particles");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w, h, particles, raf;
    const hero = canvas.closest(".hero");

    function resize() {
      w = canvas.width = hero.offsetWidth;
      h = canvas.height = hero.offsetHeight;
      particles = Array.from({ length: 36 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1 + Math.random() * 2.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.15 - Math.random() * 0.4,
        a: 0.15 + Math.random() * 0.35,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) p.y = h + 10;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize, { passive: true });
  }

  // Tilt cards on mouse
  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * -8;
      const ry = ((x / r.width) - 0.5) * 8;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  // Button shine follow
  document.querySelectorAll(".btn-shine").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty("--mx", e.clientX - r.left + "px");
      btn.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });

  // Magnetic-ish nav active pulse already exists; enhance section labels
  const labels = document.querySelectorAll(".section-label");
  const labelObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) en.target.classList.add("label-in");
      });
    },
    { threshold: 0.5 }
  );
  labels.forEach((l) => labelObs.observe(l));
})();
