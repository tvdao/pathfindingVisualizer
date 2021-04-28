/**
 * Filename: Grid.jsx
 * Author: Tri Dao
 * Date: 4/28/21
 * 
 * Summary of File: 
 *      This file is a Grid component. It maps out the 2d grid, and creates
 * a Node for each [row][col]. It places the all the nodes within a div
 */

import React from "react";
import Node from "./Node.jsx";
import "./Grid.css"

/**
 * Creates the grid component, that will be used to display the grid on the website. 
 * Uses Node components to represent the individual cells of the grid
 * 
 * @param grid - 2d array, representing the grid
 * @param placeWalls - placeWalls method that will be passed down to node component
 * @param mouseDownEvent - mouseDownEvent method that will be passed down to node component
 * @param mouseUpEvent - mouseUpEvent method that will be passed down to node component
 * @param mouseEnterEvent - mouseEnterEvent method that will be passed down to node component
 * 
 * @return Node component for each [row][col of the grid, all encased in a div
 */
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