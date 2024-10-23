const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ApiService {
  async getWeatherForecastCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url).then(convertToJson);
    return response;
  }

  async getWeatherForecastCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url).then(convertToJson);
    return response;
  }
}
