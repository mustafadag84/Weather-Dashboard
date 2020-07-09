// Initial array of cities
var cities = [];

var citiesStored = localStorage.getItem("weather")
console.log(citiesStored)
if (citiesStored) {
  cities = JSON.parse(citiesStored)
  renderButtons()
}
var APIKey = "166a433c57516f51dfab1f7edaed8413";
// Function for dumping the JSON content for each button into the div
function displayCityInfo() {

  var city = $(this).attr("data-name");
  // var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log("back")
    console.log(response)
    // $("#cities-view").text(JSON.stringify(response));

    // Transfer content to HTML
    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);

    // Convert the temp to fahrenheit
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;

    // add temp content to html

    $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

    // get the lat and lon from the response and call the other url to get the 
    var url = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon
    // ajax call to this url and in the response in comming a value this will be uv then show in the screen
    $.ajax({
      url: url,
      method: "GET"
    }).then(function (data) {
      console.log(data)
      $(".UVIndex").text("UV Index: " + data.value);
    })

    // this is 
    // var url: "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + appkey + "&units=imperial",


  });
}

// Function for displaying city data
function renderButtons() {

  // Deleting the buttons prior to adding new cities
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();
  console.log(cities)

  // Looping through the array of cities Then dynamically generating buttons for each city in the array and I wanted to limit length of my array for 5 cities
  for (var i = 0; i < 5; i++) {


    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of city to our button
    a.addClass("cities");
    // Adding a data-attribute
    a.attr("data-name", cities[i]);
    // Providing the initial button text
    a.text(cities[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-city").on("click", function (event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var city = $("#city-input").val().trim();

  // Adding the city from the textbox to our array
  cities.push(city);
  localStorage.setItem("weather", JSON.stringify(cities))
  console.log(cities);

  // Calling renderButtons which handles the processing of ourcity array
  renderButtons();
});

// Function for displaying the city info
// Using $(document).on instead of $(".city").on to add event listeners to dynamically generated elements
$(document).on("click", ".cities", displayCityInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();




// // var cities = []
// // This is our API key
// var APIKey = "166a433c57516f51dfab1f7edaed8413";
// // Here we are building the URL we need to query the database
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +"q=Bujumbura,Burundi&appid=" + APIKey;

// // var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

// // Here we run our AJAX call to the OpenWeatherMap API
// $.ajax({
//     url: queryURL,
//     method: "GET"
// })
//     // We store all of the retrieved data inside of an object called "response"
//     .then(function (response) {

//         // // Log the queryURL
//         // console.log(queryURL);

//         // // Log the resulting object
//         // console.log(response);

//         // Transfer content to HTML
//         $(".city").html("<h1>" + response.name + " Weather Details</h1>");
//         $(".wind").text("Wind Speed: " + response.wind.speed);
//         $(".humidity").text("Humidity: " + response.main.humidity);

//         // Convert the temp to fahrenheit
//         var tempF = (response.main.temp - 273.15) * 1.80 + 32;

//         // add temp content to html

//         $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

//         // // Log the data in the console as well
//         // console.log("Wind Speed: " + response.wind.speed);
//         // console.log("Humidity: " + response.main.humidity);
//         // console.log("Temperature (F): " + tempF);
//     });