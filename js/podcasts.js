(function () {
  var shows = Array.isArray(window.PODCASTS) ? window.PODCASTS : [];
  var ASSET_VERSION = "20261126i";

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

  function monogram(show) {
    if (show.monogram) return show.monogram;
    var ignore = { the: true, of: true, and: true, a: true, an: true };
    var letters = String(show.name || "")
      .split(/\s+/)
      .filter(Boolean)
      .filter(function (word) { return !ignore[word.toLowerCase()]; })
      .map(function (word) { return word.charAt(0).toUpperCase(); });
    return letters.join("") || "P";
  }

  function noun(n) {
    return n === 1 ? "episode" : "episodes";
  }

  function assetRoot() {
    var el = document.querySelector("[data-asset-root]");
    if (el && el.getAttribute("data-asset-root")) return el.getAttribute("data-asset-root");
    if (document.getElementById("podcast-episodes")) return "../../";
    return "../";
  }

  function artImg(show, sizes) {
    var stem = show && show.art;
    if (!stem) return "";
    var root = assetRoot();
    var width = show.artWidth || 400;
    var height = show.artHeight || width;
    var src = cacheBust(root + "images/podcasts/" + encodeURIComponent(stem) + ".webp");
    var src200 = cacheBust(root + "images/podcasts/" + encodeURIComponent(stem) + "-200.webp");
    var alt = show.artAlt || ("Cover art for " + (show.name || "this show") + ".");
    return (
      '<img src="' + src + '" srcset="' + src200 + " 200w, " + src + " " + width +
      'w" sizes="' + sizes + '" width="' + width + '" height="' + height +
      '" alt="' + esc(alt) + '" decoding="async">'
    );
  }

  function hubArt(show) {
    var img = artImg(show, "(max-width: 680px) 5.25rem, 6.5rem");
    if (img) return '<div class="show-card-art">' + img + "</div>";
    return '<div class="show-card-art" aria-hidden="true"><span>' + esc(monogram(show)) + "</span></div>";
  }

  function renderHub() {
    var list = document.getElementById("podcast-shows");
    if (!list) return;

    list.innerHTML = shows.map(function (show) {
      var n = (show.episodes || []).length;
      var href = "./" + encodeURIComponent(show.slug) + "/";
      var blurb = show.blurb
        ? '<p class="show-card-blurb">' + esc(show.blurb) + "</p>"
        : "";
      var count = n
        ? '<p class="show-card-count">' + n + " " + noun(n) + "</p>"
        : "";
      return (
        "<li>" +
        '<a class="show-card" href="' + href + '">' +
        hubArt(show) +
        '<div class="show-card-copy">' +
        '<h2 class="show-card-name">' + esc(show.name) + "</h2>" +
        blurb +
        count +
        "</div></a></li>"
      );
    }).join("");
  }

  function findShow(slug) {
    for (var i = 0; i < shows.length; i++) {
      if (shows[i].slug === slug) return shows[i];
    }
    return null;
  }

  function renderShowHeader(show) {
    var intro = document.getElementById("podcast-show-intro");
    if (!intro || !show || !show.art) return;
    if (intro.querySelector(".show-header-art")) return;
    intro.classList.add("show-intro");
    var wrap = document.createElement("div");
    wrap.className = "show-header-art";
    wrap.innerHTML = artImg(show, "(max-width: 680px) 5.5rem, 8.25rem");
    intro.insertBefore(wrap, intro.firstChild);
  }

  function renderShow() {
    var list = document.getElementById("podcast-episodes");
    if (!list) return;

    var slug = list.getAttribute("data-show");
    var show = findShow(slug);
    if (show) renderShowHeader(show);

    var countEl = document.getElementById("podcast-count");
    var emptyEl = document.getElementById("podcast-empty");
    var toolbar = countEl && countEl.closest
      ? countEl.closest(".library-toolbar")
      : document.querySelector(".library-toolbar");
    var episodes = show && Array.isArray(show.episodes) ? show.episodes : [];

    list.innerHTML = episodes.map(function (episode) {
      var note = episode.note
        ? '<p class="episode-note">' + esc(episode.note) + "</p>"
        : "";
      return (
        '<li class="episode-card">' +
        '<h2 class="episode-title">' + esc(episode.title) + "</h2>" +
        note +
        "</li>"
      );
    }).join("");

    if (countEl) {
      countEl.textContent = episodes.length + " " + noun(episodes.length);
    }
    if (toolbar) {
      if (episodes.length) toolbar.removeAttribute("hidden");
      else toolbar.setAttribute("hidden", "");
    }
    if (emptyEl) {
      if (episodes.length) emptyEl.setAttribute("hidden", "");
      else emptyEl.removeAttribute("hidden");
    }
  }

  renderHub();
  renderShow();
})();
