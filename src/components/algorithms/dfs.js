const dfs = (grid, startNode, finishNode) => {

    let stack = [startNode];

    let nodesVisited = [];

    while (stack.length !== 0) {
        let currentNode = stack.pop();

        if (currentNode === finishNode) {
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
                    stack.push(nextNode);
                    nextNode.prevNode = currentNode;
                }
            }
            if (row < grid.length-1) {
                nextNode = grid[row+1][col];
                if (!nextNode.isVisited) {
                    stack.push(nextNode);
                    nextNode.prevNode = currentNode
                }
            }
            if (col > 0) {
                nextNode = grid[row][col-1];
                if (!nextNode.isVisited) {
                    stack.push(nextNode);
                    nextNode.prevNode = currentNode
                }
            }
            if (col < grid[0].length-1) {
                nextNode = grid[row][col+1];
                if (!nextNode.isVisited) {
                    stack.push(nextNode);
                    nextNode.prevNode = currentNode
                }
            }
        }
    }
}

export {dfs};