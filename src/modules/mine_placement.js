/* SDV503 Minesweeper game, mine placement module
version 0.0, 04/05/2023
Caleb Eason

Module to randomly place mines on the game board*/

//Variables and Constants

const BOARD_DIMENSION = 3 //Specifies the amount of rows and columns in the board, hardcoded

const MIN_MINES = 2 //Hardcoded values for the mimimum and maximum amount of mines that can generate
const MAX_MINES = 5

var gameBoard = [   //global variable, taken form board gen module
    { x: 1, y: 1, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 2, y: 1, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 3, y: 1, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 1, y: 2, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 2, y: 2, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 3, y: 2, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 1, y: 3, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 2, y: 3, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 3, y: 3, containsMine: false, state: 'covered', minesNearby: 0 }
  ]


function placeMines(min,max,dimension){
    //Randomly calculate how any mines to place on the board
    let mineCount = Math.floor(Math.random() * (max - min + 1)) + min
    console.log('mineCount:',mineCount) //*for debugging

    //place mines on the board, iterates through the loop for each mines that needs to be placed
    for (let i = 0; i < mineCount; i++){
        //Loop to prevent placing multiple mines in the same cell
        outerLoop: while (true) {
            //generate a random x and y coordinate within range of the game board
            let x_candidate = Math.floor(Math.random() * (dimension)) + 1
            let y_candidate = Math.floor(Math.random() * (dimension)) + 1
            //console.log('x and y candidate:',x_candidate,y_candidate) //*for debugging
            
            //Iterate through the game board until a cell is found with matching x and y values to x_candidate and y_candidate
            for (let i = 0; i < gameBoard.length; i++){
                if (gameBoard[i].x == x_candidate && gameBoard[i].y == y_candidate) {
                    //console.log('matched cell',gameBoard[i],'\n')   //*for debugging

                    //When a matching cell is found, check if it already contains a mine
                    //If there is not already a mine in the cell, a new mine will be placed and the while loop will break,
                    //otherwise the mine will not be placed and new cooridanates will be generated
                    if (gameBoard[i].containsMine == false){
                        gameBoard[i].containsMine = true
                        //console.log('loop broken, cell value:',gameBoard[i],'\n') //*for debugging
                        break outerLoop
                    }
                    
                }
            }
        }
    }
}

placeMines(MIN_MINES,MAX_MINES,BOARD_DIMENSION)
console.log(gameBoard)