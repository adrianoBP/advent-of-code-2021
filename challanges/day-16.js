const fs = require('fs');

const run = async () => {

    const binary = fs.readFileSync(`${__dirname}/../inputs/day-16-input.txt`)
        .toLocaleString()
        .split('')
        .map(hexToBinary)
        .join('');

    const version = decode(binary);

    console.log(version);
};

const hexToBinary = (hex) => {
    const binary = parseInt(hex, 16).toString(2)
    return "0000".substring(binary.length) + binary;
};

const binaryToDecimal = (binary) => {
    return parseInt(binary, 2);
};

const decode = (binary) => {

    let index = 0;

    let totalVersion = 0;

    while (index + 6 + 5 < binary.length) {

        const typeId = binaryToDecimal(binary.substring(index + 3, index + 6));
        const currentVersion = binaryToDecimal(binary.substring(index, index + 3));
        totalVersion += currentVersion;

        index += 6;


        if (typeId == 4) {

            const literal = binary.substring(index);
            let { code, currentIndex } = readLiteralPacket(literal);
            index += currentIndex;

        } else {

            const lengthTypeId = binary.substring(index, index + 1);

            if (lengthTypeId == '0') {
                totalVersion += decode(binary.substring(++index + 15));
            } else {
                totalVersion += decode(binary.substring(++index + 11));
            }
            return totalVersion;
        }
    }

    return totalVersion;
};

const readLiteralPacket = (binary) => {

    let code = '';
    let currentIndex = 0
    for (let i = 0; i < binary.length; i += 5) {

        const codeBinary = binary.substring(i, i + 5);

        if (codeBinary.length == 5)
            code += codeBinary.substring(1);

        if (binary.substring(i, i + 1) == '0') {
            currentIndex = i + 5;
            break;
        }
    }

    return { code, currentIndex };
}

run();