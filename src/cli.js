const request = require('request');
const constants = require('./constants');
const API_KEY = process.env.ORS_TOKEN;


async function getCityCoordinates(cityName) {
    return new Promise(function (resolve, reject) {
        request({
            method: 'GET',
            url: 'https://api.openrouteservice.org/geocode/search?api_key=' + API_KEY + '&text=' + cityName,
            headers: {
                'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
            }
        }, function (error, response, body) {
            var coord;
            var data = JSON.parse(body);
            if (response.statusCode >= 200 && response.statusCode < 400) {
                if (data.features.length != 0) {
                    coord = data.features[0].geometry.coordinates;
                    return resolve(coord);
                } else
                    return resolve('Location not exist');
            } else {
                console.log('Coordinates not exist');
                return resolve('Location not exist');
            }
        });

    });

}



async function getDistance(startCity, endCity) {
    return new Promise(function (resolve, reject) {
        let startCityCoordinates = startCity;
        let endCityCoordinates = endCity;
        var requestBody = '{"coordinates":[[' + encodeURI(startCityCoordinates) + '],[' + encodeURI(endCityCoordinates) + ']],"units":"km"}';

        request({
            method: 'POST',
            url: 'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
            body: requestBody,
            headers: {
                'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
                'Authorization': API_KEY,
                'Content-Type': 'application/json; charset=utf-8'
            }
        }, function (error, response, body) {
            var data = JSON.parse(body);
            var dist;
            if (response.statusCode >= 200 && response.statusCode < 400) {
                dist = data.features[0].properties.summary.distance;
                return resolve(dist);

            } else {
                console.log(data.error.message);
                return resolve('Location not exist');
            }
        });

    });

}

async function execute(options) {
    console.log('Please wait...');
    let startCoordinates = await getCityCoordinates(options.start);
    let endCoordinates = await getCityCoordinates(options.end);
    let co2Factor = constants[options.transportation];
    
    if (startCoordinates != 'Location not exist' && endCoordinates != 'Location not exist') {
        let distanceKms = await getDistance(startCoordinates, endCoordinates);
        if (distanceKms == 'Location not exist')
            console.log('Use another means of transportation, route not possible.');
        else {
            let co2Value = getCo2ValueCausedByVechile(distanceKms, co2Factor);
            console.log("Your trip caused", co2Value, "kg of CO2-equivalent.");
        }

    } else {
        console.log("The route doesn't exist between start and end cities. Please try with other cities.");
    }
}

function getCo2ValueCausedByVechile(distanceKms, co2Factor) {
    let value = (distanceKms * co2Factor / 1000).toFixed(1);
    return value;
}

module.exports = {
    execute,
    getCo2ValueCausedByVechile,
    getDistance,
    getCityCoordinates
}