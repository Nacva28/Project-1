// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const fetchWeatherData = async (lat, lon) => {
  const apiKey = "ecc00debac978036810ce560c08027b1";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );
  //   function celsiusToFahrenheit(temperature) {
  //     return (temperature * 9) / 5 + 32;
  //   }
  //   celsiusToFahrenheit();
  if (response.ok) {
    const data = await response.json();
    console.log(data);

    const weatherCondition = data.list[0].weather[0].main;

    displayWeather(weatherCondition);

    const tempCelsius = data.list[0].main.temp - 275.15;
    document.querySelector(".temp").innerHTML = `${tempCelsius.toFixed(2)}`;
    document.querySelector(".country").innerHTML = data.city.name;
    document.querySelector(".hum").innerHTML = data.list[0].main.humidity;
    document.querySelector(".pressure").innerHTML = data.list[0].main.pressure;
    document.querySelector(".wind").innerHTML = data.list[0].wind.speed;
    document.querySelector(".visibili").innerHTML = data.list[0].visibility;
    document.querySelector(".weather-mean").innerHTML =
      weatherCondition + " Sky";
  } else {
    console.error("Failed to fetch weather data:", response.status);
  }
  const tempCelsius1 = data.list[0].main.temp - 275.15;
document.querySelector(".temp-tom-highest").innerHTML =
  `${tempCelsius1.toFixed(2)}`
};
function getDayOfWeek(date) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()];
}

function updateDayLabels() {
  const today = new Date();
  const daysContainer = document.querySelectorAll(".day-weather");

  daysContainer.forEach((dayContainer, index) => {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + index + 1);

    const dayOfWeek = getDayOfWeek(futureDate);
    const dayOfMonth = futureDate.getDate();
    const month = futureDate.toLocaleString("default", { month: "long" });

    const dayLabel = dayContainer.querySelector("h3");
    dayLabel.textContent = `${dayOfWeek}, ${dayOfMonth} ${month}`;
  });
}

updateDayLabels();

function displayWeather(weatherCondition) {
  const imageElement = document.querySelector(".main-weather-container img");

  const conditionToImagePath = {
    Clear: "./pictures/Clear.png",
    Hail: "./pictures/Hail.png",
    Sleet: "./pictures/Sleet.png",
    HeavyCloud: "./pictures/HeavyCloud.png",
    HeavyRain: "./pictures/HeavyRain.png",
    Clouds: "./pictures/LightCloud.png",
    LightRain: "./pictures/LightRain.png",
    Shower: "./pictures/Shower.png",
    Snow: "./pictures/Snow.png",
    Thunderstorm: "./pictures/Thunderstorm.png",
  };

  const imagePath =
    conditionToImagePath[weatherCondition] || "./pictures/Default.png";
  imageElement.src = imagePath;
}

const x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const long = position.coords.longitude;
      const lat = position.coords.latitude;

      fetchWeatherData(lat, long);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
function displayDateTime() {
  const now = new Date();
  const options = {
    day: "numeric",
    month: "short",
    weekday: "long",
  };
  const dateTimeString = now.toLocaleString("en-US", options);

  document.getElementById("datetime-info").innerHTML = `${dateTimeString}`;
}

displayDateTime();

getLocation();
