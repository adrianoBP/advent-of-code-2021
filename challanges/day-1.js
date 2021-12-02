const fs = require('fs');

const run = async () => {

    var rows = fs.readFileSync(`${__dirname}/../inputs/day-1-input.txt`)
        .toLocaleString()
        .split('\n');

    let groupedDepths = groupDepths(rows);

    let counter = 0;
    let previousDepth = groupedDepths[0];

    for (var i = 1; i < groupedDepths.length; i++) {

        let currentDepth = groupedDepths[i];
        if (currentDepth > previousDepth) counter++;
        previousDepth = currentDepth;
    }

    console.log(counter);
};

const groupDepths = (rows) => {

    let groupedDepths = [
        parseInt(rows[0]),
        parseInt(rows[0]) + parseInt(rows[1]),
    ];
    for (var i = 2; i < rows.length; i++) {

        let currentValue = parseInt(rows[i]);
        groupedDepths[i - 2] += currentValue;
        groupedDepths[i - 1] += currentValue;
        if (i < rows.length - 2)
            groupedDepths.push(currentValue);
    }
    return groupedDepths;
}

run();