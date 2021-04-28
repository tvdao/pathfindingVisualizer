const dijkstra = (grid, startNode, finishNode) => {
    let nodesVisited = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);

    while (unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();

        if (!closestNode.isWall) {
            if (closestNode.distance === Infinity) {
                return nodesVisited;
            }
            closestNode.isVisited = true;
            nodesVisited.push(closestNode);
            if (closestNode === finishNode) {
                return nodesVisited;
            }
            updateUnvisitedNeighbors(closestNode, grid);
        }
    }
}

const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((node1, node2) => node1.distance - node2.distance);
}

const getAllNodes = (grid) => {
    let nodes = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            nodes.push(grid[row][col]);
        }
    }
    return nodes;
}

const updateUnvisitedNeighbors = (node, grid) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (let i = 0; i < unvisitedNeighbors.length; i++) {
        unvisitedNeighbors[i].distance = node.distance + 1;
        unvisitedNeighbors[i].prevNode = node;
    }
}

const getUnvisitedNeighbors = (node, grid) => {
    let neighbors = [];
    const {col, row} = node;
    if (row > 0) {
        neighbors.push(grid[row-1][col]);
    }
    if (row < grid.length  - 1) {
        neighbors.push(grid[row+1][col]);
    }
    if (col > 0) {
        neighbors.push(grid[row][col-1]);
    }
    if (col < grid[0].length - 1) {
        neighbors.push(grid[row][col+1]);
    }
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

export {dijkstra};