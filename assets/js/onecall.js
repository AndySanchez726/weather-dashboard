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

// saved city array
var cityArray = [];
console.log(cityArray)
var savedCityContainerEl = document.querySelector("#saved-container")

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

var formSubmitHandler = function () {
    event.preventDefault();
    var city = cityInput.value
    removeForecast();
    currentConditions(city);
    dailyForecast(city);
    // cityArray.push(city)
    console.log(cityArray)
    saveCity(city);
    // loadCity();
}

// clear recent search (local storage)
$("#clear-history").on("click", function() {
    localStorage.clear();
    var child = savedCityContainerEl.lastElementChild;
    while (child) {
        savedCityContainerEl.removeChild(child);
        child = savedCityContainerEl.lastElementChild
    }
}) 


var saveCity = function (cityEntered) {
    cityArray.push(cityEntered)
    var savedCity = document.createElement("p")
    savedCity.setAttribute("id", cityEntered)
    savedCity.textContent = cityEntered
    savedCityContainerEl.appendChild(savedCity)
    console.log(cityArray)
    localStorage.setItem("city", JSON.stringify(cityArray))

}

var loadCity = function () {
    var cityArray = JSON.parse(localStorage.getItem("city"))
    if (!cityArray) {
        cityArray = []
        console.log("if")
    } 
    else {
        console.log("else")
        for (var i = 0; i < cityArray.length; i++) {
            var savedCity = document.createElement("p")
            savedCity.setAttribute("id", cityArray[i])
            savedCity.textContent = cityArray[i]
            savedCityContainerEl.appendChild(savedCity)
            // cityArray.push(cityStorage[i])
        }
    }
}

var currentConditions = function (cityEntered) {
    // fetch info for entered city
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityEntered + "&units=imperial&appid=7c1bb6d4995897e4344ff7f98ec3a222")
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
                    var cityDate = moment.unix(locationData.current.dt).format("MM/DD/YYYY")
                    console.log(cityDate)
                    cityNameDateEl.textContent = cityName + " " + cityDate
                    cityTempEl.textContent = "Temperature: " + locationData.current.temp + "°F"
                    cityHumidityEl.textContent = "Humidity: " + locationData.current.humidity + "%"
                    cityWindEl.textContent = "Wind Speed: " + locationData.current.wind_speed + " MPH"
                    var uvIndex = locationData.current.uvi
                    cityUVEl.textContent = "UV Index: " + uvIndex
                    if (uvIndex >= 0.00 && uvIndex <= 2.99) {
                        cityUVEl.className = "low rounded"
                    } else if (uvIndex >= 3.00 && uvIndex <= 5.99) {
                        cityUVEl.className = "medium rounded"
                    } else if (uvIndex >= 6.00 && uvIndex <= 7.99) {
                        cityUVEl.className = "high rounded"
                    } else if (uvIndex >= 8.00 && uvIndex <= 10.99) {
                        cityUVEl.className = "very-high rounded"
                    } else if (uvIndex >= 11.00) {
                        cityUVEl.className = "extremely-high rounded"
                    }
                    
                    cityIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + locationData.current.weather[0].icon + "@2x.png")

                })
            })
        // var iconImage = document.createElement("img")
        })
    });

};

var dailyForecast = function (cityEntered) {
    var forecastEl = document.createElement("div")
    forecastEl.className = "row"
    forecastContainerEl.appendChild(forecastEl)
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityEntered + "&units=imperial&appid=7c1bb6d4995897e4344ff7f98ec3a222")
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
                        day.className = "card bg-primary"
                        var forecastDateEl = document.createElement("h4");
                        forecastDateEl.textContent = moment.unix(forecast[i].dt).format("MM/DD/YYYY")
                        var forecastTempEl = document.createElement("p")
                        forecastTempEl.textContent = "Temperature: " + averageTemp([forecast[i].temp.min, forecast[i].temp.max]) + "°F"
                        var forecastHumidityEl = document.createElement("p")
                        forecastHumidityEl.textContent = "Humidity: " + forecast[i].humidity + "%"
                        var forecastIconEl = document.createElement("img")
                        forecastIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + forecast[i].weather[0].icon + "@2x.png")

                        // append elements to div
                        day.appendChild(forecastDateEl)
                        day.appendChild(forecastTempEl)
                        day.appendChild(forecastHumidityEl)
                        day.appendChild(forecastIconEl)
                        forecastEl.appendChild(day)
                    }
                })
            })
        var iconImage = document.createElement("img")
        // iconImage.setAttribute("src", )
        })
    });

}


// click on saved city name load city weather
$("#saved-container").on("click", "p", function () {
    var text = $(this)
        .text()
        .trim();
    console.log(text)
    cityInput.value = text
    formSubmitHandler();
})


loadCity();
cityForm.addEventListener("submit", formSubmitHandler)