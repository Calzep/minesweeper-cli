/* SDV503 Minesweeper game, mine counter module
version 1.0, 15/05/2023
Caleb Eason

Module to count how many mines neighbour a cell and save the value to the cell object*/

var gameBoard = [ //global variable, taken form board gen module
    { x: 1, y: 1, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 1, y: 2, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 1, y: 3, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 2, y: 1, containsMine: true, state: 'covered', minesNearby: 0 },
    { x: 2, y: 2, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 2, y: 3, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 3, y: 1, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 3, y: 2, containsMine: true, state: 'covered', minesNearby: 0 },
    { x: 3, y: 3, containsMine: true, state: 'covered', minesNearby: 0 }
]

function countNearbyMines () {
    //Iterate over each cell in the board
    for (let i = 0; i < gameBoard.length; i++){
        let nearbyMines = 0         // Counter to keep track of mines
        let cx = gameBoard[i].x     //coords for current cell, c stands for current
        let cy = gameBoard[i].y
        //console.log('x,y:',cx,cy)   //*for debugging

        for (var j = -1; j <= 1; j++){
            for (let k = -1; k <= 1; k++){
                let arrIndex = gameBoard.map((element, index) => {
                    if (element.x == cx+j && element.y == cy+k){
                        return index
                    }}).filter(element => element >=0)
                //console.log(arrIndex)                       //*for debugging
                //console.log(gameBoard[arrIndex],'\n\n')     //*for debugging
                if (Object.keys(arrIndex).length !== 0){
                    if (gameBoard[arrIndex].containsMine == true){
                        nearbyMines++
                    }
                }
            }
        }
        //console.log(nearbyMines)    //*for debugging
        gameBoard[i].minesNearby = nearbyMines
    }
}

countNearbyMines()
console.log(gameBoard)