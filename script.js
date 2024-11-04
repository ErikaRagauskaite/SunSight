const weatherAPI = "https://api.open-meteo.com/v1/forecast";

document.getElementById("submit").addEventListener("click", function () {
  const location = document.getElementById("location").value;
  if (!location) {
    alert("Please enter a location");
    return;
  }

  // Geocoding API to get latitude and longitude from location name
  const geocodeAPI = `https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`;

  fetch(geocodeAPI)
    .then((response) => response.json())
    .then((geocodeData) => {
      if (geocodeData.length === 0) {
        throw new Error("Location not found");
      }

      const { lat, lon } = geocodeData[0];
      const url = `${weatherAPI}?latitude=${lat}&longitude=${lon}&daily=sunrise,sunset&hourly=cloud_cover&timezone=auto`;

      console.log("Fetching URL:", url);

      return fetch(url);
    })
    .then((response) => {
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("API response data:", data);
      if (!data.daily || !data.hourly) {
        throw new Error("Error fetching data: Invalid response format");
      }

      const sunrise = new Date(data.daily.sunrise[0]).toLocaleTimeString();
      const sunset = new Date(data.daily.sunset[0]).toLocaleTimeString();
      const cloudCover = data.hourly.cloud_cover[0];

      document.getElementById("sunset").innerText = `Sunset: ${sunset}`;
      document.getElementById("sunrise").innerText = `Sunrise: ${sunrise}`;
      document.getElementById(
        "cloud-cover"
      ).innerText = `Cloud Cover: ${cloudCover}%`;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to fetch data: " + error.message);
    });
});
