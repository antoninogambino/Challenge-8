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

    $.ajax({
      url: weatherQueryURL,
      method: "GET"
    }).then(function(response) {
      let responseData = [];
      for (let i = 0; i < response.list.length; i += 8) {
        let responseDate = moment(response.list[i].dt_txt).format("Do MMMM YYYY");
        let responseTemp = $("<div>").append("Temp: ", ((response.list[i].main.temp - 273.15).toFixed(2) + '&#8451;'));
        let responseIcon = response.list[i].weather[0].icon;
        let responseIconShow = "https://openweathermap.org/img/w/" + responseIcon + ".png";
        let responseHumidity = $("<div>").append("Humidity: ", response.list[i].main.humidity + '%');
        let responseWindSpeed = $("<div>").append("Wind Speed: ", response.list[i].wind.speed + ' meters per second');

        responseData.push({
          date: responseDate,
          temp: responseTemp,
          icon: responseIcon,
          iconShow: responseIconShow,
          humidity: responseHumidity,
          windSpeed: responseWindSpeed
        });
        if (responseData.length > 0) {
          $("#weather-container").empty();
          for (let i = 0; i < responseData.length; i++) {
            let card = $("<div>").addClass("card");
            let cardBody = $("<div>").addClass("card-body");
            let cityName = $("<h5>").addClass("card-title").text(cityFormatted + " (" + responseData[i].date + ")");
            let weatherIcon = $("<img>").attr("src", responseData[i].iconShow).addClass("weather-icon");
            let temp = responseData[i].temp;
            let humidity = responseData[i].humidity;
            let windSpeed = responseData[i].windSpeed;

            cardBody.append(cityName, weatherIcon, temp, humidity, windSpeed);
            card.append(cardBody);
            $("#weather-container").append(card);
          }
        }
      }
    });
  });
}
});