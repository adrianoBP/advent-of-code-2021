const fs = require('fs');

const run = async () => {

    var rows = fs.readFileSync(`${__dirname}/../inputs/day-2-input.txt`)
        .toLocaleString()
        .split('\n');

    let currentDistance = 0;
    let currentDepth = 0;
    let aim = 0;

    for (let row of rows) {
        let direction = row.split(' ')[0];
        let amount = parseInt(row.split(' ')[1]);

        switch (direction) {
            case 'forward': {
                currentDistance += amount;
                currentDepth += aim * amount;
                break;
            }
            case 'up': aim -= amount; break;
            case 'down': aim += amount; break;
        }
    }

    console.log(currentDistance * currentDepth);
};

run();