$(document).ready(function() {
  const searchBtn = $("#search-button");
  const apiKey = "d545441e7b292eee65d867c6173e3fd3";

// Function to create a history button for the searched city
function createHistoryBtn(cityFormatted) {
  const historyBtn = $("<button>").text(cityFormatted);
  historyBtn.on("click", function(event) {
    event.preventDefault();
    $("#weather-container").empty();
    getWeatherData(cityFormatted);
  });
  $("#history").append(historyBtn);
}

 // Event handler for the search button click
 $("#search-button").on("click", function(event) {
  event.preventDefault();
  const city = $("#search-input").val().trim();
  const cityFormatted = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  createHistoryBtn(cityFormatted);
  getWeatherData(cityFormatted);
});

// Function to retrieve weather data for the specified city
function getWeatherData(cityFormatted) {
  let geoQueryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityFormatted + "&appid=" + apiKey;

  $.ajax({
    url: geoQueryURL,
    method: "GET"
  }).then(function(response) {
    let latitude = response[0].lat.toFixed(2);
    let longitude = response[0].lon.toFixed(2);
    let weatherQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;