const fs = require('fs');

const run = async () => {

    const rows = fs.readFileSync(`${__dirname}/../inputs/day-6-input.txt`)
        .toLocaleString()
        .split('\n');

    const timers = rows[0].split(',').map(Number);

    for (let i = 0; i < 256; i++) {

        for (let j = timers.length - 1; j >= 0; j--) {

            timers[j] = timers[j] - 1;

            if (timers[j] == -1) {
                timers[j] = 6;
                timers.push(8);
            }
        }
    }

    console.log(timers.length);
};


run();