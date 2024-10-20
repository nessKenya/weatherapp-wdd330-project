import { qs, getLocalStorage } from "./utils";
import WeatherForecast from "./WeatherForecast";

const goBack = () => (document.location.href = "/");

const data = getLocalStorage("@forecast");
console.log(data);
const weatherForecast = new WeatherForecast(data);

weatherForecast.init();

qs("#back-btn").addEventListener("click", goBack);
