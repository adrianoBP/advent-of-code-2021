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

    const gamma = binaryToDecimal(gammaValues.reverse());
    const epsilon = binaryToDecimal(epsilonValues.reverse());

    console.log(gamma * epsilon);

};

const binaryToDecimal = (binaryValues) => {

    let result = 0;
    for (let i = 0; i < binaryValues.length; i++) {
        result += 2 ** i * binaryValues[i];
    }
    return result;
};

run();