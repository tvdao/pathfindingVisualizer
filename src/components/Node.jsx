import React from "react";
import "./Node.css";

const Node= (props) => {

    const {col, row, isWall, isStart, isFinish, isVisited, isVisitedAfter} = props;

    const {startToEnd, placeWalls, mouseDownEvent, mouseUpEvent, mouseEnterEvent} = props;

    let nodeStyle = [
        "node",
        isStart ? "start" : "",
        isFinish ? "finish" : "",
        isVisitedAfter ? "visited" : "",
        startToEnd ? "shortestPath" : "",
        isWall ? "wall" : ""
    ]
    // onMouseDown = {() => {
    //     placeWalls({
    //         col: col,
    //         row: row
    //     })
    //  }}

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