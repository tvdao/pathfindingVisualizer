/**
 * Filename: dijkstra.js
 * Author: Tri Dao
 * Date: 4/28/21
 * 
 * Summary of File: 
 *      This file contains the dijkstra algorithm and how it traverses the grid
 */

/**
 * 
 * 
 * @param grid - The grid that the djikstra algorithm will be ran on
 * @param startNode - The startNode of the grid
 * @param finishNode - The finishNode of the grid
 * 
 * @return - An array that contains the nodes visited by dijkstra
 */
const dijkstra = (grid, startNode, finishNode) => {
    let nodesVisited = [];
    startNode.distance = 0;
    // store all unvisited nodes in array
    const unvisitedNodes = getAllNodes(grid);

    // Loop until unvisitedNodes is empty
    while (unvisitedNodes.length !== 0) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();

        // Is currentNode is not a wall
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

/**
 * Sorts the nodes by their distance from the start Node
 * 
 * @param unvisitedNodes - Array of unvisited nodes
 */
const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((node1, node2) => node1.distance - node2.distance);
}

/**
 * Gets all the nodes in the grid and store in array
 * 
 * @param grid - Current grid
 * 
 * @returns array of all the nodes in the grid
 */
const getAllNodes = (grid) => {
    let nodes = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            nodes.push(grid[row][col]);
        }
    }
    return nodes;
}

/**
 * Add 1 to the current distance of the univisted nodes
 * 
 * @param node - The node that will add 1 to the distance of it's neighbor nodes
 * @param grid - The grid contains the nodes that wil be updated
 */
const updateUnvisitedNeighbors = (node, grid) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (let i = 0; i < unvisitedNeighbors.length; i++) {
        unvisitedNeighbors[i].distance = node.distance + 1;
        unvisitedNeighbors[i].prevNode = node;
    } 
}

/**
 * Gets the unvisited neighbors of the node that the algorithm is on
 * 
 * @param node - The node that will have its neighbors pushed into an array
 * @param grid - The current grid that the node is in
 * 
 * @returns Array that only has nodes that are not visited
 */
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