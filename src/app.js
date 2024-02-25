// Najprosciej to tak zrobic:
const search = document.getElementById("search-form");
// const input = document.getElementById("search");

search.addEventListener("submit", function (event) {
  // blokujemy domyslne zachowanie formularza (bo domyslnie przeladuje strone po kliknieciu w submit)
  event.preventDefault();

  // tworzymy obiekt FormData na podstawie event.target (czyli formularza)
  const formData = new FormData(event.target);

  // console.log(formData);
  // pobiernie wartosci z inputa
  const inputValue = formData.get("search");
  // for (const pair of formData.entries()) {
  //   console.log(pair[0], pair[1]);
  // }

  // console.log(inputValue);
  /*
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=fc46e9714ae267890941c2e8d3350790`
  );
  request.send();

  request.addEventListener("load", function () {
    // console.log(this.responseText);
    const data = JSON.parse(this.responseText);
    console.log(data);
    console.log(data.name, " - ", data.main.temp, "st. C");
  });
  */

  async function request() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=fc46e9714ae267890941c2e8d3350790`
    );
    const city = await response.json();
    console.log(city);
  }
  request(inputValue);
});
