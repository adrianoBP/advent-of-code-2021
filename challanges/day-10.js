const fs = require('fs');

const run = async () => {

    const rows = fs.readFileSync(`${__dirname}/../inputs/day-10-input.txt`)
        .toLocaleString()
        .split('\n');


    let counter = 0;
    for (let row of rows) {

        const stack = [];

        for (let char of row.split('')) {

            let errorFound = false;

            if (['(', '[', '{', '<'].includes(char)) {
                stack.push(char);
            } else {
                switch (char) {

                    case ')': {
                        if (stack.pop() !== '(') {
                            counter += 3;
                            errorFound = true;
                        }
                        break;
                    }

                    case ']': {
                        if (stack.pop() !== '[') {
                            counter += 57;
                            errorFound = true;
                        }
                        break;
                    }

                    case '}': {
                        if (stack.pop() !== '{') {
                            counter += 1197;
                            errorFound = true;
                        }
                        break;
                    }

                    case '>': {
                        if (stack.pop() !== '<') {
                            counter += 25137;
                            errorFound = true;
                        }
                        break;
                    }

                }
            }

            if (errorFound) break;
        }
    }

    console.log(counter);

};

run();