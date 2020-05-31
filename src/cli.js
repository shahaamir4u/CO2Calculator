import arg from 'arg';
import validator from 'validator';
var request = require('request');
var constants = require('./constants');
var API_KEY = process.env.ORS_TOKEN;

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--start': String,
            "--end": String,
            "--transportation-method": String
        },
        {
            argv: rawArgs.slice(2),
        }
    );
    return {
        start: args['--start'] || false,
        end: args['--end'] || false,
        transportation: args['--transportation-method'] || false,
    };
}

export async function cli(args) {
    console.log('myArgs: ', args);
    let options = parseArgumentsIntoOptions(args);
    for (const property in options) {

        if (options[property] === false) {
            console.error('no command given!');
            console.log(`${property}: ${options[property]}`);
            process.exit(1);
        }
    }

    console.log(process.env.ORS_TOKEN);
    var startCoordinates = await getCityCoordinates(options.start);
    var endCoordinates = await getCityCoordinates(options.end);
    var co2Factor;

    //constants["small-electric-car"]
    // for (var name in constants) {
    //     if (constants[name] == options.transportation) {
    //         co2Factor= constants[name];
    //     } else{
    //         console.log("Transportation-method isnt't right!");
    //     }
    try {
        var co2Factor = constants[options.transportation]
        if (co2Factor === undefined)
            console.log("Not right transportation mode");

    } catch (error) {
        console.log("Not right transportation mode");
    }


    console.log('Cord1', startCoordinates);
    console.log('Cord2', endCoordinates);
    if (startCoordinates != 'Address not found' && endCoordinates != 'Address not found') {
        var distanceKms = await getDistance(startCoordinates, endCoordinates);
        if (distanceKms == 'Address not found')
            console.log('Use another way of transportation.');
        else
            console.log("Your trip caused", (distanceKms * co2Factor / 1000).toFixed(2), "kg of CO2-equivalent.");

    } else {
        console.log("The route doesn't exist.");
    }

}



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
                    return resolve('Address not found');
            } else {
                console.log('Address not found');
                return resolve('Address not found');
            }
        });

    });

}

async function getDistance(startCity, endCity) {
    return new Promise(function (resolve, reject) {
        var startCityCoordinates = startCity;
        var endCityCoordinates = endCity;
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
            console.log(response.statusCode)
            if (response.statusCode >= 200 && response.statusCode < 400) {
                dist = data.features[0].properties.summary.distance;
                return resolve(dist);

            } else {
                console.log(data.error.message);
                return resolve('Address not found');
            }
        });

    });

}