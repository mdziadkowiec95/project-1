const e=document.getElementById("search-form"),t=document.querySelector(".card-container"),a=document.getElementById("search"),s=function(e){let a=`
  <div class="card" style="width: 18rem">
          <img src="https://countryflagsapi.netlify.app/flag/${e.sys.country}.svg" class="card-img-top" alt="..." /> 
          <div class="card-body">
            <h5 class="card-title">${e.name}</h5>
            <p class="card-text">TEMP: ${e.main.temp} st.C 
            </p>
            <p class="card-text">ODCZUWALNA: ${e.main.feels_like} st.C 
            </p>
            <p class="card-text">ZACHMURZENIE: ${e.clouds.all} % 
            </p>
            <a href="https://www.google.pl/maps/place/${e.name}" class="btn btn-primary">Check ${e.name} <br> on Google Maps</a>
          </div>
        </div>
  `;t.insertAdjacentHTML("beforeend",a)};e.addEventListener("submit",async function(e){e.preventDefault();let t=new FormData(e.target).get("search");async function c(){let e=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${t}&units=metric&appid=fc46e9714ae267890941c2e8d3350790`),a=await e.json();return console.log(a),a}let n=await c(t);console.log("2",n),s(n),a.classList.add("invisible")});
//# sourceMappingURL=index.d8808076.js.map
