const weatherForm = document.querySelector('form');
const formInput = document.querySelector('input');

const msg1 = document.querySelector('#message-1');
const msg2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    msg1.innerHTML = "Loading...";
    msg2.innerHTML = "";

    const location = formInput.value;
    const url = "/weather?location=" + encodeURIComponent(location);
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.innerHTML = "";
                msg2.innerHTML = data.error;
            } else {
                const actualTemperature = data.current.temperature;
                const feelsLike = data.current.feelslike;
                const humidity = data.current.humidity;
                const description = data.current.weather_descriptions[0];

                const location = data.location.name + ", " + data.location.region + ", " + data.location.country;

                const outputMessage = `The current temperature is ${actualTemperature}°C but it feels like ${feelsLike}°C <br>
                The humidity will be ${humidity}% and we can expect the weather to be ${description} `;

                msg1.innerHTML = location;
                msg2.innerHTML = outputMessage;
            }
        })
    }).catch((err) => {
        console.log(err);
    });

})