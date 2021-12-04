const fs = require('fs');

const run = async () => {

    const rows = fs.readFileSync(`${__dirname}/../inputs/day-4-input.txt`)
        .toLocaleString()
        .split('\n');

    let numbers = rows[0].split(',');

    let tables = getTables(rows.splice(1));

    let drawnNumbers = [];
    let lastWinningTable = null;

    for (let i = 0; i < numbers.length && tables.length > 0; i++) {

        drawnNumbers.push(numbers[i]);

        for (let j = tables.length - 1; j >= 0; j--) {
            if (isBingo(tables[j], drawnNumbers)) {
                lastWinningTable = {
                    table: tables[j],
                    winningNumber: numbers[i]
                };
                tables.splice(j, 1);
            }
        }
    }

    let sum = lastWinningTable.table
        .flat()
        .filter(x => !drawnNumbers.includes(x))
        .map(x => parseInt(x)).reduce((a, b) => a + b);
    console.log(sum * lastWinningTable.winningNumber);
};

const getTables = (rows) => {

    let tables = [];
    for (let i = 0; i < rows.length; i += 6) {

        let table = [];
        for (let j = i + 1; j < i + 6; j++) {  // Skip first empty line
            table.push(rows[j].split(' ').filter(x => x != ''));
        }
        tables.push(table);
    }

    return tables
};

const isBingo = (table, numbers) => {

    for (let i = 0; i < table.length; i++) {

        // Check horizontal
        if (table[i].every(x => numbers.includes(x))) return true;
        // Check vertical
        if (table.map(x => x[i]).every(x => numbers.includes(x))) return true;
    }

    return false;
}

run();