/* SDV503 Minesweeper game, mine counter module
version 0.0, 04/05/2023
Caleb Eason

Module to count how many mines neighbour a cell and save the value to the cell object*/

var gameBoard = [ //global variable, taken form board gen module
    { x: 1, y: 1, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 1, y: 2, containsMine: true, state: 'covered', minesNearby: 0 },
    { x: 1, y: 3, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 2, y: 1, containsMine: true, state: 'covered', minesNearby: 0 },
    { x: 2, y: 2, containsMine: true, state: 'covered', minesNearby: 0 },
    { x: 2, y: 3, containsMine: true, state: 'covered', minesNearby: 0 },
    { x: 3, y: 1, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 3, y: 2, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 3, y: 3, containsMine: false, state: 'covered', minesNearby: 0 }
]
function countNearbyMines () {
    for (let i = 0; i < gameBoard.length; i++){
        
    }
}