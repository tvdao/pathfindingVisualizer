/**
 * Filename: Header.jsx
 * Author: Tri Dao
 * Date: 4/28/21
 * 
 * Summary of File:
 *      This file is the Header componenet. It displays the header of the file
 * which contains the different options of interacting with the grid.
 */

import React from "react";
import "./Header.css";

/**
 * Creates the header of the website. Allows the user to interact
 * with the grid by deciding the algorithm that will be displayedd
 * 
 * @param visualize - Visualize method passed down in order to be 
 *                    called when a div is clicked on
 * @param clearGrid - ClearGrid method passed down to be called when 
 *                    clearGrid div is clicked on
 * @param clearWall - ClearWall method passed down to be called when 
 *                    clearWall div is clicked on
 * 
 * @returns The header componenet
 */
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