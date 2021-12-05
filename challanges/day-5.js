const fs = require('fs');

const run = async () => {

    const rows = fs.readFileSync(`${__dirname}/../inputs/day-5-input.txt`)
        .toLocaleString()
        .split('\n');

    let lines = [];
    for (let line of rows.map(row => row.split(' -> '))) {

        const p1 = line[0].split(',');
        const p2 = line[1].split(',');

        const segment = {
            p1: {
                x: parseInt(p1[0]),
                y: parseInt(p1[1])
            },
            p2: {
                x: parseInt(p2[0]),
                y: parseInt(p2[1])
            }
        };

        if (segment.p1.x === segment.p2.x || segment.p1.y === segment.p2.y) {
            lines.push(segment);
        }

    }

    const traversedPoints = [];
    const multiPoints = [];

    for (let line of lines) {

        const points = getAllPointsBetweenTwoPoints(line.p1.x, line.p1.y, line.p2.x, line.p2.y);

        for (let point of points) {
            if (traversedPoints.includes(point)) {
                multiPoints.push(point);
            } else {
                traversedPoints.push(point);
            }
        }
    }

    console.log(new Set(multiPoints).size);
};


function getAllPointsBetweenTwoPoints(x0, y0, x1, y1) {

    const points = [];
    for(let i = Math.min(x0, x1); i <= Math.max(x0, x1); i++) {
        for(let j = Math.min(y0, y1); j <= Math.max(y0, y1); j++) {
            points.push(`${i},${j}`);
        }
    }
    return points;
}

run();