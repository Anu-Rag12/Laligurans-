(function () {
  const btns = document.querySelectorAll(".gal-filter");
  const items = document.querySelectorAll(".gallery-item");
  const empty = document.getElementById("gal-empty");
  if (!btns.length || !items.length) return;

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter || "all";
      let n = 0;
      items.forEach((el) => {
        const show = f === "all" || el.dataset.cat === f;
        el.style.display = show ? "" : "none";
        if (show) n++;
      });
      if (empty) empty.hidden = n > 0;
    });
  });
})();
