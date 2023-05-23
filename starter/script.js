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
