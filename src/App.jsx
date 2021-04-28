/**
 * Filename: App.jsx
 * Author: Tri Dao
 * Date: 4/28/21
 * 
 * Summary of File:
 *      This file is the App component. It keeps track of the grid state and 
 * updates based on what is happening. For instance, mouse events are kept 
 * track of and the grid state is updated based on what is clicked/dragged. 
 * It also contains the visualization method, displaying how the algorithm
 * traverses on the grid.
 */

import React, {useState} from "react";
import Grid from "./components/Grid.jsx"
import {initialGrid} from "./gridOperations";
import {bfs} from "./components/algorithms/bfs.js";
import {dfs} from "./components/algorithms/dfs.js";
import {dijkstra} from "./components/algorithms/dijkstra.js";
import {aStar} from "./components/algorithms/aStar.js";
import Header from "./components/Header.jsx";

/**
 * Displays the grid and header. Handles the dynamic changes of the
 * board. Handles the visualization aspect of the project.
 * 
 * @return Board component that contains the header of the website and
 * the grid where the algorithms take place.
 */
const App = () => {

    // Keeps track of the grid state (ex. the changes of each node in the grid)
    const [gridState, setGridState] = useState({
        grid: initialGrid(),
        startNodeRow: 10,
        startNodeCol: 10,
        finishNodeRow: 10,
        finishNodeCol: 30,
        isRunning : false,
        mousePressed: false,
        currRow: null,
        currCol: null,
        isFinish: false,
        isStart: false
    });

    const calcDistanceToFinNode = () => {
        const {finishNodeRow, finishNodeCol, grid} = gridState;
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[0].length; col++) {
                gridState.grid[row][col].distanceToFinishNode = Math.abs(row - finishNodeRow) + Math.abs(col - finishNodeCol);
            }
        }
    }

    /**
     * Calls the algorithm that is requested, then calls method that 
     * graphically displays how the algorithm searches for the finish 
     * (red) node on the grid.
     * 
     * @param algo - The algorithm that will be visualized
     */
    const visualize = (algo) => {
        const {grid, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol} = gridState;
        const startNode = grid[startNodeRow][startNodeCol];
        const finishNode = grid[finishNodeRow][finishNodeCol];
        let visitedNodesInOrder;
        let shortestPath;
        // Won't visualize if grid is not clear. 
        if (isGridClear()) {
            if (algo === "bfs") {
                visitedNodesInOrder = bfs(grid, startNode, finishNode);
            }
            if (algo === "dfs") {
                visitedNodesInOrder = dfs(grid, startNode, finishNode);
            }
            if (algo === "dijkstra") {
                visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
            }
            if (algo === "A*") {
                calcDistanceToFinNode();
                visitedNodesInOrder = aStar(grid, startNode, finishNode);
            }
            // shortest path from start to finish
            shortestPath = nodesInShortestPath(finishNode);
            animate(visitedNodesInOrder, shortestPath);
        }
    };

    /**
     * Animates how the algorithm searches on the grid. After, animates the 
     * shortest path from start node to finish node.
     * 
     * @param visitedNodesInOrder - Array that contains the order that the nodes were 
     *                              traversed in based on algorithm
     * @param nodesShortestPath - Array of nodes that correspond to the shortest
     *                            path the algorithm found from start to finish node
     */
    const animate = (visitedNodesInOrder, nodesShortestPath) => {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) { 
            // Once it goes past the finish node, animate the shortest path
            if (i === visitedNodesInOrder.length) {
                setTimeout( () => {
                    animateShortestPath(nodesShortestPath);
                }, 10 * i);
                // After animate is finished, the algorithm is no longer running 
                setGridState({
                    ...gridState,
                    isRunning: false
                })
                return;
            }
            // Animates the visited nodes
            setTimeout( () => {
                const currNode = visitedNodesInOrder[i];
                const {row, col} =currNode;
                const newGrid = gridState.grid;
                // isVisitedAfter if true will apply different css to the node
                const newNode = {
                    ...currNode,
                    isVisitedAfter: currNode.isStart || currNode.isFinish ? false : true
                }
                newGrid[row][col] = newNode;
                setGridState({
                    ...gridState,
                    grid: newGrid,
                    isRunning: true
                })
            }, 10 * i)
        }  
    }

    /**
     * Handles animating the shortest path
     * 
     * @param nodesShortestPath - Shortest path from start node to finish node 
     *                            based on algorithm
     */
    const animateShortestPath = (nodesShortestPath) => {
        for (let i = 0; i < nodesShortestPath.length; i++) {
            setTimeout( () => {
                const currNode = nodesShortestPath[i];
                const {row, col} =currNode;
                const newGrid = gridState.grid;
                // startToEnd handles css for the shortest path, different from isVisitedAfter
                const newNode = {
                    ...currNode,
                    startToEnd: currNode.isStart || currNode.isFinish ? false : true
                }
                newGrid[row][col] = newNode;
                setGridState({
                    ...gridState,
                    grid: newGrid
                })
            }, 50 * i)
        }
    }

    /**
     * Gets the shortest path by traversing the previous node, starting at the finish
     * node.
     * 
     * @param finishNode - the finishNode of the current grid
     *  
     * @returns An array of the shortest path from start node to finish node 
     */
    const nodesInShortestPath = (finishNode) => {
        let shortestPath = [];

        let currNode = finishNode;

        // Stops at startNode, since startNode prevNode = null
        while (currNode !== null) {
            // unshift adds node to beginning of array
            shortestPath.unshift(currNode);
            currNode = currNode.prevNode;
        }
        return shortestPath;
    }

    /**
     * Takes in the row and col from the mouse events, and changes the
     * property of the node clicked to change it to a wall
     * 
     * @param col - The column where the wall is placed
     * @param row - The row where the wall is placed
     * 
     * @returns The updated grid with the node that became a wall
     */
    const placeWalls = (col, row) => {
        let newGrid = gridState.grid;
        if (!gridState.grid[row][col].isStart && !gridState.grid[row][col].isFinish) {
            newGrid[row][col].isWall = true;
        }
        return newGrid;
    }  

    /**
     * Handles when the mouse clicks down on a node. Different cases if
     * the node is the startNode, finishNode, or empty node. Changes gridState
     * based on what is clicked down
     * 
     * @param event - The node that is clicked down on
     */
    const mouseDownEvent = (event) => {
        let {col, row, finish, start} = event.currentTarget.dataset;
        col = Number(col);
        row = Number(row);
        // If algorithm is running on grid, click down events won't have any effect
        if (!gridState.isRunning) {
            // If click down on start node
            if (start === "true") {
                setGridState({
                    ...gridState,
                    isStart: true,
                    mousePressed: true,
                    currCol: col,
                    currRow: row
                })
            }
            // If click down on finish node
            else if (finish === "true") {
                setGridState({
                    ...gridState,
                    isFinish: true,
                    mousePressed: true,
                    currCol: col,
                    currRow: row
                })
            }
            // If click down on emptyNode, places wall on node
            else {
                let newGrid = placeWalls(col, row);
                setGridState({
                    ...gridState,
                    grid: newGrid,
                    mousePressed: true,
                    currCol: col,
                    currRow: row
                })
            }
        }
    }

    /**
     * Handles the event where the mouse hovers over a node. Can "drag"
     * start node to any position, same with finish node. Can place walls
     * by dragging.
     * 
     * @param event - The node that is hovered over by the mouse
     */
    const mouseEnterEvent = (event) => {
        let {col, row} = event.currentTarget.dataset;
        col = Number(col);
        row = Number(row);
        // Only run if algorithm is not running
        if (!gridState.isRunning) {
            // Only run if mouse is pressed down
            if (gridState.mousePressed) {
                // If current node is the start node
                if (gridState.isStart) {
                    // Can only drag start node to position if it is not a wall node or finish node
                    if (!gridState.grid[row][col].isWall && !gridState.grid[row][col].isFinish) {
                        let newGrid = gridState.grid;
                        // Changes the previous start node isStart to false
                        newGrid[gridState.currRow][gridState.currCol].isStart = false;
                        // Changes current start node isStart to true
                        newGrid[row][col].isStart = true;
                        setGridState({
                            ...gridState,
                            grid: newGrid,
                            startNodeCol: col,
                            startNodeRow: row,
                            currCol: col,
                            currRow: row
                        })
                    }
                }
                // if current node is the finish node
                else if (gridState.isFinish) {
                    // Can only drag finish node to position if it is not a wall node or finish node
                    if (!gridState.grid[row][col].isWall && !gridState.grid[row][col].isStart) {
                        let newGrid = gridState.grid;
                        // Changes previous finish node isFinish to false
                        newGrid[gridState.currRow][gridState.currCol].isFinish = false;
                        // Changes current finish node isFinish to true
                        newGrid[row][col].isFinish = true;
                        setGridState({
                            ...gridState,
                            grid: newGrid,
                            finishNodeCol: col,
                            finishNodeRow: row,
                            currCol: col,
                            currRow: row
                        })
                    }
                }
                // if current node is an empty node
                else {
                    // Place wall if empty node
                    let newGrid = placeWalls(col, row);
                    setGridState({
                        ...gridState,
                        grid: newGrid
                    })
                }
            }
        }
    }

    /**
     * Handles when mouse is released. 
     * 
     * @param event - The node that the mouse is released on 
     */
    const mouseUpEvent = (event) => {
        let {col, row} = event.currentTarget.dataset;
        col = Number(col);
        row = Number(row);
        // Nothing happens if algorithm is running
        if (!gridState.isRunning) {
            // If mouse was clicked down on start Node
            if (gridState.isStart) {
                setGridState({
                    ...gridState,
                    startNodeCol: col,
                    startNodeRow: row,
                    isStart: false,
                    mousePressed: false
                })
            }
            // If mouse was clicked down on finish Node
            else if (gridState.isFinish) {
                setGridState({
                    ...gridState,
                    finishNodeCol: col,
                    finishNodeRow: row,
                    isFinish: false,
                    mousePressed: false
                })
            }
            // If mmouse was clicked down on emptyy Node
            else {
                setGridState({
                    ...gridState,
                    mousePressed:false
                })
            }
        }
    }

    /**
     * Clears the grid after algorithm is ran. Changes the properties
     * of the every node to the default node properties.
     */
    const clearGrid = () => {
        let grid = gridState.grid;
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[0].length; col++) {
                grid[row][col].isVisitedAfter = false;
                grid[row][col].startToEnd = false;
                grid[row][col].isVisited = false;
                grid[row][col].prevNode = null;
                grid[row][col].distance = Infinity;
            }
        }
        setGridState({
            ...gridState,
            grid: grid
        })
    }

    /**
     * Clears the walls on the grid. Sets each node isWall property to false
     */
    const clearWall = () => {
        let grid = gridState.grid;
        if (!gridState.isRunning) {
            for (let row = 0; row < grid.length; row++) {
                for (let col = 0; col < grid[0].length; col++) {
                    grid[row][col].isWall = false;
                }
            }
            setGridState({
                ...gridState,
                grid: grid
            })
        }
    }

    /**
     * Checks if the grid is cleared, i.e. each node on grid has default
     * properties prior to calling the visualize function
     * 
     * @returns True if clear, false otherwise  
     */
    const isGridClear = () => {
        let grid = gridState.grid.slice();
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[0].length; col++) {
                if (grid[row][col].isVisitedAfter || grid[row][col].startToEnd) {
                    return false;
                }
            }
        }
        return true;
    }

    return (
        <div>
            <Header 
                visualize = {visualize}
                clearGrid = {clearGrid}
                clearWall = {clearWall}
            />
            <Grid
                grid = {gridState.grid}
                placeWalls = {placeWalls}
                mouseDownEvent = {mouseDownEvent}
                mouseUpEvent = {mouseUpEvent}
                mouseEnterEvent = {mouseEnterEvent}
            />
        </div>
    )
}

export default App;