const request = require('postman-request');

const getGeoCode = (city, cb) => {
    const geocodingUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(city) + ".json?limit=1&types=place&access_token=pk.eyJ1IjoiYXJ2aW5kMDExMCIsImEiOiJja2NhNDNvYmgxcjh4MzBvMGN3M2xpNHVsIn0.3x6RrNm5gmpJzY0zSZuJXA";
    request({ url: geocodingUrl, json: true }, (error, response, body) => {
        if (error !== null) {
            cb("An unexpected error occurred", undefined);
        } else {
            if (body.features.length === 0) {
                cb("Please enter a valid location", undefined);
            } else {
                cb(undefined, body.features[0].center);
            }
        }
    });
}

module.exports = getGeoCode;