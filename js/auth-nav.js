(function () {
  function applyLoggedIn() {
    document.querySelectorAll("a[href='admissions.html'], a[href=\"admissions.html\"]").forEach(function (a) {
      a.style.display = "none";
    });
    document.querySelectorAll("a[href='academics.html'], a[href=\"academics.html\"]").forEach(function (a) {
      a.style.display = "none";
    });
    // Show Results links
    document.querySelectorAll("a[href='results.html'], a.student-only").forEach(function (a) {
      a.style.display = "";
    });
    // Portal button -> Results
    document.querySelectorAll("a.btn-portal").forEach(function (a) {
      a.textContent = "My Results";
      a.setAttribute("href", "results.html");
    });
  }

  if (typeof supabase === "undefined" || !window.lgbsCreateClient) return;
  var sb = window.lgbsCreateClient();
  if (!sb) return;

  sb.auth.getSession().then(function (res) {
    if (res.data && res.data.session) applyLoggedIn();
  });
})();
