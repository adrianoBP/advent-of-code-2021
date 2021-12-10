const fs = require('fs');

const run = async () => {

    const rows = fs.readFileSync(`${__dirname}/../inputs/day-10-input.txt`)
        .toLocaleString()
        .split('\n');

    let totalPointsByRow = [];
    for (let row of rows) {

        const stack = [];
        let errorFound = false;

        for (let char of row.split('')) {

            if (['(', '[', '{', '<'].includes(char)) {
                stack.push(char);
            } else {
                switch (char) {

                    case ')':
                        if (stack.pop() !== '(') errorFound = true;
                        break;

                    case ']':
                        if (stack.pop() !== '[') errorFound = true;
                        break;

                    case '}':
                        if (stack.pop() !== '{') errorFound = true;
                        break;

                    case '>':
                        if (stack.pop() !== '<') errorFound = true;
                        break;
                }
            }
        }

        if (errorFound || stack.length == 0) continue;

        let counter = 0;
        for (let char of stack.reverse()) {
            let value = getCharacterValue(char);
            counter = (counter * 5) + value;
        }
        totalPointsByRow.push(counter);
    }

    totalPointsByRow.sort((a, b) => a - b);
    console.log(totalPointsByRow[Math.floor(totalPointsByRow.length / 2)]);
};

const getCharacterValue = (char) => {
    switch (char) {
        case '(': return 1;
        case '[': return 2;
        case '{': return 3;
        case '<': return 4;
    }
}

run();