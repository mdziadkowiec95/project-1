"use strict";
// Najprosciej to tak zrobic:
const search = document.getElementById("search-form");
const cardContainer = document.querySelector(".card-container");
const input = document.getElementById("search");

const renderCard = function (data) {
  const html = `
  <div class="card" style="width: 18rem">
          <img src="https://countryflagsapi.netlify.app/flag/${data.sys.country}.svg" class="card-img-top" alt="..." /> 
          <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">TEMP: ${data.main.temp} st.C 
            </p>
            <p class="card-text">ODCZUWALNA: ${data.main.feels_like} st.C 
            </p>
            <p class="card-text">ZACHMURZENIE: ${data.clouds.all} % 
            </p>
            <a href="https://www.google.pl/maps/place/${data.name}" class="btn btn-primary">Check ${data.name} <br> on Google Maps</a>
          </div>
        </div>
  `;

  cardContainer.insertAdjacentHTML("beforeend", html);
  // cardContainer.classList.add("invisible");
};

search.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const inputValue = formData.get("search");

  async function request() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=fc46e9714ae267890941c2e8d3350790`
    );
    const city = await response.json();
    console.log(city);

    return city;
  }

  const data = await request(inputValue);
  console.log("2", data);
  renderCard(data);
  input.classList.add("invisible");
});
