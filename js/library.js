(function () {
  var list = document.getElementById("library-list");
  var sortWrap = document.getElementById("library-sort");
  var countEl = document.getElementById("library-count");
  if (!list || !sortWrap) return;

  var cards = Array.prototype.slice.call(list.querySelectorAll(".book-card"));
  var buttons = Array.prototype.slice.call(sortWrap.querySelectorAll("[data-sort]"));

  var labels = {
    catalogue: "catalogue order",
    rating: "highest rated",
    title: "title",
    author: "author",
    year: "year published"
  };

  function num(card, attr, fallback) {
    var v = parseFloat(card.getAttribute(attr));
    return isNaN(v) ? fallback : v;
  }

  function str(card, attr) {
    return (card.getAttribute(attr) || "").toLowerCase();
  }

  function compare(mode, a, b) {
    if (mode === "rating") {
      var ra = num(a, "data-rating", 0);
      var rb = num(b, "data-rating", 0);
      if (rb !== ra) return rb - ra;
      var ta = str(a, "data-title");
      var tb = str(b, "data-title");
      if (ta !== tb) return ta < tb ? -1 : 1;
      return num(a, "data-index", 0) - num(b, "data-index", 0);
    }
    if (mode === "title") {
      var t1 = str(a, "data-title");
      var t2 = str(b, "data-title");
      if (t1 !== t2) return t1 < t2 ? -1 : 1;
      return num(a, "data-index", 0) - num(b, "data-index", 0);
    }
    if (mode === "author") {
      var a1 = str(a, "data-author");
      var a2 = str(b, "data-author");
      if (a1 !== a2) return a1 < a2 ? -1 : 1;
      var yt1 = str(a, "data-title");
      var yt2 = str(b, "data-title");
      return yt1 < yt2 ? -1 : yt1 > yt2 ? 1 : 0;
    }
    if (mode === "year") {
      var y1 = num(a, "data-year", 0);
      var y2 = num(b, "data-year", 0);
      if (y2 !== y1) return y2 - y1;
      return num(a, "data-index", 0) - num(b, "data-index", 0);
    }
    return num(a, "data-index", 0) - num(b, "data-index", 0);
  }

  function applySort(mode) {
    var sorted = cards.slice().sort(function (a, b) {
      return compare(mode, a, b);
    });
    var frag = document.createDocumentFragment();
    sorted.forEach(function (card) {
      frag.appendChild(card);
    });
    list.appendChild(frag);

    buttons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-sort") === mode ? "true" : "false");
    });

    if (countEl) {
      var label = labels[mode] || "catalogue order";
      countEl.textContent = cards.length + " volumes · " + label;
    }
  }

  sortWrap.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-sort]");
    if (!btn) return;
    applySort(btn.getAttribute("data-sort"));
  });

  applySort("catalogue");
})();
