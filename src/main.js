import ApiService from "./js/ApiService";
import { closeAlert, filterWeatherData, qs, setLocalStorage } from "./js/utils";

// render the main page.
document.querySelector("#app").innerHTML = `
      <div id="search-box" class="text-center">
        <img src="/cloudy.ico" alt="logo" height=100 width=100 />
        <h1 class="text-center">Get the weather forecast.</h1>
        <input id="location-search" type="text" placeholder="type city name">
        <button id="city-btn">Get weather</button>
        <p>or</p> 
        <button id="location-btn">Use My Current Location</button>
      </div>
`;

// add listener to 'use current' location button.
const locationBtn = qs("#location-btn");

locationBtn.addEventListener("click", async () => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    // request weather forecast.
    try {
      const apiService = new ApiService();
      const forecast = await apiService.getWeatherForecastCoords(lat, lon);
      const updatedList = filterWeatherData(forecast.list);

      setLocalStorage("@forecast", { ...forecast, list: updatedList });

      window.location.href = "/forecast/index.html";
    } catch (e) {
      let alert = qs("#alert");
      let text = document.createElement("p");
      let button = document.createElement("button");

      text.innerText =
        e.message.message || "Worry not, something went terribly wrong.";

      button.innerText = "close";
      button.onclick = () => {
        alert.innerHTML = "";
        alert.style.display = "none";
      };

      alert.appendChild(text);
      alert.appendChild(button);

      alert.style.display = "block";
    }
  });
});

// add listener to 'search by city' button.
const cityBtn = qs("#city-btn");

cityBtn.addEventListener("click", async () => {
  try {
    const apiService = new ApiService();

    const city = qs("#location-search").value;

    const forecast = await apiService.getWeatherForecastCity(city);

    const updatedList = filterWeatherData(forecast.list);

    setLocalStorage("@forecast", { ...forecast, list: updatedList });

    window.location.href = "/forecast/index.html";
  } catch (e) {
    let alert = qs("#alert");
    let text = document.createElement("p");
    let button = document.createElement("button");

    text.innerText =
      e.message.message || "Worry not, something went terribly wrong.";

    button.innerText = "close";
    button.onclick = () => {
      alert.innerHTML = "";
      alert.style.display = "none";
    };

    alert.appendChild(text);
    alert.appendChild(button);

    alert.style.display = "block";
  }
});
