const assert = require('assert');
const cli = require('../src/cli');

describe('Tests for C02 Value', () => {
    it('Should return 263.4 kg CO2-equivalent', () => {
        let value = cli.getCo2ValueCausedByVechile(933.973, 282)
        assert.equal(value, 263.4);
    });
    it('Should not return 263.38 kg CO2-equivalent.', () => {
        let value = cli.getCo2ValueCausedByVechile(933.973, 282)
        assert.notEqual(value, 263);
    });
});

describe('Tests for city coordinates of city name', () => {
    it('Should return [77.184029, 28.709498] as coordinates for delhi', () => {
        cli.getCityCoordinates("delhi").then(res => {
            assert.equal(res.toString(), "77.184029,28.709498");

        });

    });
});

describe('Tests for distance in kms between two cities', () => {
    it('Should return 2090.498 distance between delhi and bangalore', () => {
        var startCoordinates = [77.184029, 28.709498];
        var endCoordinates = [77.60625, 12.96557];
        cli.getDistance(startCoordinates, endCoordinates).then(res => {
            assert.equal(res, "2090.498");
        });

    });
});