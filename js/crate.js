(function () {
  var ASSET_VERSION = "20261126f";

  function cacheBust(url) {
    if (!url) return url;
    return url + (url.indexOf("?") === -1 ? "?" : "&") + "v=" + ASSET_VERSION;
  }

  var list = document.getElementById("crate-list");
  var sortWrap = document.getElementById("crate-sort");
  var toolbar = document.getElementById("crate-toolbar");
  var countEl = document.getElementById("crate-count");
  var emptyEl = document.getElementById("crate-empty");
  if (!list) return;

  var items = Array.isArray(window.CRATE) ? window.CRATE : [];
  var sortMode = "catalogue";

  var sortLabels = {
    catalogue: "catalogue order",
    title: "title",
    artist: "artist",
    year: "year released"
  };

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function coverSrc(item, slug) {
    if (item.cover) {
      if (item.cover.indexOf("/") !== -1) return item.cover;
      return "../images/sleeves/" + encodeURIComponent(item.cover);
    }
    return "../images/sleeves/" + encodeURIComponent(slug) + ".webp";
  }

  function coverSrc240(src) {
    return src.replace(/(\.webp)(\?|$)/i, "-240.webp$2");
  }

  function cardHtml(item, index) {
    var slug = item.slug || ("record-" + index);
    var title = item.title || "Untitled";
    var artist = item.artist || "";
    var year = item.year || 0;
    var width = item.coverWidth || 480;
    var height = item.coverHeight || 480;
    var src = cacheBust(coverSrc(item, slug));
    var src240 = cacheBust(coverSrc240(coverSrc(item, slug)));
    var lazy = index === 0 ? "" : ' loading="lazy"';
    var note = item.note
      ? '<p class="book-review">' + esc(item.note) + "</p>"
      : "";
    var alt = item.coverAlt || ("Sleeve for " + title + (artist ? " by " + artist : "") + ".");
    return (
      '<li class="book-card" data-index="' + index +
      '" data-title="' + esc(title.toLowerCase()) +
      '" data-artist="' + esc(artist.toLowerCase()) +
      '" data-year="' + year + '">' +
      '<div class="book-cover sleeve-cover">' +
      '<img src="' + src + '" srcset="' + src240 + " 240w, " + src + " " + width +
      'w" sizes="(max-width: 680px) 8.6rem, 9.75rem" width="' + width + '" height="' + height +
      '" alt="' + esc(alt) +
      '" decoding="async"' + lazy + ">" +
      "</div>" +
      '<div class="book-copy">' +
      '<h2 class="book-title">' + esc(title) + "</h2>" +
      (artist ? '<p class="book-author">' + esc(artist) + "</p>" : "") +
      (year ? '<p class="screening-year">' + year + "</p>" : "") +
      note +
      "</div></li>"
    );
  }

  function compare(mode, a, b, indexA, indexB) {
    if (mode === "title") {
      var t1 = (a.title || "").toLowerCase();
      var t2 = (b.title || "").toLowerCase();
      if (t1 !== t2) return t1 < t2 ? -1 : 1;
      return indexA - indexB;
    }
    if (mode === "artist") {
      var a1 = (a.artist || "").toLowerCase();
      var a2 = (b.artist || "").toLowerCase();
      if (a1 !== a2) return a1 < a2 ? -1 : 1;
      var t1 = (a.title || "").toLowerCase();
      var t2 = (b.title || "").toLowerCase();
      if (t1 !== t2) return t1 < t2 ? -1 : 1;
      return indexA - indexB;
    }
    if (mode === "year") {
      var y1 = a.year || 0;
      var y2 = b.year || 0;
      if (y2 !== y1) return y2 - y1;
      return indexA - indexB;
    }
    return indexA - indexB;
  }

  function noun(n) {
    return n === 1 ? "record" : "records";
  }

  function render() {
    if (!items.length) {
      list.innerHTML = "";
      list.setAttribute("hidden", "");
      if (toolbar) toolbar.setAttribute("hidden", "");
      if (emptyEl) emptyEl.removeAttribute("hidden");
      return;
    }

    if (emptyEl) emptyEl.setAttribute("hidden", "");
    list.removeAttribute("hidden");
    if (toolbar) toolbar.removeAttribute("hidden");

    var indexed = items.map(function (item, index) {
      return { item: item, index: index };
    });
    indexed.sort(function (a, b) {
      return compare(sortMode, a.item, b.item, a.index, b.index);
    });
    list.innerHTML = indexed.map(function (row) {
      return cardHtml(row.item, row.index);
    }).join("");

    if (sortWrap) {
      var buttons = sortWrap.querySelectorAll("[data-sort]");
      Array.prototype.forEach.call(buttons, function (btn) {
        btn.setAttribute("aria-pressed", btn.getAttribute("data-sort") === sortMode ? "true" : "false");
      });
    }
    if (countEl) {
      var label = sortLabels[sortMode] || "catalogue order";
      countEl.textContent = items.length + " " + noun(items.length) + " · " + label;
    }
  }

  if (sortWrap) {
    sortWrap.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-sort]");
      if (!btn) return;
      sortMode = btn.getAttribute("data-sort") || "catalogue";
      render();
    });
  }

  render();
})();
