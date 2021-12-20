function fullDate(date) {
  let months = [
    "Jan. ",
    "Feb. ",
    "Mar. ",
    "Apr. ",
    "May. ",
    "Jun. ",
    "Jul. ",
    "Aug. ",
    "Sep. ",
    "Oct. ",
    "Nov. ",
    "Dec. ",
  ];
  let month = months[now.getMonth()];
  let dateNumber = now.getDate();
  let year = now.getFullYear();

  return `${month}${dateNumber}, ${year}`;
}

let currentDate = document.querySelector("#full-date");
let now = new Date();
currentDate.innerHTML = fullDate(now);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let actualDay = document.querySelector("#current-day");
actualDay.innerHTML = `${day}`;

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}˚C`;
  document.querySelector("#max-min-temp").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}˚C / ${Math.round(response.data.main.temp_min)}˚C`;

  document.querySelector("#temperature-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#wind-speed"
  ).innerHTML = `Wind speed: ${response.data.wind.speed}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;

  celsiusTemperature = response.data.main.temp;
  minTemp = response.data.main.temp_min;
  maxTemp = response.data.main.temp_max;
}
function search(city) {
  let units = "metric";
  let apiKey = "38a2b3d9c6d31d5f2f9306c4ecae6d68";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  search(city);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let fahrenheitMaxTemp = (maxTemp * 9) / 5 + 32;
  let fahrenheitMinTemp = (minTemp * 9) / 5 + 32;

  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    fahrenheitTemperature
  )}˚F`;
  document.querySelector("#max-min-temp").innerHTML = `${Math.round(
    fahrenheitMaxTemp
  )}˚F / ${Math.round(fahrenheitMinTemp)}˚F`;
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    celsiusTemperature
  )}˚C`;
  document.querySelector("#max-min-temp").innerHTML = `${Math.round(
    maxTemp
  )}˚C / ${Math.round(minTemp)}˚C`;
}

let celsiusTemperature = null;
let maxTemp = null;
let minTemp = null;

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", displayFahrenheitTemp);

let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", displayCelsiusTemp);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("vancouver");
