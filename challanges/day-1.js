const fs = require('fs');

const run = async () => {

    const data = fs.readFileSync(`${__dirname}/../inputs/day-1-input.txt`).toLocaleString();

    var rows = data.split('\n');

    let counter = 0;
    let previousDepth = 0;

    for (var i = 0; i < rows.length; i++) {

        let currentDepth = parseInt(rows[i])
        if (i > 0 && currentDepth > previousDepth) counter++;
        previousDepth = currentDepth;
    }

    console.log(counter);
};

run();