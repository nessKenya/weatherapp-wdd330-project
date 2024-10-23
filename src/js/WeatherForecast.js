import {
  qs,
  generateComment,
  getDateDay,
  renderWithTemplate,
  getDay,
  getIconUrl,
  getTimeString,
} from "./utils";

function weatherDataTemplate(data) {
  return `
    <h1>${data.city}, <span>${data.country}</span></h1>
    <h4 class='capitalize'>${data.weatherDescription}</h4>
    <div id="weather-info">
        <sup>
          <img src="https://openweathermap.org/img/wn/${data.weatherIcon}.png" alt="weather-icon"/>
        </sup>
        ${data.temp.toFixed(0)}
        <sup>
          <span class="temp-symbol">
            <sup>o</sup>
            <span>C</span>
          </span>
        </sup>
    </div>
    <div>Sunrise: ${getTimeString(data.sunrise)} | Sunset: ${getTimeString(data.sunset)}</div>
  `;
}

function weatherCommentsTemplate(data) {
  return `
    <h3>${getDateDay(data.date)}</h3>
    <img src=${data.commentImage} alt="jacket" class="illustrate-icon">
    <div>
      <h2>${data.comment}</h2>
    </div>
  `;
}

async function showWeatherForecast(forecastData, day) {
  const weatherForecastData = {
    city: forecastData.city.name,
    country: forecastData.city.country,
    weatherDescription: forecastData.list[day].weather[0].description,
    weatherIcon: forecastData.list[day].weather[0].icon,
    temp: forecastData.list[day].main.temp,
    sunrise: forecastData.city.sunrise,
    sunset: forecastData.city.sunset,
  };

  await renderWithTemplate(
    weatherDataTemplate,
    qs("#weather-data"),
    weatherForecastData,
    "afterBegin",
    true,
  );

  const [comment, commentImage] = await generateComment(
    forecastData.list[day].weather[0].main,
    forecastData.list[day].main.temp,
  );

  const weatherCommentsData = {
    date: forecastData.list[day].dt_txt,
    comment,
    commentImage,
  };

  await renderWithTemplate(
    weatherCommentsTemplate,
    qs("#weather-comments"),
    weatherCommentsData,
    "afterBegin",
    true,
  );
}

function createCard(weatherData) {
  return `
      <h4>${getDay(weatherData.date)}</h4>
      <div><img src="${getIconUrl(weatherData.icon)}" height="48"></div>
      <div class="row"><h4>${weatherData.maxTemp}<sup>o</sup>C</h4>|<h6>${weatherData.minTemp}<sup>o</sup>C</h6></div>
  `;
}

function weatherCardsTemplate(weatherData) {
  let cards = "";

  weatherData.forEach((data) => {
    let cardData = {
      date: data.dt_txt,
      icon: data.weather[0].icon,
      minTemp: data.main.temp_min.toFixed(1),
      maxTemp: data.main.temp_max.toFixed(1),
    };

    cards += createCard(cardData);
  });

  return cards;
}

export default class WeatherForecast {
  constructor(forecastData) {
    this.forecastData = forecastData;
  }

  async init() {
    await this.showForecast(0);
    this.showWeatherCards();
  }

  async showForecast(day) {
    await showWeatherForecast(this.forecastData, day);
  }

  async showWeatherCards() {
    this.forecastData.list.forEach((data, index) => {
      let cardData = {
        date: data.dt_txt,
        icon: data.weather[0].icon,
        minTemp: data.main.temp_min.toFixed(1),
        maxTemp: data.main.temp_max.toFixed(1),
      };

      const cardDiv = document.createElement("div");

      cardDiv.innerHTML = createCard(cardData);

      cardDiv.className = "f-card";

      cardDiv.onclick = () => this.showForecast(index);

      qs("#f-section").appendChild(cardDiv);
    });
  }
}
