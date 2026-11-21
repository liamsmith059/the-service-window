(function () {
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

  function setHeaderHeight() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    document.documentElement.style.setProperty("--site-header-height", header.getBoundingClientRect().height + "px");
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

  window.addEventListener("resize", function () {
    if (open) setHeaderHeight();
  });
})();
