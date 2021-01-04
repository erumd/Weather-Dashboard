//  Add search for city to local storage
// add 5 day forecast
// add icon
// add UV index label
// do css
 
 
 

// telling html to run after input has been given
$(document).ready(function () {
  $('#search').on('click',function () {
    // get element value with jquery
    var searchValue=  $("#searchValue").val()
    $("#searchValue").val('')
    // run logic to get data from API
    // tutor help
    weatherSearch(searchValue);
  })

// $('#searchValue').val((localStorage.getItem('9am')));
// $('body').on('click', function()) {
//   console.log($(this).data('type'));
// };



  // var input = document.getElementById("myInput");
$('searchValue').keypress (function(event) {
  if (event.keyCode === 7) {
   event.preventDefault();
   $("#search").click();
  }
})

//       localStorage.setItem ("city", search) ;
//       // add .geItem for local storage for a particular key. add "city"
//       console.log(localStorage.getItem('city'));
// })


// add save searches in button form. Saturday Office Hours. Only buttons display no city names. ********
var cityName = [ 'Houston'];

function createCityButton(){
  cityName.forEach(function (cityName) {
    var cityNameBtn = $('<button>').attr('data-type', cityName);
    $('.city-container').append(cityNameBtn);
  });
}

      localStorage.setItem ("city", search) ;
      console.log(localStorage.getItem('city'));

var createCityButton;
createCityButton ();
console.log ($('[name="add-city-button"]'));

$('[name="add-city-button"]').on('click', function () {
  console.log('TEST EVENT LISTENER');
  $('[name="add-city"]').val();
  $('.city-container').empty();
  createCityButton();
});

$('body').on('click', '.city', function () {
  console.log($(this).data('type'));
});

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
  // dataType: 'json',
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
    // have to add .coord
    lat= response.coord.lat; 
    lon= response.coord.lon;
    console.log ("This is lat and lon from weather function", lat,lon);
    // need to pass argument and parameter
    getUV(lat,lon); //object anonymous error
})
// need to close function. do not put another function inside but order matters.
}

// UV Index. strange but had to use jQuery to add lat and lon. added + in between the quotation marks.
// lat, lon read but not used. need to pass it to the API
  function getUV (lat,lon) {
    var APIKey = "76867f1d9d820e6fd45b355d5a55ddc8";
    console.log (APIKey);
    var queryUV= "http://api.openweathermap.org/data/2.5/uvi?lat=" +lat+ "&lon=" +lon+ "&appid=" +APIKey;

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
  
    // have to enter ($'.class') below or date and city to show up. Manually added dates
    $('.daysForecast1').html(`${moment().add(1, 'd').format('MMMM DD, YYYY')}`);
    $('.daysForecast2').html(`${moment().add(2, 'd').format('MMMM DD, YYYY')}`);
    $('.daysForecast3').html(`${moment().add(3, 'd').format('MMMM DD, YYYY')}`);
    $('.daysForecast4').html(`${moment().add(4, 'd').format('MMMM DD, YYYY')}`);
    $('.daysForecast5').html(`${moment().add(5, 'd').format('MMMM DD, YYYY')}`);


    $.ajax({
        url: queryURL,
        method: "GET",
       }).then(function (response) {
        //  5 day forecast
          $('.daysForecast').each(function (){


          });
        });







// everything inside document.ready
  });

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

 
// F 5 day forecast, do it individually 
// $("#date1").textContent = moment().utcOffset(utcOffset).add(1, 'd').format('ddd, MMM DD');
// trying original moments date 
// $("#date1").html ($ (moment().add(1, 'd').format('ddd, MMM DD')));

// $("#icon1").attr("src", "http://openweathermap.org/img/wn/"+responseOneCall.daily.weather.icon+"@2x.png")
// $("#temp1").text("Temp: Max: " + Math.round(((responseOneCall.daily[0].temp.max - 273.15)*(9/5))+32) + "°F, Min: " + Math.round(((responseOneCall.daily[0].temp.min - 273.15)*(9/5))+32) + "°F")
// $("#humidity1").text("Humidity: " + responseOneCall.daily.humidity + "%")
// $("#date2").textContent = moment().utcOffset(utcOffset).add(2, 'd').format('ddd, MMM DD')
// $("#icon2").attr("src", "http://openweathermap.org/img/wn/"+responseOneCall.daily[1].weather[0].icon+"@2x.png")
// $("#temp2").text("Temp: Max: " + Math.round(((responseOneCall.daily[1].temp.max - 273.15)*(9/5))+32) + "°F, Min: " + Math.round(((responseOneCall.daily[1].temp.min - 273.15)*(9/5))+32) + "°F")
// $("#humidity2").text("Humidity: " + responseOneCall.daily[1].humidity + "%")

// $.ajax({
//   url: (queryURL),
//   method: `GET`
// })
//   .then(function(response) {
//       let hourIterator = 0;
//       let date = ``;
//       let icon = ``;
//       let tempF = 0;
//       let humidity = 0;
//       let windspeed = 0;
//       let counter = 0;
//       $(`#dayHeaderText1`).text(`Day One`)
//       $(`#dayHeaderText2`).text(`Day Two`)
//       $(`#dayHeaderText3`).text(`Day Three`)
//       $(`#dayHeaderText4`).text(`Day Four`)
//       $(`#dayHeaderText5`).text(`Day Five`)
//       // for (let i = 1; i < 16; i++) {
//       //     for (let j = 1; j < 6; j++) {
//       //         if (j % 2 === 0) {
//       //             $(`#dayCol${j}`).css(`backgroundColor`,`#ff7777`).css(`border`, `solid black 2px`)
//       //         } else {
//       //             $(`#dayCol${j}`).css(`backgroundColor`,`#ff4141`).css(`border`, `solid black 2px`)
//       //         }
//       //     }

//           icon = Object.values(response.list[hourIterator].weather[0])[3];
//           date = response.list[hourIterator].dt_txt;
//           tempF = (Object.values(response.list[hourIterator].main)[0]).toFixed(0);
//           humidity = Object.values(response.list[hourIterator].main)[7];
//           windspeed = Object.values(response.list[hourIterator].wind)[0];
//           $(`#icon${i}`).attr(`src`,`https://openweathermap.org/img/wn/${icon}@2x.png`);
//           $(`#date${i}`).text(`Day: ${date}`);
//           $(`#temp${i}`).text(`Temp: ${tempF}\u00B0F`);
//           $(`#humidity${i}`).text(`Humidity: ${humidity}%`);
//           $(`#windSpeed${i}`).text(`Wind Speed: ${windspeed}mph`);
//           hourIterator += 2
//           counter++
//           if (counter === 3 && hourIterator < 36) {
//               counter = 0
//               hourIterator += 2
//           }
     



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


