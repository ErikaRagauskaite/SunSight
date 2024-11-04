const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const port = 3000;
const weatherAPI = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = process.env.API_KEY;

app.use(express.static("public"));

app.get("/weather", async (req, res) => {
  const location = req.query.q;
  if (!location) {
    return res.status(400).send("Location is required");
  }

  const url = `${weatherAPI}?q=${location}&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
