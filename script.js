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
var cityName = ["Houston"];
  function createCityButton() {
    cityName.forEach(function (cityName) {
      var cityNameBtn = $("<button>").attr("data-type", cityName);
      $(".city-container").append(cityNameBtn);
    });
  }
  localStorage.setItem("city", search);
  console.log(localStorage.getItem("city"));
  var createCityButton;
  createCityButton();
  console.log($('[name="add-city-button"]'));
  $('[name="add-city-button"]').on("click", function () {
    console.log("TEST EVENT LISTENER");
    $('[name="add-city"]').val();
    $(".city-container").empty();
    createCityButton();
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
    forecast(searchValue); //tutor
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
      console.log (response, "This is the UV API response");
      var uviBtn = $("<button/>").text(uvIndex);
      $(".uvi").append(uviBtn);
// source: W3 schools using jQuery button
    if (uvIndex <= 2){
      $(":button").css('background-color', 'green');
    } else if ((uvIndex >= 2) && (uvIndex <= 5)) {
      $(":button").css('background-color', 'yellow');
    } else if ((uvIndex>= 6) && (uvIndex <= 7)){
      $('.uvi').css('background-color', 'orange');
    } else if ((uvIndex >= 8) && (uvIndex <= 10)) {
      $('.uvi').css('background-color', 'red');
    } else if (uvIndex >= 8) {
      $('.uvi').css('background-color', 'purple');
    }
    console.log (uvIndex);
      })
  }
  // TUTOR
    // function weatherSearch (searchValue) {
  //   getUV(lat,lon);
  //   forecast(searchValue);

      function forecast (searchValue) {
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
          lat= response.coord.lat; 
          lon= response.coord.lon;
          // TRYING TO ADD 5 day forecast INDIVIDUALLY

          // response.minutely.hourly[24].temp
        $("#icon1").attr("src", "https://openweathermap.org/img/wn/"+response.daily[0].weather.icon+"@2x.png")
        $('#humidity1').text(`Humidity: ${response.daily[0].humidity}%`);
        // $('#humidity1').text(`Humidity: ${response.current[0].humidity}%`);
        $('#temp1').text (`<br />Temperature (F): ${Math.round ((response.daily.temp - 273.15) * 1.80 + 32)}°F`);

        $("#icon2").attr("src", "https://openweathermap.org/img/wn/"+response.daily[1].weather[0].icon+"@2x.png")
        $('#humidity2').text(`Humidity: ${response.daily[1].humidity}%`);
        $('#temp2').text (`<br />Temperature (F): ${Math.round ((response.daily[1].temp - 273.15) * 1.80 + 32)}°F`);

        $("#icon3").attr("src", "https://openweathermap.org/img/wn/"+response.daily[2].weather[0].icon+"@2x.png");
        $('#humidity3').text(`Humidity: ${response.daily[2].humidity}%`);
        $('#temp3').text (`<br />Temperature (F): ${Math.round ((response.daily[2].temp - 273.15) * 1.80 + 32)}°F`);

        $("#icon4").attr("src", "https://openweathermap.org/img/wn/"+response.daily[3].weather[0].icon+"@2x.png");
        $('#humidity4').text(`Humidity: ${response.daily[3].humidity}%`);
        $('#temp4').text (`<br />Temperature (F): ${Math.round ((response.daily[3].temp - 273.15) * 1.80 + 32)}°F`);

        $("#icon5").attr("src", "https://openweathermap.org/img/wn/"+response.daily[4].weather[0].icon+"@2x.png");
        $('#humidity5').text(`Humidity: ${response.daily[4].humidity}%`);
        $('#temp5').text (`<br />Temperature (F): ${Math.round ((response.daily[4].temp - 273.15) * 1.80 + 32)}°F`);

        forecast(searchValue); //calling the forecast function 

          
        // });


      });


        //  function fiveDays() {
           
        //  }

 

        //  5 day forecast

          
        
      // }
// everything inside document.ready
  // };
// });

