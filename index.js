const fetchWeatherData = async (lat, lon) => {
  const apiKey = "ecc00debac978036810ce560c08027b1";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );
  
  document.getElementById("demo").addEventListener("click", getLocation);


  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    const latitude = position.coords.longitude;
    const longitude = position.coords.latitude;

    alert(`Latitude: ${latitude}\nLongitude: ${longitude}`);
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    const temperatureLowList = document.querySelectorAll(".low-temp");

    const temperatureList = document.querySelectorAll(".temp1");
    const weatherConditions = data.list.map((item) => item.weather[0].main);

    
    displayWeather(weatherConditions);
    
    const currentDayWeather = data.list[0];
    const currentDayWeatherCondition = currentDayWeather.weather[0].main;
    const currentDayTempCelsius = currentDayWeather.main.temp - 275.15;

    document.querySelector(
      ".temp"
    ).innerHTML = `${currentDayTempCelsius.toFixed(2)}`;
    document.querySelector(".country").innerHTML = data.city.name;
    document.querySelector(".hum").innerHTML = currentDayWeather.main.humidity;
    document.querySelector(".pressure").innerHTML =
      currentDayWeather.main.pressure;
    document.querySelector(".wind").innerHTML = currentDayWeather.wind.speed;
    document.querySelector(".visibili").innerHTML =
      currentDayWeather.visibility;
    document.querySelector(".weather-mean").innerHTML =
      currentDayWeatherCondition + " Sky";

    // Display temperature for the following days starting from index 1
    for (
      let i = 1;
      i < data.list.length && i - 1 < temperatureList.length;
      i++
    ) {
      const item = data.list[i];
      const tempCelsius = item.main.temp_max - 273.15;
      temperatureList[i - 1].innerHTML = `${tempCelsius.toFixed(2)}`;
    }
    for (
      let i = 1;
      i < data.list.length && i - 1 < temperatureLowList.length;
      i++
    ) {
      const item = data.list[i];
      const tempCelsius = item.main.temp_min - 273.15;
      temperatureLowList[i - 1].innerHTML = `${tempCelsius.toFixed(2)}`;
    }
  } else {
    console.error("Failed to fetch weather data:", response.status);
  }
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

function displayWeather(weatherConditions) {
  const imageElements = document.querySelectorAll(".weather-image");

  imageElements.forEach((imageElement, index) => {
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

    const weatherCondition = weatherConditions[index];

    const imagePath =
      conditionToImagePath[weatherCondition] || "./pictures/Default.png";
    imageElement.src = imagePath;
  });
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
