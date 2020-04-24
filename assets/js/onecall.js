// One Call API test js


// fetch city data
// list city data 
var body = document.querySelector("body")
var testWeatherEl = document.querySelector("#test-weather")
var cityForm = document.querySelector("#city-form")
var cityInput = document.querySelector("#city-input")

var formSubmitHandler = function (event) {
    event.preventDefault();
    var city = cityInput.value
    currentConditions(city)
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
        var cityLon = data.coord.lon
        var cityLat = data.coord.lat
        console.log(cityName)
        // fetch city uv index using cityLon and cityLat
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=7c1bb6d4995897e4344ff7f98ec3a222")
            .then((locationResponse) => {
                return locationResponse.json()
                .then((locationData) => {
                    var cityTemp = locationData.current.temp
                    console.log(cityTemp)
                })
            })

        var iconImage = document.createElement("img")
        // iconImage.setAttribute("src", )
        testItems.appendChild(iconImage)
        testItemsContainer.appendChild(testItems)
        testWeatherEl.appendChild(testItemsContainer)
        })
    });

};

cityForm.addEventListener("submit", formSubmitHandler)