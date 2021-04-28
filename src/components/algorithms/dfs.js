/**
 * Filename: dfs.js
 * Author: Tri Dao
 * Date: 4/28/21
 * 
 * Summary of File: 
 *      This file contains the dfs algorithm. Deals with how
 * the algorithm is called on the grid
 */

/**
 * The function deals with how dfs is ran on the grid. Searching
 * for the finish Node starting from the start Node.
 * 
 * @param grid - The grid that dfs will be called on
 * @param startNode - The node that dfs will start at
 * @param finishNode - The node that dfs is searching for and end at
 * 
 * @returns An array of the nodes visited from dfs algorithm
 */
const dfs = (grid, startNode, finishNode) => {

    let stack = [startNode];

    let nodesVisited = [];

    while (stack.length !== 0) {
        // Gets the element that was last in the array
        let currentNode = stack.pop();

        // Return when currentNode is at finishNode
        if (currentNode === finishNode) {
            nodesVisited.push(currentNode);
            return nodesVisited;
        }

        // Don't push node if its a wall or if its been visited
        if (!currentNode.isWall && !currentNode.isVisited) {
            currentNode.isVisited = true;
            nodesVisited.push(currentNode);
            const {col, row} = currentNode;
            let nextNode;
            // Ensures that algo won't go past the top row of the grid
            if (row > 0) {
                nextNode = grid[row-1][col];
                if (!nextNode.isVisited) {
                    stack.push(nextNode);
                    nextNode.prevNode = currentNode;
                }
            }
            // Ensures that algo won't go past bottom row of the grid
            if (row < grid.length-1) {
                nextNode = grid[row+1][col];
                if (!nextNode.isVisited) {
                    stack.push(nextNode);
                    nextNode.prevNode = currentNode
                }
            }
            // Ensures that algo won't go past furthest left column of the grid
            if (col > 0) {
                nextNode = grid[row][col-1];
                if (!nextNode.isVisited) {
                    stack.push(nextNode);
                    nextNode.prevNode = currentNode
                }
            }
            // Ensures that algo won't go past furthest right column of the grid
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