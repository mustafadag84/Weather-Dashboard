// Initial array of cities
var cities = [];

var citiesStored = localStorage.getItem("weather") || [];
//console.log(citiesStored, "citiesStored")

if (citiesStored) {
  cities = JSON.parse(citiesStored)
  renderButtons()
}

var APIKey = "166a433c57516f51dfab1f7edaed8413";
// Function for dumping the JSON content for each button into the div
function displayCityInfo() {
  var city = $(this).attr("data-name");
  // var city  = $("#add-city").val();
  console.log('CITY: '+ city)
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then((response) => {
    console.log("back");
    console.log(response);
    // $("#cities-view").text(JSON.stringify(response));

    // Transfer content to HTML
    $(".city").html("<h1>" + response.name + " Weather Details" + "</h1>");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);

    // Convert the temp to fahrenheit
    var tempF = response.main.temp - 273.15 * 1.80 + 32;
    console.log(tempF, 'tempf')
    // add temp content to html

    $(".tempF").text("Temperature (F) " + tempF.toFixed(2));


    //To get the lat and lon from the response and call the other url to get the 
    var url = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon
    // ajax call to this url and in the response in comming a value this will be uv then show in the screen
    $.ajax({
      url: url,
      method: "GET"
    }).then(function (data) {
      console.log('UVI', data)
      $(".UVIndex").text("UV Index: " + data.value);
    })


    // this is to get 5 days farecast
    //var searchValue =$("#city-input").val();
    var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
    $.ajax({
      url: url,
      method: "GET"
    }).then(function (data) {
      console.log("five day data");
      console.log(data)
      var forecast_div = $("#fiveDayForecast");
      for (var i = 0; i < data.list.length; i += 8) {

        //create a div that will hold a whole day's info
        var day_div = $('<div>');
        day_div.addClass("col-md-4")

        //make the date div
        var date_div = $('<div>')
        date_div.addClass("dt")
        var dt = data.list[i].dt_txt.split(" ");
        // date_div.html(data.list[i].dt_txt);
        date_div.html(dt[0]);
        //append it to the day div
        day_div.append(date_div)

        //created a div for temprature
        var temp_div = $('<div>')
        temp_div.addClass("tempf")
        temp_div.html("Temp: "+data.list[i].main.temp)
        //append to that day.
        day_div.append(temp_div)


        //created a div for humidity
        var humidity_div = $('<div>')
        humidity_div.addClass("humidity")
        humidity_div.html("Humidity:" + data.list[i].main.humidity)
        //append it to the day
        day_div.append(humidity_div)

        console.log(data.list[i].dt_txt)
        console.log(data.list[i].main.temp)
        console.log(data.list[i].main.humidity)
        $("#day_div1").append(day_div);

        //you have the data you need and the forecast_div
        //append to the forecast div, new divs, with the date, temp, and humidity
      }
      //target data.list 
      //  console.log(data.list, "FIVE DAY FORECAST")
      ///  $(".tempF").text(data.list[i].dt)

      //}

      //data.list = [{time: 7:00pm, humidity:, windspeed, etc.},{},{}....]

      //$(".1humidity").text("Humidity: " + response.main.humidity);

      // Convert the temp to fahrenheit
      // var tempF = (response.main.temp - 273.15) * 1.80 + 32;

      // add temp content to html

      //$(".1tempF").text("Temperature (F) " + tempF.toFixed(2));
    })

  })
}

// Function for displaying city data
function renderButtons() {

  // Deleting the buttons prior to adding new cities
  // (this is necessary otherwise we will have repeat buttons)
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
displayCityInfo();



