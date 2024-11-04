const fetch = require("node-fetch");
require("dotenv").config();

const weatherAPI = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = process.env.API_KEY;

exports.handler = async function (event, context) {
  const location = event.queryStringParameters.q;
  if (!location) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Location is required" }),
    };
  }

  const url = `${weatherAPI}?q=${location}&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching data" }),
    };
  }
};
