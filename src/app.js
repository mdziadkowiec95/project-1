const search = document.getElementById("search");
search.addEventListener("submit", function (event) {
  event.preventDefault();
  const inputValue = event.target.value;
  console.log(inputValue);
});

/*

Chce zrobic 2 rzeczy banalnie proste ale nie umiem:

1.
---
Prosta opcja zeby wyszukiwana zawartosc wyswietlic w console.log po wcisnieciu enter... :/

2.
---
Dać ten inputfield  na srodek ekranu horyzontalnie i wertykalnie.

Pozdro!
*/
