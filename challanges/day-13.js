const fs = require('fs');

const run = async () => {

    const rows = fs.readFileSync(`${__dirname}/../inputs/day-13-input.txt`)
        .toLocaleString()
        .split('\n')


    let { dots, instructions } = getParameters(rows);

    instructions = [instructions[0]];

    for (let instruction of instructions) {

        if (instruction.axis === 'x') {
            for (let dot of dots) {
                if (dot.x > instruction.index) dot.x = instruction.index - (dot.x - instruction.index);
            }
        }

        if (instruction.axis === 'y') {
            for (let dot of dots) {
                if (dot.y > instruction.index) dot.y = instruction.index - (dot.y - instruction.index);
            }
        }

        dots = dots.reduce((acc, dot) => {
            if (acc.find(d => d.x === dot.x && d.y === dot.y)) {
                return acc;
            }
            return [...acc, dot];
        }, []);

    }

    console.log(dots.length);
};

const getParameters = (rows) => {

    const dots = [];
    const instructions = [];

    for (let row of rows) {

        if (row.startsWith('fold')) {

            const [axis, index] = row.split(' ').slice(-1)[0].split('=');
            instructions.push({
                axis: axis,
                index: parseInt(index)
            });
        } else if (!row) {
            continue;
        } else {
            const [x, y] = row.split(',').map(Number);
            dots.push({ x, y });
        }
    }

    return { dots, instructions };
}


run();