import React, {useState} from "react";
import Grid from "./components/Grid.jsx"
import {initialGrid} from "./gridOperations";
import {bfs} from "./components/algorithms/bfs.js";

const App = () => {

    const [gridState, setGridState] = useState({
        grid: initialGrid(),
        startNodeRow: 10,
        startNodeCol: 15,
        finishNodeRow: 10,
        finishNodeCol: 55
    });

    const visualize = (algo) => {
        const {grid, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol} = gridState;
        const startNode = grid[startNodeRow][startNodeCol];
        const finishNode = grid[finishNodeRow][finishNodeCol];
        let visitedNodesInOrder;
        if (algo === "bfs") {
            visitedNodesInOrder = bfs(gridState.grid, startNode, finishNode);
            animate(visitedNodesInOrder);
        }
    };

    const animate = (visitedNodesInOrder) => {
        for (let i = 0; i < visitedNodesInOrder.length; i++) { 
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
                    grid: newGrid
                })
            }, 10 * i)
        }
    }

    return (
        <div>
            <Grid
            grid = {gridState.grid}
            />
            <button onClick={() => {
                visualize("bfs")
            }}>BFS</button>
        </div>
    )
}

export default App;