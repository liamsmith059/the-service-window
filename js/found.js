(function () {
  var cards = Array.prototype.slice.call(document.querySelectorAll(".found-card"));
  var dialog = document.getElementById("lightbox");
  if (!cards.length || !dialog) return;

  var img = document.getElementById("lightbox-img");
  var title = document.getElementById("lightbox-title");
  var bio = document.getElementById("lightbox-bio");
  var index = 0;
  var opener = null;

  function show(next) {
    index = (next + cards.length) % cards.length;
    var card = cards[index];
    var source = card.querySelector("img");
    var plate = card.querySelector(".found-plate");
    var note = card.querySelector(".found-bio");
    img.src = source.getAttribute("src");
    img.alt = source.alt;
    title.textContent = plate.textContent;
    bio.textContent = note.textContent;
  }

  function open(next, from) {
    opener = from;
    show(next);
    if (!dialog.open) dialog.showModal();
    var close = dialog.querySelector(".lightbox-close");
    if (close) close.focus();
  }

  cards.forEach(function (card, i) {
    card.addEventListener("click", function () { open(i, card); });
  });

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
