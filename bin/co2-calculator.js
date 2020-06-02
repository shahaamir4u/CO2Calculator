#!/usr/bin/env node
const cli = require("../src/cli")
const arg = require('arg');
const constants = require('../src/constants');


//  prints the help text 
const usage = function () {
    const usageText = `
    co2-calculator will calculate CO2 equivalent consumption for your trip.
  
    usage:
      co2-calculator <options>
  
      options can be:

      --start:                 start city of your trip within double quotes 
      --end:                   end city of your trip within double quotes
      --transportation-method: transportation vehicle of your trip

      Command Example:

      co2-calculator --start "delhi" --end "bangalore" --transportation-method large-petrol-car

      Valid transportation-method can be any of the following:

      small-diesel-car
      small-petrol-car
      small-plugin-hybrid-car
      small-electric-car
      medium-diesel-car
      medium-petrol-car
      medium-plugin-hybrid-car
      medium-electric-car
      large-diesel-car
      large-petrol-car
      large-plugin-hybrid-car
      large-electric-car
      bus
      train
    `

    console.log(usageText)
}

// execute the program with valid parsed arguments
function executeScenario() {
    let options = parseArgumentsIntoOptions(process.argv);
    if (checkforValidArgs(options) && isValidTransportationMode(options)) {
        cli.execute(options)
    }
    else {
        usage();
    }
}

// checks if the transportation-method is valid
function isValidTransportationMode(options) {
    let status = true;
    try {
        let co2Factor = constants[options.transportation]
        if (co2Factor === undefined)
            status = false;
    } catch (error) {
        status = false;
    }
    return status;
}

// checks if the arguments have proper values
function checkforValidArgs(options) {
    let status = true;
    try {
        for (const property in options) {
            if (options[property] == false) {
                status = false;
                break;
            }
        }
    }
    catch (error) {
        status = false;
    }
    return status;
}

// parse the raw arguments  
function parseArgumentsIntoOptions(rawArgs) {
    try {
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
    catch (error) {
        return {
            start: false,
            end: false,
            transportation: false
        }
    }
}

executeScenario();

