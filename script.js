require("dotenv").config();

const weatherAPI = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = process.env.API_KEY; // Your OpenWeatherMap API key

document.getElementById("submit").addEventListener("click", function () {
  const location = document.getElementById("location").value;
  if (!location) {
    alert("Please enter a location");
    return;
  }

  const url = `${weatherAPI}?q=${location}&appid=${apiKey}`;
  console.log("Fetching URL:", url);

  fetch(url)
    .then((response) => {
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("API response data:", data);
      if (data.cod !== 200) {
        throw new Error("Error fetching data: " + data.message);
      }

      /* const visibility = data.visibility / 1000; // Convert visibility from meters to kilometers  */
      let weatherDescription = data.weather[0].description;
      weatherDescription =
        weatherDescription.charAt(0).toUpperCase() +
        weatherDescription.slice(1);

      const timezoneOffset = data.timezone; // Timezone offset in seconds
      const localSunset = new Date(
        (data.sys.sunset + timezoneOffset) * 1000
      ).toLocaleTimeString();
      const localSunrise = new Date(
        (data.sys.sunrise + timezoneOffset) * 1000
      ).toLocaleTimeString();

      document.getElementById("sunset").innerText = `Sunset: ${localSunset}`;
      document.getElementById("sunrise").innerText = `Sunrise: ${localSunrise}`;
      /*document.getElementById(
        "visability"
      ).innerText = `Visibility: ${visibility} km`; */
      document.getElementById(
        "weather"
      ).innerText = `Weather: ${weatherDescription}`;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to fetch data: " + error.message);
    });
});
