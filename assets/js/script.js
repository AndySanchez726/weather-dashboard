// fetch city data
// list city data 
var body = document.querySelector("body")
var testWeatherEl = document.querySelector("#test-weather")

// get data for austin tx
fetch("http://api.openweathermap.org/data/2.5/weather?q=Austin,Texas&units=imperial&appid=7c1bb6d4995897e4344ff7f98ec3a222")
.then((response) => {
    return response.json()
    .then((data) => {
        console.log(data)


    var testItemsContainer = document.createElement("ul")
    var testItems = document.createElement("li")

    var cityName = data.name
    var cityTemp = data.main.temp
    var cityDate = data.dt
    var date = moment.unix(cityDate).format("MM/DD/YYYY hh mm ss")
    console.log(date)
    var cityHumidity = data.main.humidity
    var cityWindSpeed = data.wind.speed
    var cityIcon = data.weather[0].icon
    console.log(cityIcon)
    var iconUrl = ("http://openweathermap.org/img/wn/" + cityIcon + "@2x.png")
    console.log(iconUrl)

    var cityLon = data.coord.lon
    var cityLat = data.coord.lat
    console.log(cityLat)
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