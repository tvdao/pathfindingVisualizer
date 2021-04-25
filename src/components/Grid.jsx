import React from "react";
import Node from "./Node.jsx";
import "./Grid.css"

const Grid = ({grid, placeWalls, mouseDownEvent, mouseUpEvent, mouseEnterEvent}) => {
    return (
        <div className="grid">
            {grid.map((row, rowId) => {
                return (
                    <div key={rowId}>
                        {row.map((node, nodeId) => {
                            return (
                                <Node 
                                    key = {nodeId}
                                    col = {node.col}
                                    row = {node.row}
                                    isWall = {node.isWall}
                                    isStart = {node.isStart}
                                    isFinish = {node.isFinish}
                                    isVisited = {node.isVisited}
                                    isVisitedAfter = {node.isVisitedAfter}
                                    startToEnd = {node.startToEnd}
                                    placeWalls = {placeWalls}
                                    mouseDownEvent = {mouseDownEvent}
                                    mouseUpEvent = {mouseUpEvent}
                                    mouseEnterEvent = {mouseEnterEvent}
                                />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default Grid;