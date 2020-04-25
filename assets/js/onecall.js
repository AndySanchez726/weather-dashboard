// One Call API test js


// fetch city data
// list city data 
var body = document.querySelector("body")
var testWeatherEl = document.querySelector("#test-weather")
var cityForm = document.querySelector("#city-form")
var cityInput = document.querySelector("#city-input")
// Current weather Elements
var cityNameDateEl = document.querySelector("#name-date")
var cityTempEl = document.querySelector("#current-temp")
var cityHumidityEl = document.querySelector("#current-humidity")
var cityWindEl = document.querySelector("#current-wind")
var cityUVEl = document.querySelector("#current-uv")
var cityIconEl = document.querySelector("#current-icon")

// forecast elements
var forecastContainerEl = document.querySelector("#forecast-container")

// function to get avverage of min and max temperature for forecast
var averageTemp = function (average) {
     var sum = average.reduce( (a,b) => a + b)/average.length
     return sum.toFixed([0])
}

var removeForecast = function () {
    var child = forecastContainerEl.lastElementChild;
    while (child) {
        forecastContainerEl.removeChild(child);
        child = forecastContainerEl.lastElementChild;
    }
}

var formSubmitHandler = function (event) {
    event.preventDefault();
    var city = cityInput.value
    removeForecast();
    currentConditions(city);
    dailyForecast(city);
}

var currentConditions = function (cityEntered) {
    // fetch info for entered city
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + cityEntered + "&units=imperial&appid=7c1bb6d4995897e4344ff7f98ec3a222")
    .then((response) => {
        return response.json()
        .then((data) => {

        var cityName = data.name
        var cityLon = data.coord.lon
        var cityLat = data.coord.lat
        // fetch city uv index using cityLon and cityLat
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=7c1bb6d4995897e4344ff7f98ec3a222")
            .then((locationResponse) => {
                return locationResponse.json()
                .then((locationData) => {
                    // current day
                    var cityDate = moment.unix(locationData.current.dt).format("MM/DD/YYYY hh mm ss")
                    console.log(cityDate)
                    cityNameDateEl.textContent = cityName + " " + cityDate
                    cityTempEl.textContent = "Temperature: " + locationData.current.temp + "°F"
                    cityHumidityEl.textContent = "Humidity: " + locationData.current.humidity + "%"
                    cityWindEl.textContent = "Wind Speed: " + locationData.current.wind_speed + " MPH"
                    cityUVEl.textContent = "UV Index: " + locationData.current.uvi
                    cityIconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + locationData.current.weather[0].icon + "@2x.png")

                })
            })
        // var iconImage = document.createElement("img")
        })
    });

};

var dailyForecast = function (cityEntered) {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + cityEntered + "&units=imperial&appid=7c1bb6d4995897e4344ff7f98ec3a222")
    .then((response) => {
        return response.json()
        .then((data) => {

        var cityName = data.name
        var cityLon = data.coord.lon
        var cityLat = data.coord.lat
        // fetch city uv index using cityLon and cityLat
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=7c1bb6d4995897e4344ff7f98ec3a222")
            .then((locationResponse) => {
                return locationResponse.json()
                .then((locationData) => {
                    var forecast = locationData.daily;
                    for (var i = 1; i < 6; i++) {

                        var day = document.createElement("div")
                        day.setAttribute("id", "day" + i)
                        var forecastDateEl = document.createElement("h4");
                        forecastDateEl.textContent = moment.unix(forecast[i].dt).format("MM/DD/YYYY hh mm ss")
                        var forecastTempEl = document.createElement("p")
                        forecastTempEl.textContent = "Temperature: " + averageTemp([forecast[i].temp.min, forecast[i].temp.max]) + "°F"
                        var forecastHumidityEl = document.createElement("p")
                        forecastHumidityEl.textContent = "Humidity: " + forecast[i].humidity + "%"
                        var forecastIconEl = document.createElement("img")
                        forecastIconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + forecast[i].weather[0].icon + "@2x.png")

                        // append elements to div
                        day.appendChild(forecastDateEl)
                        day.appendChild(forecastTempEl)
                        day.appendChild(forecastHumidityEl)
                        day.appendChild(forecastIconEl)
                        forecastContainerEl.appendChild(day)
                    }
                })
            })
        var iconImage = document.createElement("img")
        // iconImage.setAttribute("src", )
        })
    });

}




cityForm.addEventListener("submit", formSubmitHandler)