// trying to  do humidity for 5 day forecast 
// $("#forecastOneHumidity").text("Humidity: " + responseOneCall.daily[0].humidity + "%");



  // $("#icon1").attr("src", "http://openweathermap.org/img/wn/"+response.daily.weather.icon+"@2x.png")
  // $("#temp1").text("Temp: Max: " + Math.round(((response.daily[0].temp.max - 273.15)*(9/5))+32) + "°F, Min: " + Math.round(((response.daily[0].temp.min - 273.15)*(9/5))+32) + "°F")
  
  
  
  // let hourIterator = 0;
  // let date = ``;
  // let icon = ``;
  // let tempF = 0;
  // let humidity = 0;
  // let windspeed = 0;
  // let counter = 0;
  // $(`#dayHeaderText1`).text(`Day One`)
  // $(`#dayHeaderText2`).text(`Day Two`)
  // $(`#dayHeaderText3`).text(`Day Three`)
  // $(`#dayHeaderText4`).text(`Day Four`)
  // $(`#dayHeaderText5`).text(`Day Five`)
  // for (let i = 1; i < 16; i++) {
  //     for (let j = 1; j < 6; j++) {
  //         if (j % 2 === 0) {
  //             $(`#dayCol${j}`).css(`backgroundColor`,`#ff7777`).css(`border`, `solid black 2px`)
  //         } else {
  //             $(`#dayCol${j}`).css(`backgroundColor`,`#ff4141`).css(`border`, `solid black 2px`)
  //         }
  //     }

  //     icon = Object.values(response.list[hourIterator].weather[0])[3];
  //     date = response.list[hourIterator].dt_txt;
  //     tempF = (Object.values(response.list[hourIterator].main)[0]).toFixed(0);
  //     humidity = Object.values(response.list[hourIterator].main)[7];
  //     windspeed = Object.values(response.list[hourIterator].wind)[0];
  //     $(`#icon${i}`).attr(`src`,`https://openweathermap.org/img/wn/${icon}@2x.png`);
  //     $(`#date${i}`).text(`Day: ${date}`);
  //     $(`#temp${i}`).text(`Temp: ${tempF}\u00B0F`);
  //     $(`#humidity${i}`).text(`Humidity: ${humidity}%`);
  //     $(`#windSpeed${i}`).text(`Wind Speed: ${windspeed}mph`);
  //     hourIterator += 2
  //     counter++
  //     if (counter === 3 && hourIterator < 36) {
  //         counter = 0
  //         hourIterator += 2
  //     }
  // }


// UV



// 5 DAY FORECAST (NOT ABLE TO DO)




// var position = $(this).attr('id'); 
// var day = (response.list[position].dt_txt); // .dt_txt website
// var iconID = (response.list[position].weather[0].icon); // to find icon go to weather website 
// var weatherIcon = "http://openweathermap.org/img/w/" + iconID + ".png"; // weather icons are located on the openweather website, listed by icon ID inside response
// var weatherIconAlt = response.list[position].weather[0].description + " weather icon"; // weather icon alt tag response
// let temp = `Temperature: ${parseFloat((response.list[position].main.temp - 273.15) * 1.80 + 32).toFixed(2)}°F`; // temperature converted from Kelvin
// $(this).next().attr('src', weatherIcon); // weather icon display
// $(this).next().attr('alt', weatherIconAlt); //img alt definition
// $(this).next().next().text(temp); // Temperature display
// $(this).next().next().next().text(`Humidity: ${response.list[position].main.humidity}%`); // Humidity
//  $.ajax({
//   url: queryURL,
//   method: "GET",
//   // dataType: 'json',
//  }).then(function (response) {
//   //  5 day forecast
//     $('.daysForecast').each(function (){
//       const order = $(this).attr('id');
//       // var day = (response.list[order].dt_txt); //[order].dt (Fields in API response)
//       // var iconID = (response.list[order].weather[0].icon);
//       var weatherIcon = "http://openweathermap.org/img/w/" + iconID + ".png";
//       var weatherIconAlt = (response.list[order].weather[0].description) + " icon";
//       let temp = `Temperature: ${Math.round((response.list[order].main.temp - 273.15) * 1.80 + 32)}°F`;
//       $(this).text(moment(day).format('MMMM DD, YYYY'));
//       $(this).next().attr('src', weatherIcon); 
//       $(this).next().attr('alt', weatherIconAlt);
//       $(this).next().next().text(temp);
//       $(this).next().next().next().text(`Humidity: ${response.list[order].main.humidity}%`);
//     })

// $.ajax({
//   url: (queryURL),
//   method: `GET`
// })
//   




// closing for $(document).ready()


// HARD WORK ***********************************************************************

// trying to save local searches

// var recentSearches = []; // create an empty javascript array

// //this function is called using the search buttons "onclick"
// function searchFunction(data) {
    
//     recentSearches.push($('#searchValue').val()); // This line puts the value from the text box in an array
//     $('#searchValue').val(""); //  clear the text box after search
//     $('#searchHistory').text(""); //clear the seach history window then repopulate with the new array
    
//     // the function below loops through the array and adds each item in the array
//     // to the span element within the Search history arear
//     $.each(recentSearches, function (index, value) {
//         $('#searchHistory').append("<li class='historyItem'  onclick='addtotextbox("+index+")'>" + value + '</li>');
//     });
// }

// function addtotextbox(id)
// {
// $('#searchValue').val(recentSearches[id]);
// }

// GET 5 DAY FORECAST 


 // We then created an AJAX call
//  $.ajax({
//    url: queryURL,
//    method: "GET"
//  }).then(function(response) {

//    // Create CODE HERE to Log the queryURL
//    // Create CODE HERE to log the resulting object
//    console.log(response);
//    // Create CODE HERE to calculate the temperature (converted from Kelvin)
//    // Create CODE HERE to transfer content to HTML
  
//    // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
//    // Create CODE HERE to dump the temperature content into HTML



// ***************************
// ****************************************************************
//



   
      };

    });
