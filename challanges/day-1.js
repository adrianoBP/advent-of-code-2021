const fs = require('fs');

const run = async () => {

    const data = fs.readFileSync(`${__dirname}/../inputs/day-1-input.txt`).toLocaleString();

    var rows = data.split('\n');

    let counter = 0;
    let previousDepth = 0;

    let groupedDepths = groupDepths(rows);

    for (var i = 0; i < groupedDepths.length; i++) {

        let currentDepth = groupedDepths[i];
        if (i > 0 && currentDepth > previousDepth) counter++;
        previousDepth = currentDepth;
    }

    console.log(counter);
};

const groupDepths = (rows) => {

    let groupedDepths = [];
    for (var i = 0; i < rows.length; i++) {

        let currentValue = parseInt(rows[i]);

        if (i == 0) {
            groupedDepths.push(currentValue);
        } else if (i == 1) {
            groupedDepths[i - 1] += currentValue;
            groupedDepths.push(currentValue);
        } else {
            groupedDepths[i - 2] += currentValue;
            groupedDepths[i - 1] += currentValue;
            groupedDepths.push(currentValue);
        }
    }
    return groupedDepths;
}

run();