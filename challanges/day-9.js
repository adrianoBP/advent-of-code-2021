const fs = require('fs');

const run = async () => {

    const rows = fs.readFileSync(`${__dirname}/../inputs/day-9-input.txt`)
        .toLocaleString()
        .split('\n')
        .map(row => row.split('').map(Number));

    const lowPoints = [];
    for (let y = 0; y < rows.length; y++) {
        for (let x = 0; x < rows[y].length; x++) {
            if (isLowerThanTop(y, x, rows) && isLowerThanLeft(y, x, rows) && isLowerThanRight(y, x, rows) && isLowerThanBottom(y, x, rows)) {
                lowPoints.push(rows[y][x]);
            }
        }
    }

    console.log(lowPoints.map(point => point + 1).reduce((a, b) => a + b));
};

const isLowerThanTop = (y, x, rows) => {

    // If top row, don't check
    if (y === 0) {
        return true;
    }
    return rows[y][x] < rows[y - 1][x];
}

const isLowerThanLeft = (y, x, rows) => {

    // If first column, don't check
    if (x === 0) {
        return true;
    }
    return rows[y][x] < rows[y][x - 1];
}

const isLowerThanRight = (y, x, rows) => {

    // If last column, don't check
    if (x === rows[y].length - 1) {
        return true;
    }
    return rows[y][x] < rows[y][x + 1];
}

const isLowerThanBottom = (y, x, rows) => {

    // If last row, don't check
    if (y === rows.length - 1) {
        return true;
    }
    return rows[y][x] < rows[y + 1][x];
}

run();