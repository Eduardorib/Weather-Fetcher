let appId = ''; // your apiId goes here
let units = 'metric';
let searchMethod;



document.getElementById("searchInput")
.addEventListener("keyup", function(event) {
event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("searchBtn").click();
  }
});

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer) {
    console.log(resultFromServer);

    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.getElementById("weatherContainer").style.backgroundImage = 'url("public/clear.jpg")'
            break;

        case 'Clouds':
            document.getElementById("weatherContainer").style.backgroundImage = 'url("public/cloudy.jpg")'  
            break;

        case 'Rain':
        case 'Drizzle':   
        case 'Mist':
            document.getElementById("weatherContainer").style.backgroundImage = 'url("public/rainy.jpg")' 
            break;

        case 'Thunderstorm':
            document.getElementById("weatherContainer").style.backgroundImage = 'url("public/storm.jpg")'
            break;
            
        case 'Snow':
            document.getElementById("weatherContainer").style.backgroundImage = 'url("public/snow.jpg")'
            break;  

        default:
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');

    weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png';
    
    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '°';
    windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%'

    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
    const weaterContainer = document.getElementById('weatherContainer');
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
})