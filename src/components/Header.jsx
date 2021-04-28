import React from "react";
import "./Header.css";

const Header = ({visualize, clearGrid, clearWall}) => {
    return (
        <div className="head">
        <header>
            <div className="wrapper">
            <div className="logo">
                <h1>Pathfinding Visualizer</h1>
            </div>
            <nav>
                <div className="nav-button" onClick={() => visualize("bfs")}>BFS</div>
                <div className="nav-button" onClick={() => visualize("dfs")}>DFS</div>
                <div className="nav-button" onClick={() => visualize("dijkstra")}>Dijkstra</div>
                <div className="nav-button" onClick={() => clearWall()}>Clear Walls</div>
                <div className="nav-button" onClick={() => clearGrid()}>Clear Grid</div>
            </nav>
            </div>
        </header>
        </div>
    )
}

export default Header;