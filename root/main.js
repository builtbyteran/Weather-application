var API_KEY = CONFIG.API_KEY;
var weather = [];
var forecast = [];

document.querySelector('.search').addEventListener('click', function () {
  var city = document.querySelector('#search-query').value;

  document.querySelector('#search-query').value = '';

  fetchWeatherData(city);
  fetchForecastData(city);
});

var fetchWeatherData = function (city) {
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    '&limit=1&units=imperial&appid=' +
    API_KEY;

  fetch(url, {
    method: 'GET',
    dataType: 'json',
  })
    .then((data) => data.json())
    .then((data) => addCurrentWeather(data));
};

var addCurrentWeather = function (data) {
  weather = [];

  var weatherData = {
    temperature: Math.round(data.main.temp),
    city: data.name,
    weather: data.weather[0].main,
    icon: data.weather[0].icon,
  };

  weather.push(weatherData);

  renderCurrentWeather();
};

var renderCurrentWeather = function () {
  document.querySelector('.weather').replaceChildren();

  for (let i = 0; i < weather.length; i++) {
    const weatherData = weather[i];

    var template = `
      <div class="container-fluid">
        <div class="row" id="render-weather">
          <div class="col">
            <h1>${weatherData.temperature}°</h1>
            <h3>${weatherData.city}</h3>
            <h4>${weatherData.weather}</h4>
          </div>
          <div class="col" id="spacer">
          </div>
          <div class="col">
            <img src="https://openweathermap.org/img/wn/${weatherData.icon}@2x.png" alt="">
          </div>
        </div>
      </div>`;

    document
      .querySelector('.weather')
      .insertAdjacentHTML('beforeend', template);
  }
};

var fetchForecastData = function (city) {
  const url =
    'https://api.openweathermap.org/data/2.5/forecast?q=' +
    city +
    '&limit=1&units=imperial&appid=' +
    API_KEY;

  fetch(url, {
    method: 'GET',
    dataType: 'json',
  })
    .then((data) => data.json())
    .then((data) => addForecast(data));
};

var addForecast = function (data) {
  forecast = [];

  var weekDay = new Intl.DateTimeFormat('en-us', {
    weekday: 'long',
  });

  var dayOne = {
    weather: data.list[0].weather[0].main,
    temperature: Math.round(data.list[0].main.temp),
    icon: data.list[0].weather[0].icon,
    day: weekDay.format(new Date(data.list[0].dt_txt)),
  };

  var dayTwo = {
    weather: data.list[7].weather[0].main,
    temperature: Math.round(data.list[7].main.temp),
    icon: data.list[7].weather[0].icon,
    day: weekDay.format(new Date(data.list[7].dt_txt)),
  };

  var dayThree = {
    weather: data.list[15].weather[0].main,
    temperature: Math.round(data.list[15].main.temp),
    icon: data.list[15].weather[0].icon,
    day: weekDay.format(new Date(data.list[15].dt_txt)),
  };

  var dayFour = {
    weather: data.list[23].weather[0].main,
    temperature: Math.round(data.list[23].main.temp),
    icon: data.list[23].weather[0].icon,
    day: weekDay.format(new Date(data.list[23].dt_txt)),
  };

  var dayFive = {
    weather: data.list[31].weather[0].main,
    temperature: Math.round(data.list[31].main.temp),
    icon: data.list[31].weather[0].icon,
    day: weekDay.format(new Date(data.list[31].dt_txt)),
  };

  forecast.push(dayOne);
  forecast.push(dayTwo);
  forecast.push(dayThree);
  forecast.push(dayFour);
  forecast.push(dayFive);

  renderForecast();
};

var renderForecast = function () {
  document.querySelector('.forecast').replaceChildren();

  for (let i = 0; i < forecast.length; i++) {
    const forecastData = forecast[i];

    var template = `
      <div class="col" id="render-forecast">
        <h2>${forecastData.weather}</h2>
        <h4>${forecastData.temperature}°</h4>
        <img src="https://openweathermap.org/img/wn/${forecastData.icon}@2x.png" alt="">
        <h4>${forecastData.day}</h4>
      </div>`;

    document
      .querySelector('.forecast')
      .insertAdjacentHTML('beforeend', template);
  }
};

// https://github.com/projectshft/weather-project/pull/228
