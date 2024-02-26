// Najprosciej to tak zrobic:
const search = document.getElementById("search-form");
const cardContainer = document.querySelector(".card-container");

const renderCard = function (data) {
  const html = `
  <div class="card" style="width: 18rem">
          <!-- <img src="" class="card-img-top" alt="..." /> -->
          <div class="card-body">
            <h5 class="card-title">${data}</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
  `;

  cardContainer.insertAdjacentHTML("beforeend", html);
};

const data = search.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const inputValue = formData.get("search");

  async function request() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=fc46e9714ae267890941c2e8d3350790`
    );
    const city = await response.json();
    console.log(city);
  }
  request(inputValue);
  // TUTAJ NIE WIEM CZEMU DATA JEST UNDEFINED :/ Chcialbym zeby to wygladalo tak ze klikam enter po wprowadzeniu i renderuje mi karte w ktorej w tytule beda dane pobrane z API
  console.log(data);
  renderCard(data);
});
