(function () {
  var ASSET_VERSION = "20261126g";

  function cacheBust(url) {
    if (!url) return url;
    return url + (url.indexOf("?") === -1 ? "?" : "&") + "v=" + ASSET_VERSION;
  }

  var data = window.CELLAR;
  if (!data || !Array.isArray(data.chains)) return;

  var grid = document.getElementById("grid");
  var chips = document.getElementById("chips");
  var home = document.getElementById("view-home");
  var pairing = document.getElementById("view-pairing");
  var pairingRoot = document.getElementById("pairing-root");
  var surpriseBtn = document.getElementById("surprise");
  var about = document.getElementById("about");

  var required = ["id", "name", "wine", "place", "food", "why", "service", "budgetWine", "budgetPlace", "budget"];
  var byId = new Map();

  data.chains.forEach(function (chain) {
    if (!chain || !chain.id || !Array.isArray(chain.items)) return;
    chain.items = chain.items.filter(function (item) {
      return item && required.every(function (key) {
        return typeof item[key] === "string" && item[key].trim();
      });
    });
    byId.set(chain.id, chain);
  });

  var menu = (data.menu || []).map(function (entry) {
    var chain = byId.get(entry.chain);
    if (!chain) return null;
    var item = null;
    for (var i = 0; i < chain.items.length; i++) {
      if (chain.items[i].id === entry.id) item = chain.items[i];
    }
    if (!item) return null;
    return { chain: chain, item: item, image: entry.image || "" };
  }).filter(Boolean);

  var filterId = "all";

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function hrefFor(chain, item) {
    return "#/" + encodeURIComponent(chain.id) + "/" + encodeURIComponent(item.id);
  }

  function parseHash() {
    try {
      var raw = decodeURIComponent((location.hash || "").replace(/^#/, ""));
      var path = raw.replace(/^\/+/, "").replace(/\/+$/, "");
      if (!path || path === "about") return { view: "home", about: path === "about" };
      var parts = path.split("/").filter(Boolean);
      if (parts.length === 1) return { view: "home", chainId: parts[0] };
      return { view: "pairing", chainId: parts[0], itemId: parts[1] };
    } catch (err) {
      return { view: "home" };
    }
  }

  function findInMenu(chainId, itemId) {
    for (var i = 0; i < menu.length; i++) {
      if (menu[i].chain.id === chainId && menu[i].item.id === itemId) return menu[i];
    }
    return null;
  }

  function findPair(chainId, itemId) {
    var listed = findInMenu(chainId, itemId);
    if (listed) return listed;
    var chain = byId.get(chainId);
    if (!chain) return null;
    for (var i = 0; i < chain.items.length; i++) {
      if (chain.items[i].id === itemId) {
        return { chain: chain, item: chain.items[i], image: "" };
      }
    }
    return null;
  }

  function visibleMenu() {
    if (filterId === "all") return menu;
    return menu.filter(function (entry) { return entry.chain.id === filterId; });
  }

  var assetBase = document.documentElement.getAttribute("data-asset-base") || "";

  function asset(path) {
    if (!path) return "";
    if (/^(?:[a-z]+:)?\/\//i.test(path) || path.charAt(0) === "/") return path;
    return cacheBust(assetBase + path);
  }

  function mountPhoto(frame, src, alt, eager) {
    if (!src) return;
    src = asset(src);
    var img = document.createElement("img");
    img.alt = alt;
    img.decoding = "async";
    img.loading = eager ? "eager" : "lazy";
    function ready() {
      if (img.naturalWidth > 0) frame.classList.add("is-ready");
    }
    img.addEventListener("load", ready);
    img.addEventListener("error", function () { img.remove(); });
    img.src = src;
    frame.appendChild(img);
    if (img.complete) ready();
  }

  function photoFrame(entry, eager) {
    var frame = el("div", "shot");
    var fallback = el("div", "shot-fallback");
    fallback.appendChild(el("span", "shot-rule"));
    fallback.appendChild(el("span", "shot-name", entry.item.name));
    frame.appendChild(fallback);
    var alt = entry.item.name + " from " + entry.chain.name;
    mountPhoto(frame, entry.image, alt, eager);
    return frame;
  }

  function renderChips() {
    chips.replaceChildren();
    var houses = [];
    var seen = {};
    menu.forEach(function (entry) {
      if (seen[entry.chain.id]) return;
      seen[entry.chain.id] = true;
      houses.push(entry.chain);
    });

    function addChip(id, label) {
      var btn = el("button", "chip", label);
      btn.type = "button";
      btn.setAttribute("data-filter", id);
      btn.setAttribute("aria-pressed", filterId === id ? "true" : "false");
      chips.appendChild(btn);
    }

    addChip("all", "All");
    houses.forEach(function (chain) { addChip(chain.id, chain.name); });
  }

  function renderGrid() {
    var list = visibleMenu();
    grid.replaceChildren();
    list.forEach(function (entry) {
      var card = el("a", "menu-card");
      card.href = hrefFor(entry.chain, entry.item);
      card.appendChild(photoFrame(entry, false));
      var copy = el("div", "card-copy");
      copy.appendChild(el("h2", "card-name", entry.item.name));
      copy.appendChild(el("p", "card-house", entry.chain.name));
      card.appendChild(copy);
      grid.appendChild(card);
    });
  }

  function sectionLabel(text) {
    return el("h2", "section-label", text);
  }

  function renderPairing(route) {
    var found = findPair(route.chainId, route.itemId);
    pairingRoot.replaceChildren();

    if (!found) {
      var missing = el("article", "detail-copy");
      var backMissing = el("a", "back", "The menu");
      backMissing.href = "#/";
      missing.appendChild(backMissing);
      missing.appendChild(el("h1", "dish-title", "Not on the list"));
      missing.appendChild(el("p", "food", "That pairing is not on this list."));
      pairingRoot.appendChild(missing);
      document.title = "Not on the list — The Service Window";
      return;
    }

    var item = found.item;
    var back = el("a", "back", "The menu");
    back.href = "#/";
    pairingRoot.appendChild(back);

    var layout = el("article", "detail");
    var media = el("div", "detail-media");
    media.appendChild(photoFrame(found, true));
    layout.appendChild(media);

    var copy = el("div", "detail-copy");
    copy.appendChild(el("p", "kicker", found.chain.name));
    var title = el("h1", "dish-title", item.name);
    title.tabIndex = -1;
    copy.appendChild(title);
    copy.appendChild(el("hr", "rule"));
    copy.appendChild(el("p", "food", item.food));

    var recommended = el("section");
    recommended.appendChild(sectionLabel("Recommended"));
    recommended.appendChild(el("p", "wine", item.wine));
    recommended.appendChild(el("p", "place", item.place));
    copy.appendChild(recommended);

    var why = el("section");
    why.appendChild(sectionLabel("Why this pairing"));
    why.appendChild(el("p", "prose", item.why));
    copy.appendChild(why);

    var service = el("section");
    service.appendChild(sectionLabel("Service"));
    service.appendChild(el("p", "prose", item.service));
    copy.appendChild(service);

    var budget = el("section");
    budget.appendChild(sectionLabel("Less expensive"));
    budget.appendChild(el("p", "budget-wine", item.budgetWine));
    budget.appendChild(el("p", "place", item.budgetPlace));
    budget.appendChild(el("p", "prose", item.budget));
    copy.appendChild(budget);

    var actions = el("div", "actions");
    var copyBtn = el("button", "btn", "Copy link");
    copyBtn.type = "button";
    copyBtn.addEventListener("click", function () { copyLink(copyBtn); });
    actions.appendChild(copyBtn);
    copy.appendChild(actions);

    layout.appendChild(copy);
    pairingRoot.appendChild(layout);
    document.title = item.name + " — The Service Window";
  }

  function copyLink(button) {
    var url = location.href;
    var done = function (label) {
      button.textContent = label;
      window.setTimeout(function () { button.textContent = "Copy link"; }, 1600);
    };
    var fallback = function () {
      var field = document.createElement("textarea");
      field.value = url;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
      field.remove();
      done(ok ? "Copied" : "Copy the address");
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(function () { done("Copied"); }).catch(fallback);
    } else {
      fallback();
    }
  }

  function goTo(entry) {
    var next = hrefFor(entry.chain, entry.item);
    if (location.hash === next) {
      render();
      settleScroll();
    } else {
      location.hash = next;
    }
  }

  function surprise() {
    var pool = visibleMenu();
    if (!pool.length) pool = menu;
    if (!pool.length) return;
    var index = Math.floor(Math.random() * pool.length);
    var pick = pool[index];
    if (pool.length > 1 && hrefFor(pick.chain, pick.item) === location.hash) {
      pick = pool[(index + 1) % pool.length];
    }
    goTo(pick);
  }

  function setPressed() {
    var buttons = chips.querySelectorAll(".chip");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-pressed", buttons[i].getAttribute("data-filter") === filterId ? "true" : "false");
    }
  }

  function render() {
    var route = parseHash();
    if (route.view === "pairing") {
      home.hidden = true;
      pairing.hidden = false;
      renderPairing(route);
      return;
    }
    home.hidden = false;
    pairing.hidden = true;
    filterId = route.chainId && byId.get(route.chainId) ? route.chainId : "all";
    setPressed();
    renderGrid();
    document.title = "The Service Window";
  }

  function settleScroll() {
    var route = parseHash();
    if (route.about && about && home.hidden === false) {
      about.scrollIntoView();
      return;
    }
    if (route.view === "pairing") {
      window.scrollTo(0, 0);
      var title = pairingRoot.querySelector(".dish-title");
      if (title) title.focus({ preventScroll: true });
      return;
    }
    window.scrollTo(0, 0);
  }


  chips.addEventListener("click", function (event) {
    var btn = event.target.closest(".chip");
    if (!btn) return;
    var id = btn.getAttribute("data-filter");
    var next = id === "all" ? "#/" : "#/" + encodeURIComponent(id);
    if (location.hash === next || (id === "all" && (location.hash === "" || location.hash === "#"))) {
      filterId = id;
      setPressed();
      renderGrid();
      return;
    }
    location.hash = next;
  });

  surpriseBtn.addEventListener("click", surprise);

  window.addEventListener("hashchange", function () {
    render();
    settleScroll();
  });

  renderChips();
  render();
  settleScroll();
})();
