import React from "react";
import Node from "./Node.jsx";
import "./Grid.css"

const Grid = ({grid}) => {
    return (
        <div className="grid">
            {grid.map((row, rowId) => {
                return (
                    <div key={rowId}>
                        {row.map((col, colId) => {
                            return (
                                <Node 
                                    key = {colId}
                                    col = {col.col}
                                    row = {col.row}
                                    isWall = {col.isWall}
                                    isStart = {col.isStart}
                                    isFinish = {col.isFinish}
                                    isVisited = {col.isVisited}
                                    isVisitedAfter = {col.isVisitedAfter}
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