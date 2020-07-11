const request = require('postman-request');

const getWeather = (coordinates, cb) => {
    const lat = coordinates[1];
    const long = coordinates[0];
    const weatherStackUrl = "http://api.weatherstack.com/current?access_key=999d2dc9581d3257e41b9350e10e1848&query=" + encodeURIComponent(lat) + "," + encodeURIComponent(long);
    request({ url: weatherStackUrl, json: true }, (error, response, body) => {
        if (error !== null) {
            cb("An unexpected error occurred", undefined);
        } else {
            if (body.success === false) {
                cb("Location error", undefined);
            } else {
                cb(undefined, body);
            }
        }
    })
}

module.exports = getWeather;