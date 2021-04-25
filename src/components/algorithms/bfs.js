const bfs = (grid, startNode, finishNode) => {

    let queue = [startNode];

    let nodesVisited = [];

    while (queue.length !== 0) {
        let currentNode = queue.shift();

        if (currentNode.col === finishNode.col && currentNode.row === finishNode.row) {
            nodesVisited.push(currentNode);
            return nodesVisited;
        }
        if (!currentNode.isWall && !currentNode.isVisited) {
            currentNode.isVisited = true;
            nodesVisited.push(currentNode);
            const {col, row} = currentNode;
            let nextNode;
            if (row > 0) {
                nextNode = grid[row-1][col];
                if (!nextNode.isVisited) {
                    queue.push(nextNode);
                    nextNode.prevNode = currentNode;
                }
            }
            if (row < grid.length-1) {
                nextNode = grid[row+1][col];
                if (!nextNode.isVisited) {
                    queue.push(nextNode);
                    nextNode.prevNode = currentNode
                }
            }
            if (col > 0) {
                nextNode = grid[row][col-1];
                if (!nextNode.isVisited) {
                    queue.push(nextNode);
                    nextNode.prevNode = currentNode
                }
            }
            if (col < grid[0].length-1) {
                nextNode = grid[row][col+1];
                if (!nextNode.isVisited) {
                    queue.push(nextNode);
                    nextNode.prevNode = currentNode
                }
            }
        }
    }
    return nodesVisited;
}

export {bfs};