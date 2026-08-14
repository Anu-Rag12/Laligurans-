(function () {
  const filters = document.querySelectorAll(".cal-filter");
  const events = document.querySelectorAll(".cal-event");
  const months = document.querySelectorAll(".calendar-months .month");
  const search = document.getElementById("cal-search");
  const empty = document.getElementById("cal-empty");
  const modal = document.getElementById("cal-modal");
  if (!filters.length || !events.length) return;

  let activeFilter = "all";
  let query = "";

  function applyFilters() {
    let visibleCount = 0;
    months.forEach((month) => {
      const items = month.querySelectorAll(".cal-event");
      let monthHas = false;
      items.forEach((el) => {
        const type = el.dataset.type || "";
        const title = (el.dataset.title || el.textContent || "").toLowerCase();
        const matchType = activeFilter === "all" || type === activeFilter;
        const matchQuery = !query || title.includes(query);
        const show = matchType && matchQuery;
        el.classList.toggle("is-hidden", !show);
        if (show) {
          monthHas = true;
          visibleCount++;
        }
      });
      month.classList.toggle("is-hidden", !monthHas);
      // expand months that have matches when filtering
      if (monthHas && activeFilter !== "all") {
        month.classList.remove("collapsed");
        const head = month.querySelector(".month-head");
        if (head) head.setAttribute("aria-expanded", "true");
        const toggle = month.querySelector(".month-toggle");
        if (toggle) toggle.textContent = "−";
      }
    });
    if (empty) empty.hidden = visibleCount > 0;
  }

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter || "all";
      applyFilters();
    });
  });

  if (search) {
    search.addEventListener("input", () => {
      query = search.value.trim().toLowerCase();
      applyFilters();
    });
  }

  // Month collapse / expand
  document.querySelectorAll(".month-head").forEach((head) => {
    head.addEventListener("click", () => {
      const month = head.closest(".month");
      if (!month) return;
      const collapsed = month.classList.toggle("collapsed");
      head.setAttribute("aria-expanded", collapsed ? "false" : "true");
      const toggle = head.querySelector(".month-toggle");
      if (toggle) toggle.textContent = collapsed ? "+" : "−";
    });
  });

  // Term jump buttons
  document.querySelectorAll(".term-jump").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = "month-" + btn.dataset.jump;
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove("collapsed");
        const head = el.querySelector(".month-head");
        if (head) head.setAttribute("aria-expanded", "true");
        const toggle = el.querySelector(".month-toggle");
        if (toggle) toggle.textContent = "−";
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.add("month-flash");
        setTimeout(() => el.classList.remove("month-flash"), 1200);
      }
    });
  });

  // Modal
  function openModal(el) {
    if (!modal) return;
    document.getElementById("cal-modal-title").textContent = el.dataset.title || "";
    document.getElementById("cal-modal-date").textContent = el.dataset.date || "";
    document.getElementById("cal-modal-desc").textContent = el.dataset.desc || "";
    const typeEl = document.getElementById("cal-modal-type");
    const type = el.dataset.type || "event";
    typeEl.textContent = type;
    typeEl.className = "cal-modal-type type-" + type;
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  events.forEach((el) => {
    el.addEventListener("click", () => openModal(el));
    el.setAttribute("tabindex", "0");
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(el);
      }
    });
  });

  modal?.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
})();
