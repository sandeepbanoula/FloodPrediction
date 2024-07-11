//inputs
var avgAnnual = document.getElementById("annualFall");
var avgMonthly = document.getElementById("monthlyFall");
avgAnnual.addEventListener("keyup", floodCheck);
avgMonthly.addEventListener("keyup", floodCheck);

//button
var pBtn = document.getElementById("predictButton");

function floodCheck() {
    if (avgMonthly.value >= 1200) {
        pBtn.setAttribute("data-bs-target", "#predictionWarning");
    } else if (avgAnnual.value >= 3000 && avgMonthly.value >= 600) {
        pBtn.setAttribute("data-bs-target", "#predictionWarning");
    } else {
        pBtn.setAttribute("data-bs-target", "#predictionSuccess")
    }
}
//get location
var cordinates = "30.32,78.03";
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    cordinates = position.coords.latitude + "," + position.coords.longitude;
    getCurrentWeather(cordinates);
}

function showError() {
    cordinates = "30.32,78.03";
    getCurrentWeather(cordinates);
}

//get weather
async function getCurrentWeather(cordinates) {
    const response = await fetch("http://api.weatherapi.com/v1/current.json?key=" + config.apiKey + "&q=" + cordinates + "&aqi=no");
    const weatherData = await response.json();
    if (weatherData) {
        document.getElementById("location").innerHTML += weatherData.location.name + ", " + weatherData.location.region + ", " + weatherData.location.country;
        document.getElementById("condition").innerHTML += weatherData.current.condition.text;
        document.getElementById("temperature").innerHTML += weatherData.current.temp_c + " &deg;C";
        document.getElementById("humidity").innerHTML += weatherData.current.humidity;
        document.getElementById("windspeed").innerHTML += weatherData.current.wind_kph + "KPH";
        document.getElementById("condition_image").setAttribute("src", "https:" + weatherData.current.condition.icon);
    }
    document.getElementById("weatherData").classList.remove("d-none");
}
document.onload = getLocation();