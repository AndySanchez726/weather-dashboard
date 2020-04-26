// fetch city data
// list city data 
var body = document.querySelector("body")
var testWeatherEl = document.querySelector("#test-weather")
var cityForm = document.querySelector("#city-form")
var cityInput = document.querySelector("#city-input")

var formSubmitHandler = function (event) {
    event.preventDefault();
    var city = cityInput.value
    debugger;
    saveCity(city);
    currentConditions(city);
}

var saveCity = function (cityEntered) {
    console.log(cityEntered)
    localStorage.setItem("city", cityEntered)
}

var currentConditions = function (cityEntered) {
    // fetch info for entered city
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + cityEntered + "&units=imperial&appid=7c1bb6d4995897e4344ff7f98ec3a222")
    .then((response) => {
        return response.json()
        .then((data) => {


        var testItemsContainer = document.createElement("ul")
        var testItems = document.createElement("li")

        var cityName = data.name
        var cityTemp = data.main.temp
        var cityDate = data.dt
        var date = moment.unix(cityDate).format("MM/DD/YYYY hh mm ss")
        var cityHumidity = data.main.humidity
        var cityWindSpeed = data.wind.speed
        var cityIcon = data.weather[0].icon
        var iconUrl = ("http://openweathermap.org/img/wn/" + cityIcon + "@2x.png")

        var cityLon = data.coord.lon
        var cityLat = data.coord.lat
        // fetch city uv index using cityLon and cityLat
        fetch("http://api.openweathermap.org/data/2.5/uvi?appid=7c1bb6d4995897e4344ff7f98ec3a222&lat=" + cityLat + "&lon=" + cityLon)
            .then((locationResponse) => {
                return locationResponse.json()
                .then((locationData) => {
                    var cityUVIndex = locationData.value
                    console.log(cityUVIndex)
                })
            })

        var iconImage = document.createElement("img")
        iconImage.setAttribute("src", iconUrl)
        testItems.appendChild(iconImage)
        testItemsContainer.appendChild(testItems)
        testWeatherEl.appendChild(testItemsContainer)
        })
    });

};


cityForm.addEventListener("submit", formSubmitHandler)