const search = document.getElementById("search-form");
const cardContainer = document.querySelector(".card-container");
const historyContainer = document.getElementById("history-s");
const resetHistoryBtn = document.getElementById("reset-history-btn");
const input = document.getElementById("search");

// Obsługa przycisku resetowania historii
resetHistoryBtn.addEventListener("click", function () {
  localStorage.clear();
  historyContainer.innerHTML = "";
  cardContainer.innerHTML = "";
});

// Funkcja renderująca kartę z danymi pogodowymi
const renderCard = function (data) {
  cardContainer.innerHTML = "";
  const html = `
    <div class="card" style="width: 18rem">
      <img src="https://countryflagsapi.netlify.app/flag/${data.sys.country}.svg" class="card-img-top" alt="..." /> 
      <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <p class="card-text">TEMP: ${data.main.temp} st.C</p>
        <p class="card-text">ODCZUWALNA: ${data.main.feels_like} st.C</p>
        <p class="card-text">ZACHMURZENIE: ${data.clouds.all} %</p>
        <a href="https://www.google.pl/maps/place/${data.name}" class="btn btn-primary">Check ${data.name} on Google Maps</a>
      </div>
    </div>
  `;
  cardContainer.insertAdjacentHTML("beforeend", html);
};

// Funkcja renderująca komunikat o błędzie
const renderErr = function (message) {
  cardContainer.innerHTML = "";
  const html = `
    <div class="card" style="width: 18rem">
      <img src="https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_1280.png" class="card-img-top" alt="..." /> 
      <div class="card-body">
        <h5 class="card-title">CITY NOT FOUND 🤷🏼‍♂️</h5>
        <p class="card-text">${message}</p>
      </div>
    </div>
  `;
  cardContainer.insertAdjacentHTML("beforeend", html);
};

// Obsługa zdarzenia przesłania formularza
search.addEventListener("submit", async function (event) {
  try {
    event.preventDefault();
    const formData = new FormData(event.target);
    const inputValue = formData.get("search");

    if (inputValue !== "") {
      async function request() {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=fc46e9714ae267890941c2e8d3350790`
        );
        const city = await response.json();
        return city;
      }

      const data = await request(inputValue);
      renderCard(data);
      addToHistory(inputValue); // Dodanie do historii nawet jeśli wpis generuje błąd
      input.value = "";

      // Wyświetlenie historii po przetworzeniu żądania
      const history = localStorage.getItem("searchHistory");
      if (history) {
        displayHistory(JSON.parse(history));
      }
    }
  } catch (err) {
    console.log("x", err);
    renderErr(err.message);
    input.value = "";
    const history = localStorage.getItem("searchHistory");
    if (history) {
      displayHistory(JSON.parse(history));
    }
  }
});

// Funkcja dodająca wpis do historii wyszukiwań
function addToHistory(inputValue) {
  let history = localStorage.getItem("searchHistory");
  if (!history) {
    history = [];
  } else {
    history = JSON.parse(history);
  }

  history.unshift(inputValue);
  if (history.length > 10) {
    history.pop();
  }

  localStorage.setItem("searchHistory", JSON.stringify(history));
}

// Funkcja wyświetlająca historię wyszukiwań
function displayHistory(history) {
  historyContainer.innerHTML = "";
  history.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.classList = "list-group-item";
    listItem.textContent = item + " 🔎";
    historyContainer.appendChild(listItem);
  });
}

// Wywołanie funkcji displayHistory po załadowaniu strony
window.addEventListener("load", function () {
  if (typeof Storage !== "undefined") {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      displayHistory(JSON.parse(history));
    }
  }
});
