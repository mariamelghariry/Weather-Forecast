// ~=====================================HTML data ======================

// ! Input details

var country = document.querySelector(".country");
var search = document.querySelector(".search");

// ! current temp details

var city = document.querySelector(".city");
var todayForecast = document.querySelector(".today-forecast");
var weatherImg = document.querySelector(".weather-img");
var weatherCondition = document.querySelector(".weather-condition");
var rain = document.querySelector(".rain");
var wind = document.querySelector(".wind-speed");
var windDirection = document.querySelector(".wind-dir");

// ! tomorrow temp details

var tomorrowMaxTemp = document.querySelector(".tomorrow-max-temp");
var tomorrowMinTemp = document.querySelector(".tomorrow-min-temp");
var tomorrowCondition = document.querySelector(".tomorrow-condition");
var tomorrowImg = document.querySelector(".tomorrow-img");

// ! after tomorrow temp details

var aTomorrowMaxTemp = document.querySelector(".atomorrow-max-temp");
var aTomorrowMinTemp = document.querySelector(".atomorrow-min-temp");
var aTomorrowCondition = document.querySelector(".atomorrow-condition");
var aTomorrowImg = document.querySelector(".atomorrow-img");

// ! Date details

var day = document.querySelector(".day");
var month = document.querySelector(".month");
var week = document.querySelector(".week-day");
var dayAfter = document.querySelector(".tomorrow");
var dayAfterAfter = document.querySelector(".after-tomorrow");

// ~======================> Functions ==========>

// ! weather + fetch function

async function weather(a) {
  var response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=e36098a8453b42cf8d624637232812&q=${a}&days=3`
  );
  var data = await response.json();
  console.log(data);
  date();

  // ! City info
  var cityName = data.location.name;
  city.innerHTML = cityName;
  // ! Current tempreture info
  var tempreture = data.current.temp_c;
  todayForecast.innerHTML = tempreture + "°C";
  // ! Current tempreture condition image
  var image = data.current.condition.icon;
  weatherImg.innerHTML = `<img src="${
    "https:" + image
  }" alt="" class="w-50" />`;

  // ! Current tempreture condition status
  var condition = data.current.condition.text;
  weatherCondition.innerHTML = condition;

  // ! Rain chance
  var rainChance = data.forecast.forecastday[0].day.daily_chance_of_rain;
  rain.innerHTML = rainChance + "%";

  // ! Wind speed in km/h
  var windSpeed = data.current.wind_kph;
  wind.innerHTML = `<p>${windSpeed}km/h</p>`;

  // ! Wind direction on compass
  var windDir = data.current.wind_dir;
  windDirection.innerHTML = windDir;

  // &==================Tomorrow forcust =============>

  var tomorrowMaxTempreture = data.forecast.forecastday[1].day.maxtemp_c;
  tomorrowMaxTemp.innerHTML = `<p class ="fs-2">${tomorrowMaxTempreture}°C</p>`;

  var tomorrowMinTempreture = data.forecast.forecastday[1].day.mintemp_c;
  tomorrowMinTemp.innerHTML = `<p class ="fs-4">${tomorrowMinTempreture}°C</p>`;

  var tomorrowCon = data.forecast.forecastday[1].day.condition.text;
  tomorrowCondition.innerHTML = `<p class="text-primary">${tomorrowCon}</p>`;

  var tomorrowImage = data.forecast.forecastday[1].day.condition.icon;
  tomorrowImg.innerHTML = `<img src="${
    "https:" + tomorrowImage
  } " alt="" class="w-25 mx-auto" />`;

  // &===================After tomorrow forcust =========>

  var aTomorrowMaxTempreture = data.forecast.forecastday[2].day.maxtemp_c;
  aTomorrowMaxTemp.innerHTML = `<p class ="fs-2">${aTomorrowMaxTempreture}°C</p>`;

  var aTomorrowMinTempreture = data.forecast.forecastday[2].day.mintemp_c;
  aTomorrowMinTemp.innerHTML = `<p class ="fs-4">${aTomorrowMinTempreture}°C</p>`;

  var aTomorrowCon = data.forecast.forecastday[2].day.condition.text;
  aTomorrowCondition.innerHTML = `<p class="text-primary">${aTomorrowCon}</p>`;

  var aTomorrowImage = data.forecast.forecastday[2].day.condition.icon;
  aTomorrowImg.innerHTML = `<img src="${
    "https:" + aTomorrowImage
  } " alt="" class="w-25 mx-auto" />`;
}

// ! User location Function

async function position() {
  var response = await fetch(`https://ipinfo.io?token=529acd5eab6495`);
  var data = await response.json();
  console.log(data);
  weather(data.city);
}
position();

// ! Sending country name from search input
function displayCountry() {
  countryName = country.value;
  weather(countryName);
}

// ! search button evvenlistener
search.addEventListener("click", displayCountry);

// ! (current + tomorrow + after tomorrow) Date

const days = new Date().getDate();

const monthes = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function date() {
  const d = new Date();

  let m = monthes[d.getMonth()];
  month.innerHTML = m;
  day.innerHTML = days;

  
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const w = new Date();
  let f = weekday[w.getDay()];

  week.innerHTML = f;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  dayAfter.innerHTML = weekday[tomorrow.getDay()];

  const afterTomorrow = new Date(today);
  afterTomorrow.setDate(today.getDate() + 2);
  dayAfterAfter.innerHTML = weekday[afterTomorrow.getDay()];
  
}
