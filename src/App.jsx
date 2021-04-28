import React, {useState} from "react";
import Grid from "./components/Grid.jsx"
import {initialGrid} from "./gridOperations";
import {bfs} from "./components/algorithms/bfs.js";
import {dfs} from "./components/algorithms/dfs.js";
import {dijkstra} from "./components/algorithms/dijkstra.js";
import Header from "./components/Header.jsx";

const App = () => {

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

    const visualize = (algo) => {
        const {grid, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol} = gridState;
        const startNode = grid[startNodeRow][startNodeCol];
        const finishNode = grid[finishNodeRow][finishNodeCol];
        let visitedNodesInOrder;
        let shortestPath;
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
            shortestPath = nodesInShortestPath(finishNode);
            console.log(shortestPath);
            animate(visitedNodesInOrder, shortestPath);
        }
    };

    const animate = (visitedNodesInOrder, nodesShortestPath) => {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) { 
            if (i === visitedNodesInOrder.length) {
                setTimeout( () => {
                    animateShortestPath(nodesShortestPath);
                }, 10 * i);
                setGridState({
                    ...gridState,
                    isRunning: false
                })
                return;
            }
            setTimeout( () => {
                const currNode = visitedNodesInOrder[i];
                const {row, col} =currNode;
                const newGrid = gridState.grid;
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

    const animateShortestPath = (nodesShortestPath) => {
        for (let i = 0; i < nodesShortestPath.length; i++) {
            setTimeout( () => {
                const currNode = nodesShortestPath[i];
                const {row, col} =currNode;
                const newGrid = gridState.grid;
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

    const nodesInShortestPath = (finishNode) => {
        let shortestPath = [];

        let currNode = finishNode;

        while (currNode !== null) {
            shortestPath.unshift(currNode);
            currNode = currNode.prevNode;
        }
        return shortestPath;
    }

    const placeWalls = (col, row) => {
        let newGrid = gridState.grid;
        if (!gridState.grid[row][col].isStart && !gridState.grid[row][col].isFinish) {
            newGrid[row][col].isWall = true;
        }
        return newGrid;
    }  

    const mouseDownEvent = (event) => {
        let {col, row, finish, start} = event.currentTarget.dataset;
        col = Number(col);
        row = Number(row);
        if (!gridState.isRunning) {
            if (start === "true") {
                setGridState({
                    ...gridState,
                    isStart: true,
                    mousePressed: true,
                    currCol: col,
                    currRow: row
                })
            }
            else if (finish === "true") {
                setGridState({
                    ...gridState,
                    isFinish: true,
                    mousePressed: true,
                    currCol: col,
                    currRow: row
                })
            }
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

    const mouseEnterEvent = (event) => {
        let {col, row} = event.currentTarget.dataset;
        col = Number(col);
        row = Number(row);
        if (!gridState.isRunning) {
            if (gridState.mousePressed) {
                if (gridState.isStart) {
                    if (!gridState.grid[row][col].isWall && !gridState.grid[row][col].isFinish) {
                        let newGrid = gridState.grid;
                        newGrid[gridState.currRow][gridState.currCol].isStart = false;
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
                else if (gridState.isFinish) {
                    if (!gridState.grid[row][col].isWall && !gridState.grid[row][col].isStart) {
                        let newGrid = gridState.grid;
                        newGrid[gridState.currRow][gridState.currCol].isFinish = false;
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
                else {
                    let newGrid = placeWalls(col, row);
                    setGridState({
                        ...gridState,
                        grid: newGrid
                    })
                }
            }
        }
    }

    const mouseUpEvent = (event) => {
        let {col, row} = event.currentTarget.dataset;
        col = Number(col);
        row = Number(row);
        if (!gridState.isRunning) {
            if (gridState.isStart) {
                setGridState({
                    ...gridState,
                    startNodeCol: col,
                    startNodeRow: row,
                    isStart: false,
                    mousePressed: false
                })
            }
            else if (gridState.isFinish) {
                setGridState({
                    ...gridState,
                    finishNodeCol: col,
                    finishNodeRow: row,
                    isFinish: false,
                    mousePressed: false
                })
            }
            else {
                setGridState({
                    ...gridState,
                    mousePressed:false
                })
            }
        }
    }

    const clearGrid = () => {
        let grid = gridState.grid;
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[0].length; col++) {
                grid[row][col].isVisitedAfter = false;
                grid[row][col].startToEnd = false;
                grid[row][col].isVisited = false;
                grid[row][col].prevNode = null;
            }
        }
        setGridState({
            ...gridState,
            grid: grid
        })
    }

    const clearWall = () => {
        let grid = gridState.grid.slice();
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