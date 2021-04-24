import React from "react";
import "./Node.css";

const Node= ({col, row, isWall, isStart, isFinish, isVisited, isVisitedAfter}) => {

    let nodeStyle = [
        "node",
        isStart ? "start" : "",
        isFinish ? "finish" : "",
        isVisitedAfter ? "visited" : ""
    ]

    return (
        <div className={nodeStyle.join(" ")}>
        </div>
    )
}

export default Node;