const e=document.getElementById("search-form"),t=document.querySelector(".card-container"),a=document.getElementById("history-s"),s=document.getElementById("reset-history-btn"),c=document.getElementById("search");s.addEventListener("click",function(){localStorage.clear(),a.innerHTML="",t.innerHTML=""});const n=function(e){t.innerHTML="";let a=`
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
  `;t.insertAdjacentHTML("beforeend",a)},l=function(e){t.innerHTML="";let a=`
  <div class="card" style="width: 18rem">
          <img src="https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_1280.png" class="card-img-top" alt="..." /> 
          <div class="card-body">
            <h5 class="card-title">CITY NOT FOUND \u{1F937}\u{1F3FC}\u{200D}\u{2642}\u{FE0F}</h5>
            <p class="card-text">${e}
            </p>
            
          </div>
        </div>
  `;t.insertAdjacentHTML("beforeend",a)};e.addEventListener("submit",async function(e){try{var t;let l;e.preventDefault();let r=new FormData(e.target).get("search");async function s(){let e=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${r}&units=metric&appid=fc46e9714ae267890941c2e8d3350790`);return await e.json()}""!==r&&((l=(l=localStorage.getItem("searchHistory"))?JSON.parse(l):[]).unshift(r),console.log(l.length),l.length>10&&l.pop(),localStorage.setItem("searchHistory",JSON.stringify(l)),console.log(l),t=l,a.innerHTML="",t.forEach(e=>{let t=document.createElement("li");t.classList="list-group-item",t.textContent=e+" \uD83D\uDD0E",a.appendChild(t)}),c.value="");let o=await s(r);n(o),c.value=""}catch(e){console.log("x",e),l(e.message),c.value=""}});
//# sourceMappingURL=index.ecd0e385.js.map
