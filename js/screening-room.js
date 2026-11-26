(function () {
  var ASSET_VERSION = "20261126a";

  function cacheBust(url) {
    if (!url) return url;
    return url + (url.indexOf("?") === -1 ? "?" : "&") + "v=" + ASSET_VERSION;
  }

  var list = document.getElementById("screening-list");
  var sortWrap = document.getElementById("screening-sort");
  var filterWrap = document.getElementById("screening-filter");
  var countEl = document.getElementById("screening-count");
  if (!list) return;

  var items = Array.isArray(window.SCREENINGS) ? window.SCREENINGS : [];
  var sortMode = "catalogue";
  var filterMode = "all";

  var sortLabels = {
    catalogue: "catalogue order",
    rating: "highest rated",
    title: "title",
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

  function formatScore(value) {
    return (Math.round(value * 10) / 10).toFixed(1);
  }

  function ratingMarkup(item) {
    if (item.unfinished) {
      return '<p class="book-rating is-pending">Not yet finished</p>';
    }
    if (typeof item.rating === "number") {
      var text = formatScore(item.rating) + " / 10";
      return '<p class="book-rating">' + text + "</p>";
    }
    if (item.ratingNote) {
      return '<p class="book-rating">' + esc(item.ratingNote) + "</p>";
    }
    return '<p class="book-rating is-pending">Not yet rated</p>';
  }

  function cardHtml(item, index) {
    var slug = item.slug || ("title-" + index);
    var title = item.title || "Untitled";
    var type = item.type === "tv" ? "tv" : "film";
    var hasRating = typeof item.rating === "number";
    var year = item.year || 0;
    var width = item.posterWidth || 480;
    var height = item.posterHeight || 720;
    var src = cacheBust("../images/posters/" + encodeURIComponent(slug) + ".webp");
    var src240 = cacheBust("../images/posters/" + encodeURIComponent(slug) + "-240.webp");
    var lazy = index === 0 ? "" : ' loading="lazy"';
    var review = item.review
      ? '<p class="book-review">' + esc(item.review) + "</p>"
      : "";
    return (
      '<li class="book-card" data-index="' + index + '"' +
      (hasRating ? ' data-rating="' + item.rating + '"' : "") +
      ' data-title="' + esc(title.toLowerCase()) +
      '" data-year="' + year + '" data-type="' + type + '">' +
      '<div class="book-cover">' +
      '<img src="' + src + '" srcset="' + src240 + " 240w, " + src + " " + width +
      'w" sizes="(max-width: 680px) 8.6rem, 9.75rem" width="' + width + '" height="' + height +
      '" alt="' + esc(item.posterAlt || ("Poster for " + title + ".")) +
      '" decoding="async"' + lazy + ">" +
      "</div>" +
      '<div class="book-copy">' +
      '<h2 class="book-title">' + esc(title) + "</h2>" +
      (year ? '<p class="screening-year">' + year + "</p>" : "") +
      ratingMarkup(item) +
      review +
      "</div></li>"
    );
  }

  function visibleItems() {
    return items.filter(function (item) {
      if (filterMode === "all") return true;
      var type = item.type === "tv" ? "tv" : "film";
      return type === filterMode;
    });
  }

  function compare(mode, a, b, indexA, indexB) {
    if (mode === "rating") {
      var ra = typeof a.rating === "number" ? a.rating : null;
      var rb = typeof b.rating === "number" ? b.rating : null;
      if (ra == null && rb == null) return indexA - indexB;
      if (ra == null) return 1;
      if (rb == null) return -1;
      if (rb !== ra) return rb - ra;
      return indexA - indexB;
    }
    if (mode === "title") {
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

  function noun(n, filtered) {
    if (filtered === "film") return n === 1 ? "film" : "films";
    if (filtered === "tv") return n === 1 ? "programme" : "programmes";
    return n === 1 ? "title" : "titles";
  }

  function render() {
    var decorated = visibleItems().map(function (item) {
      return { item: item, index: items.indexOf(item) };
    });
    decorated.sort(function (a, b) {
      return compare(sortMode, a.item, b.item, a.index, b.index);
    });
    list.innerHTML = decorated.map(function (row) {
      return cardHtml(row.item, row.index);
    }).join("");

    if (sortWrap) {
      Array.prototype.forEach.call(sortWrap.querySelectorAll("[data-sort]"), function (btn) {
        btn.setAttribute("aria-pressed", btn.getAttribute("data-sort") === sortMode ? "true" : "false");
      });
    }
    if (filterWrap) {
      Array.prototype.forEach.call(filterWrap.querySelectorAll("[data-filter]"), function (btn) {
        btn.setAttribute("aria-pressed", btn.getAttribute("data-filter") === filterMode ? "true" : "false");
      });
    }
    if (countEl) {
      var label = sortLabels[sortMode] || "catalogue order";
      countEl.textContent = decorated.length + " " + noun(decorated.length, filterMode) + " · " + label;
    }
  }

  if (sortWrap) {
    sortWrap.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-sort]");
      if (!btn) return;
      sortMode = btn.getAttribute("data-sort");
      render();
    });
  }
  if (filterWrap) {
    filterWrap.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-filter]");
      if (!btn) return;
      filterMode = btn.getAttribute("data-filter");
      render();
    });
  }

  render();
})();
