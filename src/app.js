const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./util/geoCode');
const getWeather = require('./util/getWeather');

const app = express();

const publicPath = path.join(__dirname, "..", "public");
const viewsPath = path.join(__dirname, "..", "templates", "views");
const partialsPath = path.join(__dirname, "..", "templates", "partials");


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: "Weather App",
        pageTitle: "Welcome to the weather application"
    })
});

app.get('/help', (req, res) => {
    res.render("help", {
        title: "Help",
        pageTitle: "Looking for help??"
    });
});

app.get('/about', (req, res) => {
    res.render("about", {
        title: "About Us",
        pageTitle: "About Us"
    })
})

app.get('/weather', (req, res) => {
    const location = req.query.location;
    if (location) {
        geoCode(location, (err, coordinates) => {
            if (err) {
                res.send({
                    "error": err
                });
            } else {
                getWeather(coordinates, (err, weather) => {
                    if (err) {
                        res.send({
                            "error": err
                        });
                    } else {
                        res.send(weather);
                    }
                })
            }
        })
    } else {
        res.send({
            "error": "Please enter a location"
        });
    }
});

app.get('*', (req, res) => {
    res.render("404", {
        title: "Page Not Found",
        pageTitle: "You seem to be lost"
    })
})

app.listen(3000, () => {
    console.log("Server up and running");
});