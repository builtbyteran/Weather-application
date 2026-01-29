const { API_KEY } = CONFIG;
let weather = [];
let forecast = [];

document.querySelector('#search-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const input = document.querySelector('#search-query');
  const city = input.value.trim();

  if (!city) {
    return;
  }

  input.value = '';

  fetchWeatherData(city);
  fetchForecastData(city);
});

const fetchWeatherData = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${
    city
  }&limit=1&units=imperial&appid=${API_KEY}`;

  fetch(url, {
    method: 'GET',
    dataType: 'json',
  })
    .then((data) => data.json())
    .then((data) => addCurrentWeather(data));
};

const addCurrentWeather = (data) => {
  weather = [];

  const weatherData = {
    temperature: Math.round(data.main.temp),
    city: data.name,
    weather: data.weather[0].main,
    icon: data.weather[0].icon,
  };

  weather.push(weatherData);

  renderCurrentWeather();
};

const renderCurrentWeather = () => {
  document.querySelector('.weather').replaceChildren();

  for (let i = 0; i < weather.length; i += 1) {
    const weatherData = weather[i];

    const template = `
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

const fetchForecastData = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${
    city
  }&limit=1&units=imperial&appid=${API_KEY}`;

  fetch(url, {
    method: 'GET',
    dataType: 'json',
  })
    .then((data) => data.json())
    .then((data) => addForecast(data));
};

const addForecast = (data) => {
  forecast = [];
  const weekDay = new Intl.DateTimeFormat('en-us', {
    weekday: 'long',
  });
  for (let day = 0; day < 5; day += 1) {
    const index = day * 7;
    const forecastDay = {
      weather: data.list[index].weather[0].main,
      temperature: Math.round(data.list[index].main.temp),
      icon: data.list[index].weather[0].icon,
      day: weekDay.format(new Date(data.list[index].dt_txt)),
    };
    forecast.push(forecastDay);
  }
  renderForecast();
};

const renderForecast = () => {
  document.querySelector('.forecast').replaceChildren();

  for (let i = 0; i < forecast.length; i += 1) {
    const forecastData = forecast[i];

    const template = `
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
