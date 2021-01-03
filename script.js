//  Add search for city to local storage
// add 5 day forecast
// add icon
// add UV index and other important information
// do css
 
 
 
 // This is our API key. Add your own API key between the ""
//  var APIKey = "840c5ef0c60ff8e81310cdc025167953";

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
// trying to get history searches 
// var inputhistory=  $("#searchValue").val()
// $("#inPutHistory").val('')
  // trying to get search button to add to local storage. added the button id . added jQuery for get documentById and event listener for .on (click)
  // $("#search").on("click", function ()
  // $("#search").on("", function ()


  // var input = document.getElementById("myInput");
$('searchValue').keypress (function(event) {
  if (event.keyCode === 7) {
   event.preventDefault();
   $("#search").click();
  }
})

// 2 ONCLICK Events in line 47 and 14. kept line 14
// $("#search").on("click", function () {
//     //  get element value with jquery
//       var search= $("#searchValue").val();
//       $('#searchValue').val('');
//       console.log(search);
// // / need to pass on $("#search") through weatherSearch function******************************. one way bridge from line 44 and 58
//       weatherSearch (search)
//       //localStorage["user"] = user ;
//       // added "city" as the key. got rid of  "searchValue"
//       // $(".input").inputhistory();

//       localStorage.setItem ("city", search) ;
//       // add .geItem for local storage for a particular key. add "city"
//       console.log(localStorage.getItem('city'));
// })

// https://www.jqueryscript.net/ recall history search
// $(".input").inputhistory({
  
//   // an array of predefined values
//   history: [],
//   // prevent form submit
//   preventSubmit:false
//   });

//save history 
// if (searchValue === true) {
//   createRow();
//   $('.searchValue').on('click', (function () {
//     searchFunction($(this).text(), false);
//   }));
// }
// //create Saved Searches buttons
// function createRow() {
//   const row = $('<div>');
//   const cityName = $('<button>').text(citySearch).attr('class', 'searchValue');
//   row.append(cityName);
//   row.appendTo('.history');
// }

// add save searches in button form. Saturday Office Hours. Only buttons display no city names. ********
var cityName = [ 'Houston'];

function createCityButton(){
  cityName.forEach(function (cityName) {
    var cityNameBtn = $('<button>').attr('data-type', cityName);
    $('.city-container').append(cityNameBtn);
  });
}

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
//  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" + APIKey;
 var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + APIKey;
 var fiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&cnt=40&appid=" + APIKey;

 console.log (queryURL);

 $.ajax({
  url: queryURL,
  method: "GET",
  // dataType: 'json',
  }).then(function(response) {
  
  console.log(response);

  // display city and moment using date.Yay
  $('.city').html(`<h2>${response.name} ( ${moment().format('MMMM DD, YYYY')} ) </h2>`);
  $('.wind').text(`Wind Speed: ${response.wind.speed} MPH`);
  $('.humidity').text(`Humidity: ${response.main.humidity}%`);
  // let temp = `Temperature (k): ${response.main.temp}`;
  temp += `<br />Temperature (F): ${Math.round ((response.main.temp - 273.15) * 1.80 + 32)}°F`;
  $('.temp').html(temp);
  // lonQuery = (response.coord.lon);
  // latQuery = (response.coord.lat);
  // uvFunction(lonQuery, latQuery);
  localStorage.setItem('city', `${response.name}`);


 },
// F 5 day forecast
// $("#date1")[0].textContent = moment().utcOffset(utcOffset).add(1, 'd').format('ddd, MMM DD');
// trying original moments date 
// $("#date1")[0].html ($ (moment().add(1, 'd').format('ddd, MMM DD')));

// $("#icon1").attr("src", "http://openweathermap.org/img/wn/"+responseOneCall.daily[0].weather[0].icon+"@2x.png")
// $("#temp1").text("Temp: Max: " + Math.round(((responseOneCall.daily[0].temp.max - 273.15)*(9/5))+32) + "°F, Min: " + Math.round(((responseOneCall.daily[0].temp.min - 273.15)*(9/5))+32) + "°F")
// $("#humidity1").text("Humidity: " + responseOneCall.daily[0].humidity + "%")
// $("#date2")[0].textContent = moment().utcOffset(utcOffset).add(2, 'd').format('ddd, MMM DD')
// $("#icon2").attr("src", "http://openweathermap.org/img/wn/"+responseOneCall.daily[1].weather[0].icon+"@2x.png")
// $("#temp2").text("Temp: Max: " + Math.round(((responseOneCall.daily[1].temp.max - 273.15)*(9/5))+32) + "°F, Min: " + Math.round(((responseOneCall.daily[1].temp.min - 273.15)*(9/5))+32) + "°F")
// $("#humidity2").text("Humidity: " + responseOneCall.daily[1].humidity + "%")


  );
}
  




// closing for $(document).ready()
});

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



