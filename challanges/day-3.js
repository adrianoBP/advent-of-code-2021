const fs = require('fs');

const run = async () => {

    var rows = fs.readFileSync(`${__dirname}/../inputs/day-3-input.txt`)
        .toLocaleString()
        .split('\n');

    let gammaValues = [];

    for (let i = 0; i < rows[0].length; i++) {
        gammaValues.push(
            rows.map(row => row.charAt(i)).filter(bit => bit == '0').length > rows.length / 2 ? 0 : 1,
        );
    }

    let epsilonValues = gammaValues.map(bit => bit == 0 ? 1 : 0);

    // Power consumption
    const gamma = binaryToDecimal(gammaValues.reverse());
    const epsilon = binaryToDecimal(epsilonValues.reverse());
    console.log(gamma * epsilon);

    // Life support rating
    const oxygen = binaryToDecimal(getMostCommonByChar(rows, false).split('').reverse());
    const co2 = binaryToDecimal(getMostCommonByChar(rows, true).split('').reverse());
    console.log(oxygen * co2);
};

const binaryToDecimal = (binaryValues) => {

    let result = 0;
    for (let i = 0; i < binaryValues.length; i++) {
        result += 2 ** i * binaryValues[i];
    }
    return result;
};

const getMostCommonByChar = (rows, useLeast) => {

    if (rows[0].length == 0) return '';
    if (rows.length == 1) return rows[0];

    const numberOfZeroBits = rows.map(row => row.charAt(0))
        .filter(bit => bit == '0').length;

    let currentBit = (numberOfZeroBits <= rows.length / 2) ? (useLeast ? 0 : 1) : (useLeast ? 1 : 0)

    return currentBit + getMostCommonByChar(rows.filter(rows => rows.charAt(0) == currentBit).map(rows => rows.substr(1)), useLeast);
};

run();