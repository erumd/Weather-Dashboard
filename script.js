//  Add search for city to local storage
// add 5 day forecast
// add UV index and other important information
// do css
 
 
 
 // This is our API key. Add your own API key between the ""
//  var APIKey = "840c5ef0c60ff8e81310cdc025167953";
// My key BUT says invalid 
var APIKey = "76867f1d9d820e6fd45b355d5a55ddc8";
console.log (APIKey);

 // Here we are building the URL we need to query the database
//  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" + APIKey;
 var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=SugarLand&appid=" + APIKey;
 console.log (queryURL);
 

 // We then created an AJAX call
 $.ajax({
   url: queryURL,
   method: "GET"
 }).then(function(response) {

   // Create CODE HERE to Log the queryURL
   // Create CODE HERE to log the resulting object
   console.log(response);
   // Create CODE HERE to calculate the temperature (converted from Kelvin)
   // Create CODE HERE to transfer content to HTML
   $('.city').html(`<h1>${response.name} Weather Details</h1>`);
   $('.wind').text(`Wind Speed: ${response.wind.speed}`);
   $('.humidity').text(`Humidity: ${response.main.humidity}`);
   let temp = `Temperature (k): ${response.main.temp}`;
   temp += `<br />Tempature (F): ${(response.main.temp - 273.15) * 1.80 + 32}`;
   $('.temp').html(temp);
   // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
   // Create CODE HERE to dump the temperature content into HTML

 });