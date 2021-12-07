const fs = require('fs');

const run = async () => {

    const positions = fs.readFileSync(`${__dirname}/../inputs/day-7-input.txt`)
        .toLocaleString()
        .split(',')
        .map(Number);

    const min = Math.min(...positions);
    const max = Math.max(...positions);

    let minimumCost = Infinity;
    for (let i = min; i <= max; i++) {
        const cost = getCost(positions, i);
        if (cost < minimumCost) {
            minimumCost = cost;
        }
    }

    console.log(minimumCost);
};

function getCost(positions, destination) {

    let sumOfCosts = 0;
    for (let position of positions) {
        const distance = Math.abs(position - destination);
        sumOfCosts += distance * (distance + 1) / 2 ;
    }
    return sumOfCosts;
}

run();