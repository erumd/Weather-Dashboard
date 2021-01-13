
// telling html to run after input has been given
$(document).ready(function () {
  $("#search").on("click", function () {
    // get element value with jquery
    var searchValue = $("#searchValue").val();
    $("#searchValue").val("");
    // run logic to get data from API
    // tutor help
    weatherSearch(searchValue);
  });

  $("searchValue").keypress(function (event) {
    // try to use keyCode === 13
    if (event.keyCode === 13) {
      event.preventDefault();
      $("#search").click();
    }
  });

  // tutor
  var cityNames = ["Houston"];

  function createCityButton() {
    cityNames.forEach(function (city) {
      var cityNameBtn = $("<button>").attr("data-type", city);
      cityNameBtn.text(city);
      cityNameBtn.attr("type", "button");
      cityNameBtn.addClass("city");
    });
  }

  function addButton(name) {
    var btn = $("<button>").text(name);
    $(".city-container").append(btn)
  }
  console.log($('[name="add-city-button"]'));

  $('[name="add-city-button"]').on("click", function () {
    // need prevent default for page to load
    event.preventDefault();

    console.log("TEST EVENT LISTENER");
    $('[name="add-city"]').val();
    cityNames.push($('[name="add-city"]').val());
    $(".city-container").empty();
    createCityButton();
  });
  // trying to get buttons to click and show city temp
  $("#cityId").on("click", function () {
    var city = $(this).attr("data-type");
    console.log(city);
    console.log($("#searchValue").val());
  });

  // (param) & arguments. need to create a variable to pass through and use *******
  function weatherSearch(searchValue) {
    var APIKey = "76867f1d9d820e6fd45b355d5a55ddc8";
    console.log(APIKey);

    // Here we are building the URL we need to query the database
    var queryURL ="https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + APIKey;
    console.log(queryURL, "this is with search results");

    //  var city = $('#cityId').attr("data-type");
    //  console.log (city);

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      history.push(searchValue);
      localStorage.setItem("history", JSON.stringify(history));
      addButton(searchValue);
      console.log("This is the weather data: ", response);

      // display city and moment using date.Yay
      $(".city").html(`<h2>${response.name} ( ${moment().format("MMMM DD, YYYY")} ) </h2>`);
      $("#icon0").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
      localStorage.setItem("city", `${response.name}`);
      $(".wind").text(`Wind Speed: ${response.wind.speed} MPH`);
      $(".humidity").text(`Humidity: ${response.main.humidity}%`);

      let temp = `Temperature (k): ${response.main.temp}`;
      temp += `<br />Temperature (F): ${Math.round((response.main.temp - 273.15) * 1.8 + 32)}°F`;
      $(".temp").html(temp);
      // have to add .coord. learned from console
      lat = response.coord.lat;
      lon = response.coord.lon;
      console.log("This is lat and lon from weather function", lat, lon);
      // need to pass argument and parameter
      getUV(lat, lon); //object anonymous error
      // forecast(searchValue); //tutor
      forecast(lat, lon); //iyana's help to call lat bc was undefined to get 5 day forecast.
    });

    // ADDED THIS HERE SO DATES DO NOT DISPLAY automatically
    //  have to enter ($'.class') below for date and city to show up.
    $(".daysForecast1").html(`${moment().add(1, "d").format("MMMM DD, YYYY")}`);
    $(".daysForecast2").html(`${moment().add(2, "d").format("MMMM DD, YYYY")}`);
    $(".daysForecast3").html(`${moment().add(3, "d").format("MMMM DD, YYYY")}`);
    $(".daysForecast4").html(`${moment().add(4, "d").format("MMMM DD, YYYY")}`);
    $(".daysForecast5").html(`${moment().add(5, "d").format("MMMM DD, YYYY")}`);
    // need to close function. do not put another function inside but order matters.
  }

  function getUV(lat, lon) {
    var APIKey = "76867f1d9d820e6fd45b355d5a55ddc8";
    console.log(APIKey);
    var queryUV =
      "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

    console.log(queryUV);
    $.ajax({
      url: queryUV,
      method: "GET",
    }).then(function (response) {
      // add in .value
      var uvIndex = response.value; //
      // trying to empty the UV button
      $(".uvi").html("");
      console.log(response, "This is the UV API response");
      var uviBtn = $("<button/>").text(` Current UV Index: ${uvIndex}`);
      $(".uvi").append(uviBtn);
      // source: W3 schools using jQuery button
      if (uvIndex <= 2) {
        $(".uvi button").css("background-color", "green");
      } else if (uvIndex >= 2 && uvIndex <= 5) {
        $(".uvi button").css("background-color", "yellow");
      } else if (uvIndex >= 6 && uvIndex <= 7) {
        $(".uvi button").css("background-color", "orange");
      } else if (uvIndex >= 8 && uvIndex <= 10) {
        $(".uvi button").css("background-color", "red");
      } else if (uvIndex >= 8) {
        $(".uvi button").css("background-color", "purple");
      }
      console.log(uvIndex);
    });
  }
 
  function forecast(lat, lon) {
    //replaced (lat,lon) with (searchValue) and humidity showed up
    var APIKey = "76867f1d9d820e6fd45b355d5a55ddc8";

    // var part = hourly;
    console.log("Forecast", APIKey);
  
    var oneCallAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=currently,minutely,hourly,alerts&appid=" + APIKey;
    var fiveDayForecast= "http://api.openweathermap.org/data/2.5/uvi?lat=" +lat+ "&lon=" +lon+ "&appid=" +APIKey;
    console.log("This is the var fivDayForecast: ", oneCallAPI);

    $.ajax({
      // url: fiveDayForecast,
      url: oneCallAPI,
      method: "GET",
    }).then(function (response) {

      $("#icon1").attr(
        "src","https://openweathermap.org/img/wn/" + response.daily[0].weather[0].icon + "@2x.png");
      $("#humidity1").text(`Humidity: ${response.daily[0].humidity}%`);
      $("#temp1").text(`Temperature (F): ${Math.round((response.daily[0].temp.day - 273.15) * 1.8 + 32)}°F`);
      console.log(response.daily[0].temp);

      $("#icon2").attr(
        "src","https://openweathermap.org/img/wn/" + response.daily[1].weather[0].icon + "@2x.png");
      $("#humidity2").text(`Humidity: ${response.daily[1].humidity}%`);
      $("#temp2").text(`Temperature (F): ${Math.round((response.daily[1].temp.day - 273.15) * 1.8 + 32)}°F`);

      $("#icon3").attr(
        "src","https://openweathermap.org/img/wn/" + response.daily[2].weather[0].icon +"@2x.png");
      $("#humidity3").text(`Humidity: ${response.daily[2].humidity}%`);
      $("#temp3").text(`Temperature (F): ${Math.round((response.daily[2].temp.day - 273.15) * 1.8 + 32)}°F`);

      $("#icon4").attr(
        "src","https://openweathermap.org/img/wn/" + response.daily[3].weather[0].icon + "@2x.png");
      $("#humidity4").text(`Humidity: ${response.daily[3].humidity}%`);
      $("#temp4").text(`Temperature (F): ${Math.round((response.daily[3].temp.day - 273.15) * 1.8 + 32)}°F`
      );

      $("#icon5").attr(
        "src", "https://openweathermap.org/img/wn/" + response.daily[4].weather[0].icon + "@2x.png");
      $("#humidity5").text(`Humidity: ${response.daily[4].humidity}%`);
      $("#temp5").text(`Temperature (F): ${Math.round((response.daily[4].temp.day - 273.15) * 1.8 + 32)}°F`);

      forecast(searchValue); //calling the forecast function
    });
  }

  var history = JSON.parse(localStorage.getItem("history")) || [];

  for (var i=0; i< history.length; i++) {
    addButton(history[i]);
  }
  weatherSearch(history[history.length -1])
});
