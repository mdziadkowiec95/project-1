// "use strict";
// Najprosciej to tak zrobic:
const search = document.getElementById("search-form");
const cardContainer = document.querySelector(".card-container");
const historyContainer = document.getElementById("history-s");
const resetHistoryBtn = document.getElementById("reset-history-btn");
const input = document.getElementById("search");

////// RESET BUTTON////////
resetHistoryBtn.addEventListener("click", function () {
  localStorage.clear();
  historyContainer.innerHTML = "";
  cardContainer.innerHTML = "";
});

const renderCard = function (data) {
  cardContainer.innerHTML = "";
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
const renderErr = function (data) {
  cardContainer.innerHTML = "";
  const html = `
  <div class="card" style="width: 18rem">
          <img src="https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_1280.png" class="card-img-top" alt="..." /> 
          <div class="card-body">
            <h5 class="card-title">CITY NOT FOUND 🤷🏼‍♂️</h5>
            <p class="card-text">${data}
            </p>
            
          </div>
        </div>
  `;

  cardContainer.insertAdjacentHTML("beforeend", html);
  // cardContainer.classList.add("invisible");
};

search.addEventListener("submit", async function (event) {
  try {
    event.preventDefault();
    const formData = new FormData(event.target);

    const inputValue = formData.get("search");

    if (inputValue !== "") {
      addToHistory(inputValue);
      input.value = "";
    }

    function addToHistory(inputValue) {
      let history = localStorage.getItem("searchHistory");
      if (!history) {
        history = [];
      } else {
        history = JSON.parse(history);
      }

      history.unshift(inputValue);
      console.log(history.length);
      // 10 elementow
      if (history.length > 10) {
        history.pop();
      }

      //local storage
      localStorage.setItem("searchHistory", JSON.stringify(history));
      // wyświetlenie historii
      console.log(history);
      displayHistory(history);
    }

    // wysletlanie historii
    function displayHistory(history) {
      historyContainer.innerHTML = "";
      history.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.classList = "list-group-item";
        listItem.textContent = item + " 🔎";
        historyContainer.appendChild(listItem);
      });
    }

    // // Wywołanie funkcji po załadowaniu strony
    // document.addEventListener("DOMContentLoaded", displayHistory());

    // // Wywołanie funkcji po odświeżeniu strony
    // window.addEventListener("load", displayHistory());

    ///////////////////////////////////////////////////////////////////
    async function request() {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=fc46e9714ae267890941c2e8d3350790`
      );
      const city = await response.json();
      // console.log(city);
      return city;

      // const clearThis = await function (target) {
      //   event.target.value = "";
      // };
      // clearThis(this);
    }
    const data = await request(inputValue);
    // console.log("2", data);
    renderCard(data);

    // console.log(inputValue);
    input.value = "";
  } catch (err) {
    console.log("x", err);
    renderErr(err.message);
    input.value = "";
  }

  // input.classList.add("invisible");
});
