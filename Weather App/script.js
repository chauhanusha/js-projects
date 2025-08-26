const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "df6601ea9e57265f93c364d4e6d2c427";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathicon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {
        var data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = data.main.temp + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

        if (data.weather[0].main == "Clouds") {
            weathicon.src = "images/clouds.png";
        }
        else if (data.weather[0].main == "Rain") {
            weathicon.src = "images/rain.png";
        }
        else if (data.weather[0].main == "Clear") {
            weathicon.src = "images/clear.png";
        }
        else if (data.weather[0].main == "Snow") {
            weathicon.src = "images/snow.png";
        }
        else if (data.weather[0].main == "Mist") {
            weathicon.src = "images/mist.png";
        }
        else if (data.weather[0].main == "Dizzle") {
            weathicon.src = "images/dizzle.png";
        }
    }
    // console.log(data);

}


searchbtn.addEventListener("click", () => {
    checkWeather(searchbox.value);
})


