let locationTimezone = document.querySelector('.location__timezone');
let temperatureDegree = document.querySelector('.temperature__degree');
let temperatureHigh = document.querySelector('.temperature__high');
let temperatureLow = document.querySelector('.temperature__low');
let temperatureDescription = document.querySelector('.temperature__description');

window.addEventListener("load", function() {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;


            const weatherApi = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=f4720201c2278140c295b9bb0420dc51`;

            axios.get(`${weatherApi}`)
                .then((data) => {
                    console.log(data);
                    locationTimezone.innerHTML = data.data.name;
                    temperatureDegree.innerHTML = `${data.data.main.temp} °C`;
                    temperatureHigh.innerHTML = `${data.data.main.temp_max} °C/`;
                    temperatureLow.innerHTML = `${data.data.main.temp_min} °C`;
                    temperatureDescription.innerHTML = data.data.weather[0].description;
                })
        })
    }
});

const searchbox = document.querySelector('.searchBox');
searchbox.addEventListener('keypress', pressKey);

function pressKey() {
    if (event.key === 'Enter') {
        getSearchResult(searchbox.value);
        //console.log(searchbox.value)
    }
}

function getSearchResult(cityName) {
    const weatherByCityApi = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=f4720201c2278140c295b9bb0420dc51`;
    axios.get(`${weatherByCityApi}`)
        .then((response) => {
            displayWeather(response);
        })
        .catch((err) => {
            window.alert("Error");
        });
}

function displayWeather(weather) {
    //console.log(weather);
    locationTimezone.innerHTML = weather.data.name;
    temperatureDegree.innerHTML = `${weather.data.main.temp} °C`;
    temperatureHigh.innerHTML = `${weather.data.main.temp_max} °C/`;
    temperatureLow.innerHTML = `${weather.data.main.temp_min} °C`;
    temperatureDescription.innerHTML = weather.data.weather[0].description;
}

const covidApi = 'https://api.covid19api.com/summary';
let newConfirmed = document.querySelector('.covid19-card__newConfirmed');
let totalConfirmed = document.querySelector('.covid19-card__TotalConfirmed');
let totalDeaths = document.querySelector('.covid19-card__TotalDeaths');
let newConfirmedCa = document.querySelector('.covid19-card__newConfirmed-ca');
let totalConfirmedCa = document.querySelector('.covid19-card__TotalConfirmed-ca');
let totalDeathsCa = document.querySelector('.covid19-card__TotalDeaths-ca');
let newConfirmedUs = document.querySelector('.covid19-card__newConfirmed-us');
let totalConfirmedUs = document.querySelector('.covid19-card__TotalConfirmed-us');
let totalDeathsUs = document.querySelector('.covid19-card__TotalDeaths-us');
let lastUpdateTime = document.querySelector('.lastUpdateTime');

axios.get(`${covidApi}`)
    .then((response) => {
        console.log(response);
        newConfirmed.innerHTML = `New Confirmed: ${response.data.Global.NewConfirmed}`;
        totalConfirmed.innerHTML = `Total Confirmed: ${response.data.Global.TotalConfirmed}`;
        totalDeaths.innerHTML = `Total Deaths ${response.data.Global.TotalDeaths}`
        newConfirmedCa.innerHTML = `New Confirmed: ${response.data.Countries[39].NewConfirmed}`;
        totalConfirmedCa.innerHTML = `Total Confirmed: ${response.data.Countries[39].TotalConfirmed}`;
        totalDeathsCa.innerHTML = `Total Deaths ${response.data.Countries[39].TotalDeaths}`
        newConfirmedUs.innerHTML = `New Confirmed: ${response.data.Countries[236].NewConfirmed}`;
        totalConfirmedUs.innerHTML = `Total Confirmed: ${response.data.Countries[236].TotalConfirmed}`;
        totalDeathsUs.innerHTML = `Total Deaths ${response.data.Countries[236].TotalDeaths}`;
        lastUpdateTime.innerHTML = `Last Update: ${response.data.Date}`;
    });



const newQuotes = document.querySelector('.newQuotes')
let quotes = []
axios
    .get("https://type.fit/api/quotes")
    .then(function(response) {
        quotes = response.data;
        //console.log(response.data[1]);
        newQuotes.innerHTML = response.data[1].text;
    })
    .catch(function(error) {
        console.log(error);
    });


function genQuotes() {
    var randonQuotes = Math.floor(Math.random() * 50);
    console.log(randonQuotes)
    newQuotes.innerHTML = `${quotes[randonQuotes].text}`;
}