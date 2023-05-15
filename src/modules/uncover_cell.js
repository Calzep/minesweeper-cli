/* SDV503 Minesweeper game, uncover cell module
version 0.0, 04/05/2023
Caleb Eason

Module for uncovering cells on the game board thourgh user interaction*/

var gameBoard = [   //global variable, taken form board gen module
    { x: 1, y: 1, containsMine: false, state: 'flagged', minesNearby: 0 },
    { x: 1, y: 2, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 1, y: 3, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 2, y: 1, containsMine: false, state: 'flagged', minesNearby: 0 },
    { x: 2, y: 2, containsMine: false, state: 'uncovered', minesNearby: 0 },
    { x: 2, y: 3, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 3, y: 1, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 3, y: 2, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 3, y: 3, containsMine: false, state: 'covered', minesNearby: 0 }
  ]

function toggleFlag(x_input,y_input){
    arrIndex = gameBoard.map((element, index) => {
        if (element.x == x_input && element.y == y_input){
            return index
        }}).filter(element => element >=0)

    //check if the returned result is not undefined, 
    //if true continue to place flag
    if (Object.keys(arrIndex).length !== 0){
        //check the stae of the cell, toggle between covered and flagged
        //if the state is uncovered, then input will do nothing
        if(gameBoard[arrIndex].state === 'covered'){
            gameBoard[arrIndex].state = 'uncovered'
            console.log('call check_for_mine module')
        } 
    } else {
        //error trapping
        console.log('The value entered is outside of the game board!')
    }
}

let x = 2
let y = 2

toggleFlag(x,y)
console.log(gameBoard)