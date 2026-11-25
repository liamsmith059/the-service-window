(function () {
  var items = Array.isArray(window.MEMORIES) ? window.MEMORIES : [];
  var ASSET_VERSION = "20261125d";
  var MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  function cacheBust(url) {
    if (!url) return url;
    return url + (url.indexOf("?") === -1 ? "?" : "&") + "v=" + ASSET_VERSION;
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function assetRoot() {
    var el = document.querySelector("[data-asset-root]");
    if (el && el.getAttribute("data-asset-root")) return el.getAttribute("data-asset-root");
    return "../";
  }

  function parseDate(value) {
    var raw = String(value || "").trim();
    var full = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (full) {
      return { year: full[1], month: Number(full[2]), day: Number(full[3]), sort: raw, raw: raw };
    }
    var month = raw.match(/^(\d{4})-(\d{2})$/);
    if (month) {
      return { year: month[1], month: Number(month[2]), day: 0, sort: raw + "-00", raw: raw };
    }
    var year = raw.match(/^(\d{4})$/);
    if (year) {
      return { year: year[1], month: 0, day: 0, sort: raw + "-00-00", raw: raw };
    }
    return { year: "", month: 0, day: 0, sort: "9999-99-99", raw: raw };
  }

  function formatDate(parsed) {
    if (!parsed.year) return parsed.raw || "";
    if (parsed.month && parsed.day) {
      return parsed.day + " " + MONTHS[parsed.month - 1] + " " + parsed.year;
    }
    if (parsed.month) return MONTHS[parsed.month - 1] + " " + parsed.year;
    return parsed.year;
  }

  function resolveSrc(src) {
    if (!src) return "";
    if (src.indexOf("/") !== -1) return src;
    return "images/memories/" + src;
  }

  function resolveThumb(entry) {
    if (entry.thumb) return resolveSrc(entry.thumb);
    var src = resolveSrc(entry.src);
    return src.replace(/\.webp$/i, "-480.webp");
  }

  function prepared() {
    return items.map(function (entry, index) {
      var parsed = parseDate(entry.date);
      return {
        index: index,
        entry: entry,
        parsed: parsed,
        src: resolveSrc(entry.src),
        thumb: resolveThumb(entry),
        alt: entry.alt || "",
        caption: entry.caption || "",
        label: formatDate(parsed)
      };
    }).filter(function (item) {
      return !!item.src;
    }).sort(function (a, b) {
      if (a.parsed.sort === b.parsed.sort) return a.index - b.index;
      return a.parsed.sort < b.parsed.sort ? -1 : 1;
    });
  }

  function groupByYear(list) {
    var groups = [];
    var map = {};
    list.forEach(function (item) {
      var year = item.parsed.year || "Undated";
      if (!map[year]) {
        map[year] = { year: year, items: [] };
        groups.push(map[year]);
      }
      map[year].items.push(item);
    });
    return groups;
  }

  function renderCard(item, sizes) {
    var root = assetRoot();
    var src = cacheBust(root + item.src);
    var thumb = cacheBust(root + item.thumb);
    var width = item.entry.width || 1600;
    var height = item.entry.height || 1600;
    var caption = item.caption
      ? '<span class="memory-caption">' + esc(item.caption) + "</span>"
      : "";
    return (
      '<li>' +
        '<button type="button" class="memory-card" data-src="' + esc(src) + '" data-alt="' + esc(item.alt) + '" data-title="' + esc(item.label) + '" data-caption="' + esc(item.caption) + '">' +
          '<span class="memory-shot">' +
            '<img src="' + thumb + '" srcset="' + thumb + " 480w, " + src + " " + width + 'w" sizes="' + sizes + '" width="' + width + '" height="' + height + '" alt="' + esc(item.alt) + '" loading="lazy" decoding="async">' +
          "</span>" +
          '<span class="memory-meta">' +
            (item.label ? '<time class="memory-date" datetime="' + esc(item.parsed.raw) + '">' + esc(item.label) + "</time>" : "") +
            caption +
          "</span>" +
        "</button>" +
      "</li>"
    );
  }

  function render() {
    var rootEl = document.getElementById("memories-timeline");
    var emptyEl = document.getElementById("memories-empty");
    if (!rootEl) return;

    var list = prepared();
    if (!list.length) {
      rootEl.innerHTML = "";
      rootEl.setAttribute("hidden", "");
      if (emptyEl) emptyEl.removeAttribute("hidden");
      return;
    }

    if (emptyEl) emptyEl.setAttribute("hidden", "");
    rootEl.removeAttribute("hidden");

    var sizes = "(max-width: 680px) 46vw, (max-width: 980px) 30vw, 18rem";
    rootEl.innerHTML = groupByYear(list).map(function (group) {
      var id = group.year === "Undated" ? "memories-undated" : "memories-" + group.year;
      var cards = group.items.map(function (item) { return renderCard(item, sizes); }).join("");
      return (
        '<section class="memory-year" aria-labelledby="' + id + '">' +
          '<h2 class="memory-year-label" id="' + id + '">' + esc(group.year) + "</h2>" +
          '<ul class="memory-grid">' + cards + "</ul>" +
        "</section>"
      );
    }).join("");

    bindLightbox();
  }

  function bindLightbox() {
    var dialog = document.getElementById("lightbox");
    if (!dialog) return;

    var img = document.getElementById("lightbox-img");
    var title = document.getElementById("lightbox-title");
    var bio = document.getElementById("lightbox-bio");
    var cards = Array.prototype.slice.call(document.querySelectorAll(".memory-card"));
    var index = 0;
    var opener = null;

    function show(next) {
      if (!cards.length) return;
      index = (next + cards.length) % cards.length;
      var card = cards[index];
      img.src = card.getAttribute("data-src");
      img.alt = card.getAttribute("data-alt") || "";
      if (title) title.textContent = card.getAttribute("data-title") || "";
      if (bio) {
        var caption = card.getAttribute("data-caption") || "";
        bio.textContent = caption;
        bio.hidden = !caption;
      }
    }

    function lockPage(on) {
      document.documentElement.classList.toggle("lightbox-open", on);
      var header = document.querySelector(".site-header");
      if (header) header.inert = !!on;
    }

    function openAt(next, from) {
      opener = from;
      show(next);
      lockPage(true);
      if (!dialog.open) dialog.showModal();
      var close = dialog.querySelector(".lightbox-close");
      if (close) close.focus();
    }

    cards.forEach(function (card, i) {
      card.addEventListener("click", function () { openAt(i, card); });
    });

    var closeBtn = dialog.querySelector(".lightbox-close");
    if (closeBtn) closeBtn.addEventListener("click", function () { dialog.close(); });
    var prev = dialog.querySelector(".lightbox-prev");
    if (prev) prev.addEventListener("click", function () { show(index - 1); });
    var next = dialog.querySelector(".lightbox-next");
    if (next) next.addEventListener("click", function () { show(index + 1); });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", function () {
      lockPage(false);
      if (opener) opener.focus();
    });
    dialog.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        show(index - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        show(index + 1);
      }
    });
  }

  render();
})();
