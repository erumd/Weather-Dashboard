//  Add search for city to local storage
// add 5 day forecast
// add icon
// add UV index label
// do css
 
 
 

// telling html to run after input has been given
$(document).ready(function () {
  $('#search').on('click',function () {
    // get element value with jquery
    var searchValue = $("#searchValue").val();
    $("#searchValue").val("");
    // run logic to get data from API
    // tutor help
    weatherSearch(searchValue);
  });

    // var input = document.getElementById("myInput");TRYING TO GET ENTER KEY TO WORK
    $("searchValue").keypress(function (event) {
      if (event.keyCode === 7) {
        event.preventDefault();
        $("#search").click();
      }
    });


//       localStorage.setItem ("city", search) ;
//       // add .geItem for local storage for a particular key. add "city"
//       console.log(localStorage.getItem('city'));
// })

// *****************************~~~~~~~~~~~~~~~~~~~~~~~~~~
// add save searches in button form. Saturday Office Hours. Only buttons display no city names. ********
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~UN COMMENT OUT 
// var cityName = [ 'Houston', 'Cypress'];

// // localStorage.setItem ("city", search) ;
// // console.log(localStorage.getItem('city'));

// function createCityButton(){
//   // cityName.forEach(function (cityName) {
//   //   var cityNameBtn = $('<button>').attr('data-type', cityName);
//   //   $('.city-container').append(cityNameBtn);
//   // });
//   $("#buttons-view").empty();

//   for (var i = 0; i < cityName.length; i++) {
//     var a = $("<button>");
//     // a.addClass("city");
//     // a.attr("data-name", cityName[i]);
//     a.text(cityName[i]);
//     $("#buttons-view").append(a);
//     // createCityButton ();
//   }
// }
// // var createCityButton;
// // createCityButton ();
// // console.log ($('[name="add-city-button"]'));
// $('#search').on('click', function () {
//   console.log('TEST EVENT LISTENER');
//   // $('[name="add-city"]').val();
//   // $('#buttons-view').empty();
//   event.preventDefault();
//   var city = $('searchValue').val().trim;
//   cityName.push(city);
//   createCityButton ();
// });
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~UN COMMENT OUT 

// tutor
var cityNames = ["Houston"];
  function createCityButton() {
    $('#city-container').html ("");
    for (var i = 0; i < cityNames.length; i++) {
      var cityNameBtn= $("<button>").attr("data-type", cityNames [i]); 
      cityNameBtn.text(cityNames[i]);
      // adding id attribute on html from java
      cityNameBtn.attr('id', 'cityId');
      $(".city-container").append(cityNameBtn);


    
    }
  }

// trying to do a loop
  // function createCityButton() {
  //   cityNames.forEach(function (cityName) {
  //     var cityNameBtn = $("<button>").attr("data-type", cityNames);
  //     var searchValue= $('#searchValue').val();
  //     $(cityNameBtn).val(searchValue);
  //     $(".city-container").append(cityNameBtn);
  //     // adding input search value to buttons
  //     console.log (searchValue);
  //   });
  // }
  localStorage.setItem("city", search);
  console.log(localStorage.getItem("city"));

  var createCityButton;
  createCityButton();
  console.log($('[name="add-city-button"]'));
  $('[name="add-city-button"]').on("click", function (event) {
      event.preventDefault();
      $('#city-container').html ("");
      // $('#city-container').empty();
    console.log("TEST EVENT LISTENER");
    $('[name="add-city"]').val();
    // need to add the bottom to get value in a button
    cityNames.push($('[name="add-city"]').val());
    $(".city-container").empty();
    createCityButton();
    cityNames.push($('#searchValue').val());
    // searchInput;
    
    var searchInput= $('#searchValue').val();
    createCityButton(searchInput);
    console.log(cityNames);
    
  });


   // trying to get buttons to click and show city temp
$('#cityId').on('click', function ()  {
  var city = $(this).attr('data-type');
  console.log (city);
});
 


$('body').on('click', '.city', function () {
  console.log($(this).data('type'));
});



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~MOnday class Jan 4


// Calling the renderButtons function at least once to display the initial list of movies


// (param) & arguments. need to create a variable to pass through and use *******
function weatherSearch (searchValue) {
var APIKey = "76867f1d9d820e6fd45b355d5a55ddc8";
console.log (APIKey);


 // Here we are building the URL we need to query the database
 var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + APIKey;

 console.log (queryURL);

//  var city = $('#cityId').attr("data-type");
//  console.log (city);




 $.ajax({
  url: queryURL,
  method: "GET",
  }).then(function(response) {
  
  console.log("This is the weather data: ",response);

  // display city and moment using date.Yay
    $('.city').html(`<h2>${response.name} ( ${moment().format('MMMM DD, YYYY')} ) </h2>`);
    localStorage.setItem('city', `${response.name}`);
    $('.wind').text(`Wind Speed: ${response.wind.speed} MPH`);
    $('.humidity').text(`Humidity: ${response.main.humidity}%`);
    let temp = `Temperature (k): ${response.main.temp}`;
    temp += `<br />Temperature (F): ${Math.round ((response.main.temp - 273.15) * 1.80 + 32)}°F`;
    $('.temp').html(temp);
    // have to add .coord. learned from console
    lat= response.coord.lat; 
    lon= response.coord.lon;
    console.log ("This is lat and lon from weather function", lat,lon);
    // need to pass argument and parameter
    getUV(lat,lon); //object anonymous error
    // forecast(searchValue); //tutor
    forecast(lat, lon); //iyana's help to call lat bc was undefined to get 5 day forecast. 

})

// ADDED THIS HERE SO DATES DO NOT DISPLAY automatically
//  have to enter ($'.class') below for date and city to show up. Manually added dates
 $('.daysForecast1').html(`${moment().add(1, 'd').format('MMMM DD, YYYY')}`);
 $('.daysForecast2').html(`${moment().add(2, 'd').format('MMMM DD, YYYY')}`);
 $('.daysForecast3').html(`${moment().add(3, 'd').format('MMMM DD, YYYY')}`);
 $('.daysForecast4').html(`${moment().add(4, 'd').format('MMMM DD, YYYY')}`);
 $('.daysForecast5').html(`${moment().add(5, 'd').format('MMMM DD, YYYY')}`);
// need to close function. do not put another function inside but order matters.
}

// UV Index. strange but had to use jQuery to add lat and lon. added + in between the quotation marks.
// lat, lon read but not used. need to pass it to the API
  function getUV(lat,lon) {
    var APIKey = "76867f1d9d820e6fd45b355d5a55ddc8";
    console.log (APIKey);
    var queryUV= "https://api.openweathermap.org/data/2.5/uvi?lat=" +lat+ "&lon=" +lon+ "&appid=" +APIKey;

    console.log(queryUV);
    $.ajax({
    url: queryUV,
    method: "GET"
    }).then(function (response) {

      // add in .value
      var uvIndex = response.value; //
      // trying to empty the UV button 
      $('.uvi').html(''); 
      console.log (response, "This is the UV API response");
      var uviBtn = $("<button/>").text (` UV: ${uvIndex}`);
      $(".uvi").append(uviBtn);
// source: W3 schools using jQuery button
    if (uvIndex <= 2){
      $(".uvi button").css('background-color', 'green');
    } else if ((uvIndex >= 2) && (uvIndex <= 5)) {
      $(".uvi button").css('background-color', 'yellow');
    } else if ((uvIndex>= 6) && (uvIndex <= 7)){
      $('.uvi button').css('background-color', 'orange');
    } else if ((uvIndex >= 8) && (uvIndex <= 10)) {
      $('.uvi button').css('background-color', 'red');
    } else if (uvIndex >= 8) {
      $('.uvi button').css('background-color', 'purple');
    }
    console.log (uvIndex);
      })
  }
  // TUTOR
    // function weatherSearch (searchValue) {
  //   getUV(lat,lon);
  //   forecast(searchValue);

      function forecast (lat, lon) {  //replaced (lat,lon) with (searchValue) and humidity showed up
      var APIKey = "76867f1d9d820e6fd45b355d5a55ddc8";
      // added lat and lon
      
      // var part = hourly;
      console.log ("Forecast", APIKey);
  //     // API key for 5 days
  //     // var fiveDayForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + APIKey;
  var oneCallAPI= "https://api.openweathermap.org/data/2.5/onecall?lat=" +lat+ "&lon=" +lon+ "&exclude=currently,minutely,hourly,alerts&appid=" + APIKey;
      // var fiveDayForecast= "http://api.openweathermap.org/data/2.5/uvi?lat=" +lat+ "&lon=" +lon+ "&appid=" +APIKey;
      console.log("This is the var fivDayForecast: ",oneCallAPI);

    $.ajax({
        // url: fiveDayForecast,
        url: oneCallAPI, 
        method: "GET",
       }).then(function (response) {
        // $(".fiveDay").each(function () {
          // deleted below to get 5 day forecast
          // lat= response.coord.lat; 
          // lon= response.coord.lon;
          // getUV(lat,lon);
          // TRYING TO ADD 5 day forecast INDIVIDUALLY

          // response.minutely.hourly[24].temp
        $("#icon1").attr("src", "https://openweathermap.org/img/wn/"+response.daily[0].weather[0].icon+"@2x.png");
        $('#humidity1').text(`Humidity: ${response.daily[0].humidity}%`);
        // $('#humidity1').text(`Humidity: ${response.current[0].humidity}%`);
        $('#temp1').text (`Temperature (F): ${Math.round((response.daily[0].temp.day - 273.15) * 1.80 + 32)}°F`);
        console.log (response.daily[0].temp);

        $("#icon2").attr("src", "https://openweathermap.org/img/wn/"+response.daily[1].weather[0].icon+"@2x.png")
        $('#humidity2').text(`Humidity: ${response.daily[1].humidity}%`);
        $('#temp2').text (`Temperature (F): ${Math.round((response.daily[1].temp.day - 273.15) * 1.80 + 32)}°F`);

        $("#icon3").attr("src", "https://openweathermap.org/img/wn/"+response.daily[2].weather[0].icon+"@2x.png");
        $('#humidity3').text(`Humidity: ${response.daily[2].humidity}%`);
        $('#temp3').text (`Temperature (F): ${Math.round ((response.daily[2].temp.day - 273.15) * 1.80 + 32)}°F`);

        $("#icon4").attr("src", "https://openweathermap.org/img/wn/"+response.daily[3].weather[0].icon+"@2x.png");
        $('#humidity4').text(`Humidity: ${response.daily[3].humidity}%`);
        $('#temp4').text (`Temperature (F): ${Math.round ((response.daily[3].temp.day - 273.15) * 1.80 + 32)}°F`);

        $("#icon5").attr("src", "https://openweathermap.org/img/wn/"+response.daily[4].weather[0].icon+"@2x.png");
        $('#humidity5').text(`Humidity: ${response.daily[4].humidity}%`);
        $('#temp5').text (`Temperature (F): ${Math.round ((response.daily[4].temp.day - 273.15) * 1.80 + 32)}°F`);

        forecast(searchValue); //calling the forecast function 


      });

   
      };

    });
