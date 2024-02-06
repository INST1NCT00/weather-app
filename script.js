document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "783909bc65d6cb3117bc5e8eff889071";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    async function getWeatherDataByCoordinates(latitude, longitude) {
        const response = await fetch(`${apiUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
        const data = await response.json();
        displayWeatherData(data,response);
    }

    async function getWeatherDataByCity(city) {
        const response = await fetch(`${apiUrl}q=${city}&appid=${apiKey}`);
        const data = await response.json();
        displayWeatherData(data,response);
    }

    function displayWeatherData(data,response) {
        console.log(data);

        if(response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
        document.querySelector(".wind").innerHTML = data.wind.speed+" Km/h";

        if(data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if(data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if(data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if(data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
        } else if(data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if(data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        }
    }
    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    getWeatherDataByCoordinates(latitude, longitude);
                },
                function (error) {
                    console.error("Error getting user location:", error);
                    // Handle error or prompt the user to manually enter location
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            // Prompt the user to manually enter location
        }
    }

    searchBtn.addEventListener("click", function () {
        const userInput = searchBox.value;
        if (userInput.trim() !== "") {
            getWeatherDataByCity(userInput);
        } else {
            // Handle empty input
        }
    });

    searchBox.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const userInput = searchBox.value;
            if (userInput.trim() !== "") {
                getWeatherDataByCity(userInput);
            } else {
                // Handle empty input
            }
        }
    });

    // Ask for user location on entry
    getUserLocation();
});