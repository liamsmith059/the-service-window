(function () {
  var header = document.querySelector(".site-header");

  function setHeaderHeight() {
    if (!header) return;
    var h = Math.ceil(header.getBoundingClientRect().height);
    if (h > 0) {
      document.documentElement.style.setProperty("--site-header-height", h + "px");
    }
  }

  function syncScrolled() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  setHeaderHeight();
  syncScrolled();
  window.addEventListener("load", setHeaderHeight);
  window.addEventListener("resize", setHeaderHeight);
  window.addEventListener("scroll", syncScrolled, { passive: true });
  if (header && window.ResizeObserver) {
    new ResizeObserver(setHeaderHeight).observe(header);
  }

  var themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    var pulling = false;
    var pullSwitchTimer = 0;
    var pullDoneTimer = 0;
    var motionReduced = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;

    function applyTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      var dark = theme === "dark";
      var label = dark ? "Switch to light mode" : "Switch to dark mode";
      themeBtn.setAttribute("aria-pressed", dark ? "true" : "false");
      themeBtn.setAttribute("aria-label", label);
      themeBtn.setAttribute("title", label);
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", dark ? "#111111" : "#ffffff");
    }

    function commitToggle() {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("sw-theme", next); } catch (err) { /* storage may be blocked */ }
    }

    applyTheme(document.documentElement.getAttribute("data-theme") || "light");

    themeBtn.addEventListener("click", function () {
      if (motionReduced && motionReduced.matches) {
        commitToggle();
        return;
      }
      if (pulling) return;
      pulling = true;
      window.clearTimeout(pullSwitchTimer);
      window.clearTimeout(pullDoneTimer);
      themeBtn.classList.remove("is-pulling");
      void themeBtn.offsetWidth;
      themeBtn.classList.add("is-pulling");

      pullSwitchTimer = window.setTimeout(function () {
        commitToggle();
      }, 410);

      pullDoneTimer = window.setTimeout(function () {
        themeBtn.classList.remove("is-pulling");
        pulling = false;
      }, 500);
    });

    var saved = null;
    try { saved = localStorage.getItem("sw-theme"); } catch (err) { saved = null; }
    if (saved !== "light" && saved !== "dark" && window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (event) {
        applyTheme(event.matches ? "dark" : "light");
      });
    }
  }

  var wrap = document.getElementById("explore");
  var btn = document.getElementById("explore-btn");
  var panel = document.getElementById("explore-panel");
  if (!wrap || !btn || !panel) return;

  var open = false;
  var pinned = false;
  var openTimer = 0;
  var closeTimer = 0;
  var hoverable = window.matchMedia("(hover: hover) and (pointer: fine)");
  var touchItem = null;

  function items() {
    return Array.prototype.slice.call(panel.querySelectorAll(".explore-item"));
  }

  function show(how) {
    window.clearTimeout(closeTimer);
    window.clearTimeout(openTimer);
    if (how === "click") pinned = true;
    if (open) return;
    open = true;
    setHeaderHeight();
    panel.hidden = false;
    wrap.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
  }

  function hide(returnFocus) {
    window.clearTimeout(closeTimer);
    window.clearTimeout(openTimer);
    if (!open) return;
    open = false;
    pinned = false;
    panel.hidden = true;
    wrap.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    if (touchItem) {
      touchItem.classList.remove("is-hl");
      touchItem = null;
    }
    if (returnFocus) btn.focus();
  }

  btn.addEventListener("click", function () {
    if (open && !pinned) {
      pinned = true;
      return;
    }
    if (open) hide(false);
    else show("click");
  });

  wrap.addEventListener("mouseenter", function () {
    if (!hoverable.matches) return;
    window.clearTimeout(closeTimer);
    if (!open) openTimer = window.setTimeout(function () { show("hover"); }, 90);
  });

  wrap.addEventListener("mouseleave", function () {
    if (!hoverable.matches) return;
    window.clearTimeout(openTimer);
    if (open && !pinned) closeTimer = window.setTimeout(function () { hide(false); }, 280);
  });

  wrap.addEventListener("keydown", function (event) {
    var list = items();
    var inPanel = panel.contains(event.target);
    if (event.key === "Escape" && open) {
      event.preventDefault();
      hide(true);
      return;
    }
    if (event.target === btn && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      event.preventDefault();
      show("click");
      if (list.length) (event.key === "ArrowUp" ? list[list.length - 1] : list[0]).focus();
      return;
    }
    if (!inPanel) return;
    var index = list.indexOf(document.activeElement);
    var next = -1;
    if (event.key === "ArrowDown") next = (index + 1) % list.length;
    else if (event.key === "ArrowUp") next = (index - 1 + list.length) % list.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = list.length - 1;
    if (next >= 0 && list.length) {
      event.preventDefault();
      list[next].focus();
    }
  });

  wrap.addEventListener("focusout", function (event) {
    if (open && event.relatedTarget && !wrap.contains(event.relatedTarget)) hide(false);
  });

  document.addEventListener("pointerdown", function (event) {
    if (open && !wrap.contains(event.target)) hide(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && open && !wrap.contains(event.target)) hide(false);
  });

  panel.addEventListener("touchmove", function (event) {
    var touch = event.touches[0];
    var el = touch && document.elementFromPoint(touch.clientX, touch.clientY);
    var item = el && el.closest ? el.closest(".explore-item") : null;
    if (item && !panel.contains(item)) item = null;
    if (item === touchItem) return;
    if (touchItem) touchItem.classList.remove("is-hl");
    touchItem = item;
    if (touchItem) touchItem.classList.add("is-hl");
  }, { passive: true });

  function clearTouch() {
    if (!touchItem) return;
    touchItem.classList.remove("is-hl");
    touchItem = null;
  }
  panel.addEventListener("touchend", clearTouch, { passive: true });
  panel.addEventListener("touchcancel", clearTouch, { passive: true });
})();
