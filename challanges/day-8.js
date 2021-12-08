const fs = require('fs');

const run = async () => {

    const rows = fs.readFileSync(`${__dirname}/../inputs/day-8-input.txt`)
        .toLocaleString()
        .split('\n')

    let simpleNumCount = 0;
    for (let row of rows) {

        let segments = row.split('|')[1].split(' ').filter(segment => segment != '').map(segment => segment.trim());
        simpleNumCount += segments.filter(segment => [2, 3, 4, 7].includes(segment.length)).length;
    }

    console.log(simpleNumCount);
};

run();