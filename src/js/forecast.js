import { qs, getLocalStorage } from "./utils";
import WeatherForecast from "./WeatherForecast";

const goBack = () => (document.location.href = "/");

const data = getLocalStorage("@forecast");
const weatherForecast = new WeatherForecast(data);

weatherForecast.init();

qs("#back-btn").addEventListener("click", goBack);
