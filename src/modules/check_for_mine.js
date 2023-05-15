/* SDV503 Minesweeper game, check for mine module
version 0.0, 04/05/2023
Caleb Eason

Module to check if a cell contains a mine and displays the result*/
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

function checkForMine(x_input,y_input){
    //locates the index of the cell that has the inputted x and y values
    arrIndex = gameBoard.map((element, index) => {
        if (element.x == x_input && element.y == y_input){
            return index
        }}).filter(element => element >=0)
    
    //check if the returned result is not undefined, 
    //if true return the value of contains mine for the selected cell
    if (Object.keys(arrIndex).length !== 0){
        return gameBoard[arrIndex].containsMine
    } else {
        return 'The value entered is outside of the game board!'
    }
    
}

let x = 1
let y = 3

console.log(checkForMine(x,y))