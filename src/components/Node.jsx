/**
 * Filename: Node.jsx
 * Author: Tri Dao
 * Date: 4/28/21
 * 
 * Summary of File:
 *      This file is the Node component. It deals with how
 * a node is interacted with and the styles applied depending
 * on the node is interacted.
 */

import React from "react";
import "./Node.css";

/**
 * Creates the node component and set its properties based on
 * the props passed down. Styles are also depedent on the props
 * passed down
 * 
 * @param props - The properties passed down to the compoenent 
 * 
 * @returns A node component
 */
const Node = (props) => {

    const {col, row, isWall, isStart, isFinish, isVisitedAfter} = props;

    const {startToEnd, mouseDownEvent, mouseUpEvent, mouseEnterEvent} = props;

    // Applys css classNames depending on props passed in
    let nodeStyle = [
        "node",
        isStart ? "start" : "",
        isFinish ? "finish" : "",
        isVisitedAfter ? "visited" : "",
        startToEnd ? "shortestPath" : "",
        isWall ? "wall" : ""
    ]

    return (
        <div className = {nodeStyle.join(" ")}
             data-col = {col}
             data-row = {row}
             data-finish = {isFinish}
             data-start = {isStart}
             onMouseDown = {mouseDownEvent}
             onMouseUp = {mouseUpEvent}
             onMouseEnter = {mouseEnterEvent}
        >
        </div>
    )
}

export default Node;