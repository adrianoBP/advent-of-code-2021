const fs = require('fs');

const run = async () => {

    const rows = fs.readFileSync(`${__dirname}/../inputs/day-14-input.txt`)
        .toLocaleString()
        .split('\n')


    let { template, pairs } = getParameters(rows);

    for (let i = 0; i < 10; i++) {

        template = addMatches(template, pairs);
    }

    const occurrences = template.split('').reduce((acc, curr) => {

        if (acc[curr]) {
            acc[curr]++;
        } else {
            acc[curr] = 1;
        }

        return acc;
    }, {});

    const { max, min } = Object.keys(occurrences).reduce((acc, curr) => {

        if (acc.max < occurrences[curr]) {
            acc.max = occurrences[curr];
            acc.maxKey = curr;
        }

        if (acc.min > occurrences[curr]) {
            acc.min = occurrences[curr];
            acc.minKey = curr;
        }

        return acc;
    }, { max: 0, min: Infinity, maxKey: '', minKey: '' });

    console.log(max - min);
};

const getParameters = (rows) => {

    const template = rows[0];
    const pairs = rows.slice(2).map(row => {

        const [match, element] = row.split(' -> ');
        return { match, element };
    }).reduce((acc, curr) => {

        acc[curr.match] = curr.element;
        return acc;
    }, {});

    return { template, pairs };
};

const addMatches = (template, pairs) => {

    let result = ''
    for (let i = 0; i < template.length - 1; i++) {

        const currentMatch = template[i] + template[i + 1];
        result += template[i] + pairs[currentMatch];
    }
    result += template[template.length - 1];

    return result;
};

run();