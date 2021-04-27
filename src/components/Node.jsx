import React from "react";
import "./Node.css";

const Node= (props) => {

    const {col, row, isWall, isStart, isFinish, isVisitedAfter} = props;

    const {startToEnd, mouseDownEvent, mouseUpEvent, mouseEnterEvent} = props;

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