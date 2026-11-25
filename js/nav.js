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

  var exploreHide = function () {};
  var chaptersHide = function () {};

  function slugify(text) {
    return String(text || "")
      .toLowerCase()
      .trim()
      .replace(/['’]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function siteRoot() {
    var script = document.querySelector('script[src*="nav.js"]');
    if (script && script.getAttribute("src")) {
      return new URL("../", new URL(script.getAttribute("src"), window.location.href)).href;
    }
    return new URL("/", window.location.href).href;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function readChaptersFromDoc(doc, assignMissing) {
    var sections = doc.querySelectorAll("main .tribute-section");
    var chapters = [];
    for (var i = 0; i < sections.length; i++) {
      var heading = sections[i].querySelector("h2");
      if (!heading) continue;
      var title = (heading.textContent || "").replace(/\s+/g, " ").trim();
      if (!title) continue;
      var id = sections[i].id || heading.id || "";
      if (!id) {
        id = slugify(title);
        if (assignMissing && id) sections[i].id = id;
      }
      if (!id) continue;
      chapters.push({ id: id, title: title });
    }
    return chapters;
  }

  (function initChapters() {
    var mark = document.querySelector(".mark");
    if (!mark) return;

    var root = siteRoot();
    var homeHref = root;
    var CACHE_KEY = "sw-chapters-v1";
    var hoverable = window.matchMedia("(hover: hover) and (pointer: fine)");
    var motionReduced = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;

    var wrap;
    var btn;
    var panel;
    var list;

    if (mark.classList.contains("chapters") && mark.querySelector(".mark-btn") && mark.querySelector(".chapters-panel")) {
      wrap = mark;
      btn = mark.querySelector(".mark-btn");
      panel = mark.querySelector(".chapters-panel");
      list = mark.querySelector(".chapters-list") || document.createElement("ul");
      if (!list.parentNode) {
        list.className = "chapters-list";
        panel.appendChild(list);
      }
    } else {
      homeHref = mark.getAttribute("href") ? new URL(mark.getAttribute("href"), window.location.href).href : root;
      var name = mark.querySelector(".mark-name");
      var nameHtml = name ? name.outerHTML : '<span class="mark-name">Wilhelm Smithers</span>';
      wrap = document.createElement("div");
      wrap.className = "mark chapters";
      wrap.id = "chapters";
      wrap.innerHTML =
        '<button class="mark-btn" id="chapters-btn" type="button" aria-expanded="false" aria-controls="chapters-panel" aria-haspopup="true">' +
          nameHtml +
          '<svg class="mark-caret" viewBox="0 0 12 8" width="10" height="7" aria-hidden="true" focusable="false"><path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        "</button>" +
        '<nav class="chapters-panel" id="chapters-panel" aria-label="Biography" hidden>' +
          '<ul class="chapters-list"></ul>' +
        "</nav>";
      mark.replaceWith(wrap);
      btn = wrap.querySelector(".mark-btn");
      panel = wrap.querySelector(".chapters-panel");
      list = wrap.querySelector(".chapters-list");
    }

    var open = false;
    var pinned = false;
    var openTimer = 0;
    var closeTimer = 0;
    var touchItem = null;

    function items() {
      return Array.prototype.slice.call(list.querySelectorAll(".chapters-item"));
    }

    function isHomePage() {
      return !!document.querySelector("main .tribute-section");
    }

    function renderList(chapters) {
      var html = '<li><a class="chapters-item chapters-home" href="' + escapeHtml(homeHref) + '">Home</a></li>';
      for (var i = 0; i < chapters.length; i++) {
        var href = new URL("#" + chapters[i].id, root).href;
        html += '<li><a class="chapters-item" href="' + escapeHtml(href) + '" data-chapter="' + escapeHtml(chapters[i].id) + '">' + escapeHtml(chapters[i].title) + "</a></li>";
      }
      list.innerHTML = html;
      syncCurrent();
    }

    function currentChapterId() {
      if (!isHomePage()) return "";
      var hash = (window.location.hash || "").replace(/^#/, "");
      if (hash && document.getElementById(hash)) return hash;
      var sections = document.querySelectorAll("main .tribute-section[id]");
      var headerH = header ? header.getBoundingClientRect().height : 0;
      var marker = headerH + 16;
      var active = "";
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top <= marker + 8) active = sections[i].id;
      }
      return active;
    }

    function syncCurrent() {
      var active = currentChapterId();
      var links = items();
      for (var i = 0; i < links.length; i++) {
        var isCurrent = active
          ? links[i].getAttribute("data-chapter") === active
          : links[i].classList.contains("chapters-home") && isHomePage() && window.scrollY < 40;
        if (isCurrent) links[i].setAttribute("aria-current", "location");
        else links[i].removeAttribute("aria-current");
      }
    }

    function show(how) {
      window.clearTimeout(closeTimer);
      window.clearTimeout(openTimer);
      exploreHide();
      if (how === "click") pinned = true;
      if (open) return;
      open = true;
      setHeaderHeight();
      panel.hidden = false;
      wrap.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      placePanel();
      syncCurrent();
    }

    function placePanel() {
      panel.style.left = "0px";
      panel.style.right = "auto";
      var margin = 10;
      var rect = panel.getBoundingClientRect();
      if (rect.right > window.innerWidth - margin) {
        panel.style.left = ((window.innerWidth - margin) - rect.right) + "px";
      }
      rect = panel.getBoundingClientRect();
      if (rect.left < margin) {
        var wrapRect = wrap.getBoundingClientRect();
        panel.style.left = (margin - wrapRect.left) + "px";
      }
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

    chaptersHide = hide;

    function loadChapters() {
      var local = readChaptersFromDoc(document, true);
      if (local.length) {
        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(local)); } catch (err) { /* ignore */ }
        renderList(local);
        return Promise.resolve(local);
      }

      try {
        var cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          var parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length) renderList(parsed);
        }
      } catch (err) { /* ignore */ }

      return fetch(root, { credentials: "same-origin" }).then(function (res) {
        if (!res.ok) throw new Error("chapters fetch failed");
        return res.text();
      }).then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        var chapters = readChaptersFromDoc(doc, false);
        if (chapters.length) {
          try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(chapters)); } catch (err) { /* ignore */ }
          renderList(chapters);
        } else if (!list.children.length) {
          renderList([]);
        }
      }).catch(function () {
        if (!list.children.length) renderList([]);
      });
    }

    renderList([]);
    loadChapters();

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
      var listItems = items();
      var inPanel = panel.contains(event.target);
      if (event.key === "Escape" && open) {
        event.preventDefault();
        hide(true);
        return;
      }
      if (event.target === btn && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
        event.preventDefault();
        show("click");
        if (listItems.length) (event.key === "ArrowUp" ? listItems[listItems.length - 1] : listItems[0]).focus();
        return;
      }
      if (!inPanel) return;
      var index = listItems.indexOf(document.activeElement);
      var next = -1;
      if (event.key === "ArrowDown") next = (index + 1) % listItems.length;
      else if (event.key === "ArrowUp") next = (index - 1 + listItems.length) % listItems.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = listItems.length - 1;
      if (next >= 0 && listItems.length) {
        event.preventDefault();
        listItems[next].focus();
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

    list.addEventListener("click", function (event) {
      var link = event.target.closest ? event.target.closest(".chapters-item") : null;
      if (!link || !list.contains(link)) return;
      var onHome = isHomePage();
      var hash = (link.getAttribute("href") && link.hash) ? link.hash.slice(1) : "";
      if (onHome && link.classList.contains("chapters-home")) {
        event.preventDefault();
        hide(false);
        window.scrollTo({ top: 0, behavior: motionReduced && motionReduced.matches ? "auto" : "smooth" });
        if (history.replaceState) {
          history.replaceState(null, "", window.location.pathname + window.location.search);
        }
        syncCurrent();
        return;
      }
      if (onHome && hash) {
        var target = document.getElementById(hash);
        if (target) {
          event.preventDefault();
          hide(false);
          target.scrollIntoView();
          if (history.replaceState) {
            history.replaceState(null, "", "#" + hash);
          }
          syncCurrent();
        }
      } else {
        hide(false);
      }
    });

    panel.addEventListener("touchmove", function (event) {
      var touch = event.touches[0];
      var el = touch && document.elementFromPoint(touch.clientX, touch.clientY);
      var item = el && el.closest ? el.closest(".chapters-item") : null;
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

    window.addEventListener("scroll", syncCurrent, { passive: true });
    window.addEventListener("hashchange", syncCurrent);
    window.addEventListener("resize", function () {
      if (open) placePanel();
    });
  })();

  (function initExplore() {
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
      chaptersHide();
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

    exploreHide = hide;

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
})();
