(function () {
  var dialog = document.getElementById("lightbox");
  if (!dialog) return;

  var img = document.getElementById("lightbox-img");
  var title = document.getElementById("lightbox-title");
  var bio = document.getElementById("lightbox-bio");
  var active = [];
  var index = 0;
  var opener = null;

  function show(next) {
    if (!active.length) return;
    index = (next + active.length) % active.length;
    var card = active[index];
    var source = card.querySelector("img");
    var plate = card.querySelector(".found-plate, .brass-plate");
    var note = card.querySelector(".found-bio");
    img.src = source.getAttribute("src");
    img.alt = source.alt;
    img.setAttribute("width", source.getAttribute("width") || "1152");
    img.setAttribute("height", source.getAttribute("height") || "864");
    title.textContent = plate.textContent;
    bio.textContent = note.textContent;
  }

  function open(cards, next, from) {
    active = cards;
    opener = from;
    show(next);
    if (!dialog.open) dialog.showModal();
    var close = dialog.querySelector(".lightbox-close");
    if (close) close.focus();
  }

  function bind(selector) {
    var cards = Array.prototype.slice.call(document.querySelectorAll(selector));
    cards.forEach(function (card, i) {
      card.addEventListener("click", function () { open(cards, i, card); });
    });
  }

  bind(".found-grid .found-card");
  bind(".group-card");

  dialog.querySelector(".lightbox-close").addEventListener("click", function () {
    dialog.close();
  });
  dialog.querySelector(".lightbox-prev").addEventListener("click", function () {
    show(index - 1);
  });
  dialog.querySelector(".lightbox-next").addEventListener("click", function () {
    show(index + 1);
  });
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", function () {
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
})();
