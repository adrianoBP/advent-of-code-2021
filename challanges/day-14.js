const fs = require('fs');

const run = async () => {

    const rows = fs.readFileSync(`${__dirname}/../inputs/day-14-input.txt`)
        .toLocaleString()
        .split('\n')


    let { template, matches } = getParameters(rows);

    let matchesCount = {};
    for (let i = 0; i < template.length - 1; i++) {
        const match = `${template[i]}${template[i + 1]}`;
        matchesCount[match] = (matchesCount[match] || 0) + 1;
    }

    for (let _ = 0; _ < 40; _++) {

        const newMatches = {};
        for (let match in matchesCount) {

            const [a, b] = matches[match];
            newMatches[a] = (newMatches[a] || 0) + matchesCount[match];
            newMatches[b] = (newMatches[b] || 0) + matchesCount[match];
        }

        matchesCount = newMatches;
    }

    const occurrences = {};
    for(let match in matchesCount) {

        occurrences[match[0]] = (occurrences[match[0]] || 0) + matchesCount[match];
    }

    occurrences[template[template.length - 1]]++;

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
    const matches = rows.slice(2).map(row => {

        const [match, element] = row.split(' -> ');
        return { match, element };
    }).reduce((acc, curr) => {

        acc[curr.match] = [curr.match[0] + curr.element, curr.element + curr.match[1]];
        return acc;
    }, {});

    return { template, matches };
};


run();