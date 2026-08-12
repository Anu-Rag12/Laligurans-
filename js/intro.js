(function () {
  "use strict";

  function run() {
    var intro = document.getElementById("site-intro");
    if (!intro) return;

    var body = document.body;
    var skipBtn = document.getElementById("intro-skip");
    var reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {}

    body.classList.add("intro-active");

    if (reduce) {
      endIntro();
      return;
    }

    var finished = false;
    function endIntro() {
      if (finished) return;
      finished = true;
      intro.classList.add("is-done");
      body.classList.remove("intro-active");
      body.classList.add("intro-finished");
      setTimeout(function () {
        if (intro && intro.parentNode) intro.parentNode.removeChild(intro);
      }, 1200);
    }

    // Hold full intro ~5.5s so it feels smooth, not a flash
    var timer = setTimeout(endIntro, 5500);

    function skip() {
      clearTimeout(timer);
      endIntro();
    }

    if (skipBtn) {
      skipBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        skip();
      });
    }

    // Allow skip only after 2s so user sees the animation
    setTimeout(function () {
      intro.addEventListener("click", function (e) {
        if (e.target && e.target.id === "intro-skip") return;
        skip();
      });
    }, 2000);

    document.addEventListener("keydown", function onKey(e) {
      if (e.key === "Escape") {
        document.removeEventListener("keydown", onKey);
        skip();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
