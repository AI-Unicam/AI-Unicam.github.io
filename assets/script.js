(function () {
  var THEME_KEY = "aiunicam-theme";
  var LANG_KEY = "aiunicam-lang";
  var root = document.documentElement;

  function getPreferredTheme() {
    var stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  function applyLang(lang) {
    root.setAttribute("lang", lang);
    var btn = document.getElementById("lang-toggle");
    if (btn) btn.textContent = lang === "en" ? "IT" : "EN";
  }

  // Synchronise state immediately before full DOM load to minimize flash
  applyTheme(getPreferredTheme());
  applyLang(localStorage.getItem(LANG_KEY) || "en");

  document.addEventListener("DOMContentLoaded", function () {
    var themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
        localStorage.setItem(THEME_KEY, next);
      });
    }

    var langBtn = document.getElementById("lang-toggle");
    if (langBtn) {
      langBtn.addEventListener("click", function () {
        var next = root.getAttribute("lang") === "en" ? "it" : "en";
        applyLang(next);
        localStorage.setItem(LANG_KEY, next);
      });
    }
  });
})();