const fs = require('fs');

const run = async () => {

    const rows = fs.readFileSync(`${__dirname}/../inputs/day-4-input.txt`)
        .toLocaleString()
        .split('\n');

    let numbers = rows[0].split(',');

    let tables = getTables(rows.splice(1));

    let drawnNumbers = [];
    let bingoTable = null;


    for (let i = 0; i < numbers.length && !bingoTable; i++) {
        drawnNumbers.push(numbers[i]);

        tables.forEach(table => {
            if (isBingo(table, drawnNumbers))
                bingoTable = table;
        });
    }

    let sum = bingoTable.flat().filter(x => !drawnNumbers.includes(x)).map(x => parseInt(x)).reduce((a, b) => a + b);
    console.log(sum * drawnNumbers.pop());
};

const getTables = (rows) => {

    let tables = [];
    for (let i = 0; i < rows.length; i += 6) {

        let table = [];
        for (let j = i + 1; j < i + 6; j++) {
            table.push(rows[j].split(' ').filter(x => x != ''));
        }
        tables.push(table);
    }

    return tables
};

const isBingo = (table, numbers) => {

    for (let i = 0; i < table.length; i++) {

        if (table[i].every(x => numbers.includes(x))) {
            return true;
        }

        if (table.map(x => x[i]).every(x => numbers.includes(x))) {
            return true;
        }
    }

    return false;
}

run();