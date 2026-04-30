const API_KEY = "1bbac84bd296c3d098331a2380fb54f0";

const weatherIcon = document.querySelector(
  ".header-status--weather .header-status__icon",
);
const weatherCity = document.querySelector(
  ".header-status--weather .header-status__label",
);
const weatherMeta = document.querySelector(
  ".header-status--weather .header-status__meta",
);
const weatherTemp = document.querySelector(
  ".header-status--weather .header-status__value",
);

const weatherIcons = {
  Clear: `
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M12 3.75v2.25M12 18v2.25M4.97 4.97l1.59 1.59M17.44 17.44l1.59 1.59M3.75 12h2.25M18 12h2.25M4.97 19.03l1.59-1.59M17.44 6.56l1.59-1.59" />
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M12 8.25a3.75 3.75 0 1 1 0 7.5a3.75 3.75 0 0 1 0-7.5Z" />
  `,

  Clouds: `
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M17.25 18.75H8.25a4.5 4.5 0 1 1 .52-8.97A6 6 0 0 1 20.25 12.75a3 3 0 0 1-3 6Z" />
  `,

  Rain: `
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M17.25 15.75H8.25a4.5 4.5 0 1 1 .52-8.97A6 6 0 0 1 20.25 9.75a3 3 0 0 1-3 6Z" />
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M8.25 18.75l-.75 1.5M12 18.75l-.75 1.5M15.75 18.75l-.75 1.5" />
  `,

  Drizzle: `
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M17.25 15.75H8.25a4.5 4.5 0 1 1 .52-8.97A6 6 0 0 1 20.25 9.75a3 3 0 0 1-3 6Z" />
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M9 18.75v1.5M12 18.75v1.5M15 18.75v1.5" />
  `,

  Thunderstorm: `
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M17.25 15.75H8.25a4.5 4.5 0 1 1 .52-8.97A6 6 0 0 1 20.25 9.75a3 3 0 0 1-3 6Z" />
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M13.5 16.5l-3 4.5h3l-1.5 2.25" />
  `,

  Snow: `
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M17.25 15.75H8.25a4.5 4.5 0 1 1 .52-8.97A6 6 0 0 1 20.25 9.75a3 3 0 0 1-3 6Z" />
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M9 19.5h.01M12 19.5h.01M15 19.5h.01" />
  `,

  Mist: `
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M4.5 8.25h15M3.75 12h16.5M5.25 15.75h13.5" />
  `,
};

function getWeatherIcon(weatherMain) {
  return weatherIcons[weatherMain] ?? weatherIcons.Clear;
}

function renderWeather(data) {
  const city = data.name;
  const temp = Math.round(data.main.temp);
  const weatherMain = data.weather[0].main;
  const weatherDescription = data.weather[0].description;

  weatherCity.innerText = city;
  weatherMeta.innerText = weatherDescription;
  weatherTemp.innerText = `${temp}°C`;

  weatherIcon.innerHTML = getWeatherIcon(weatherMain);
}

function handleGeoSuccess(position) {
  const { latitude, longitude } = position.coords;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      renderWeather(data);
    })
    .catch((error) => {
      console.error("날씨 요청 실패:", error);

      weatherCity.innerText = "Weather";
      weatherMeta.innerText = "Unavailable";
      weatherTemp.innerText = "--°C";
    });
}

function handleGeoError() {
  weatherCity.innerText = "Location";
  weatherMeta.innerText = "Denied";
  weatherTemp.innerText = "--°C";

  alert("위치 정보를 가져올 수 없습니다.");
}

export function getCurrentWeather() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}
