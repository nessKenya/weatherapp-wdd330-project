function converToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export const qs = (selector, parent = document) =>
  parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export const generateComment = async (indicator, temperature) => {
  try {
    const weatherComments = await fetch(
      "/weather-json/weather-comments.json",
    ).then(converToJson);
    if (indicator === "Clouds" || indicator === "Clear") {
      if (temperature < 15) {
        return weatherComments["15"];
      } else if (temperature < 20) {
        return weatherComments["20"];
      } else if (temperature < 27) {
        return weatherComments["27"];
      } else {
        return weatherComments["Hot"];
      }
    } else {
      return weatherComments[indicator];
    }
  } catch (e) {
    throw new Error(e);
  }
};

export function getDateDay(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const givenDate = new Date(date);

  return `${givenDate.getDate()}, ${days[givenDate.getDay()]}`;
}

export function getDay(date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[new Date(date).getDay()];
}

export function getIconUrl(code) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  position = "afterBegin",
  clear = false,
  callback,
) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlTemplate = await templateFn(data);

  parentElement.insertAdjacentHTML(position, htmlTemplate);

  if (callback) {
    callback();
  }
}

export function filterWeatherData(weatherData) {
  const firstDayDate = new Date(weatherData[0].dt_txt);
  const lastDayDate = new Date(weatherData[weatherData.length - 1].dt_txt);

  const firstDayData = evaluateDateData(weatherData, firstDayDate);
  const lastDayData = evaluateDateData(weatherData, lastDayDate);
  const restData = weatherData.filter(
    (data) =>
      new Date(data.dt_txt).getDate() !== firstDayDate.getDate() &&
      new Date(data.dt_txt).getDate() !== lastDayDate.getDate() &&
      data.dt_txt.includes("12:00"),
  );
  return [firstDayData, ...restData, lastDayData];
}

function evaluateDateData(weatherData, date) {
  const dateRangeData = weatherData.filter(
    (data) => new Date(data.dt_txt).getDate() === date.getDate(),
  );

  const dateData = dateRangeData.find((data) => data.dt_txt.includes("12:00"));

  if (dateData) {
    return dateData;
  } else {
    return dateRangeData[dateRangeData.length - 1];
  }
}

export function closeAlert() {
  let alert = qs("#alert");
  alert.innerHTML = "";
  alert.style.display = "none";
}

export function getTimeString(timestamp) {
  return new Date(timestamp * 1000).toTimeString().split(" ")[0];
}
