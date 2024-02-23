// Najprosciej to tak zrobic:
const search = document.getElementById("search-form");

search.addEventListener("submit", function (event) {
  // blokujemy domyslne zachowanie formularza (bo domyslnie przeladuje strone po kliknieciu w submit)
  event.preventDefault();

  // tworzymy obiekt FormData na podstawie event.target (czyli formularza)
  const formData = new FormData(event.target);
  // pobiernie wartosci z inputa
  const inputValue = formData.get("search");

  console.log(inputValue);
});
