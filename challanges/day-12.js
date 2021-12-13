const fs = require('fs');

const run = async () => {

    const rows = fs.readFileSync(`${__dirname}/../inputs/day-12-input.txt`)
        .toLocaleString()
        .split('\n')

    const connections = mapConnections(rows);

    const validPaths = [];
    getPathsPerNode(connections, 'start', [], validPaths, false);

    console.log(validPaths.length);
};

const mapConnections = (rows) => {

    const connections = {};
    for (let row of rows) {

        const [left, right] = row.split('-');
        if (!connections[left]) {
            connections[left] = [];
        }

        if (!connections[right]) {
            connections[right] = [];
        }

        connections[right].push(left);
        connections[left].push(right);
    }

    return connections;
};

const getPathsPerNode = (connections, node, currentPath, validPaths, smallVisitedTwice) => {

    if (node == 'end') {
        validPaths.push([...currentPath, node]);
        return currentPath
    };

    // Do not explore small caves twice
    if (node == 'start' && currentPath.includes(node)) return currentPath;
    if (node == node.toLowerCase() && currentPath.includes(node)) {
        if (smallVisitedTwice)
            return currentPath;
        smallVisitedTwice = true;
    }

    currentPath.push(node);

    const paths = [];
    for (let connection of connections[node]) {

        const connectionPath = getPathsPerNode(connections, connection, [...currentPath], validPaths, smallVisitedTwice);
        if (connectionPath) {
            paths.push(connectionPath);
        }
    }

    return paths;
}

run();