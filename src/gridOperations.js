const initialGrid = () => {
    let grid = [];
    for (let row = 0; row < 20; row++) {
        grid.push([]);
        for (let col = 0; col < 70; col++) {
            grid[row].push({
                row: row,
                col: col,
                isWall: false,
                prevNode: null,
                isStart: (row === 10 && col === 15) ? true : false,
                isFinish: (row === 10 && col === 55) ? true : false,
                isVisited: false,
                isVisitedAfter: false
            })
        }
    }
    return grid;
}

export {initialGrid}