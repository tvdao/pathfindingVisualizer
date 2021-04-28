/**
 * Filename: gridOperations.js
 * Author: Tri Dao
 * Date: 4/28/21
 * 
 * Summary of FIle:
 *      This file contains the method that creates the initial
 * default Grid when the App loads and renders for the first time.
 */

/**
 * Creates an initial 2d array of a "node" object with many default properties
 * used for the graph traversal algorithms
 * 
 * @returns 2d array of the "node" object
 */
const initialGrid = () => {
    let grid = [];
    for (let row = 0; row < 20; row++) {
        grid.push([]);
        for (let col = 0; col < 40; col++) {
            grid[row].push({
                row: row,
                col: col,
                isWall: false,
                prevNode: null,
                isStart: (row === 10 && col === 10) ? true : false,
                isFinish: (row === 10 && col === 30) ? true : false,
                isVisited: false,
                isVisitedAfter: false,
                startToEnd: false,
                distance: Infinity,
            })
        }
    }
    return grid;
}

export {initialGrid}