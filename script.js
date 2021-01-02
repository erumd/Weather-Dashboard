//  Add search for city to local storage
// add 5 day forecast
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
    // weatherSearch(searchValue);
  })
});

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

$("#search").on("click", function () {
    // option .key OR .val 
      var search= $("#searchValue").val();
      console.log(search);
// / need to pass on $("#search") through weatherSearch function******************************. one way bridge from line 44 and 58
      weatherSearch (search)
      //localStorage["user"] = user ;
      // added "city" as the key. got rid of  "searchValue"
      localStorage.setItem ("city", search) ;
      // add .geItem for local storage for a particular key. add "city"
      console.log(localStorage.getItem('city'));
})

// (param) & arguments. need to create a variable to pass through and use *******
function weatherSearch (searchValue) {
var APIKey = "76867f1d9d820e6fd45b355d5a55ddc8";
console.log (APIKey);


 // Here we are building the URL we need to query the database
//  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" + APIKey;
 var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + APIKey;
 console.log (queryURL);

 $.ajax({
  url: queryURL,
  method: "GET",
dataType: 'json',
success: function (response) {
  console.log(response);

  // display city 
  $('.city').html(`<h1>${response.name} Weather Details</h1>`);
  $('.wind').text(`Wind Speed: ${response.wind.speed}`);
  $('.humidity').text(`Humidity: ${response.main.humidity}`);
  let temp = `Temperature (k): ${response.main.temp}`;
  temp += `<br />Tempature (F): ${(response.main.temp - 273.15) * 1.80 + 32}`;
  $('.temp').html(temp);

},
});
}


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



