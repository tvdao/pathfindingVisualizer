const initialGrid = () => {
    let grid = [];
    for (let row = 0; row < 20; row++) {
        grid.push([]);
        for (let col = 0; col < 40; col++) {
            grid[row].push({
                row: row,
                col: col,
                isWall: false,
                prevNode: null,
                isStart: (row === 10 && col === 10) ? true : false,
                isFinish: (row === 10 && col === 30) ? true : false,
                isVisited: false,
                isVisitedAfter: false,
                startToEnd: false,
                distance: Infinity,
            })
        }
    }
    return grid;
}

export {initialGrid}