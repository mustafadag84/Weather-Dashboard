# Weather-Dashboard
??? functions ???
WHEN I search for a city (form input, maybe some buttons)
THEN I am presented with current and future conditions for that city and that city is added to the search history
(displayCurrentWeather func - ($.ajax) api call and also displays current weather for city and saves the city)
(renderSavedCities func - render all saved city buttons onLoad (when the document is ready - defer), also render the last city)
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index (see activity 5)
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe (use the API doc / google) 
(getUVClass func - process the UV index and return a class - background-color)
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
(display5Day func - ($.ajax) api call for forecasts, render the 5 days with icons for weather conditions)
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
(buttonClickHandler func - (console.log(event.target)) handles click events for the generated city buttons, should render the 5-day forecast and current weather)
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast (see the first functions) (edited) 