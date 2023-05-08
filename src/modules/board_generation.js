/* SDV503 Minesweeper game, board generation module
version 0.0, 04/05/2023
Caleb Eason

Module to generate and display a 9 by 9 minesweeper game board*/

//Variables and Constants
const BOARD_DIMENSION = 2 //Specifies the amount of rows and columns in the board, hardcoded

function initialiseBoard(dimension){
    let gameBoard = []
    //iterate through each row
    for (let i = 0; i < dimension; i++){
        //iterate thorugh each column for row i
        for (let j = 0; j < dimension; j++){
            //Creates an object for each cell in the grid
            //x and y refer to the graphical position of each cell, state can be 'covered', 'uncovered' or flagged'
            gameBoard.push({x:i+1,y:j+1,containsMine:false,state:'covered',minesNearby:0})
        }
    }
    return gameBoard
}

const gameBoard = initialiseBoard(BOARD_DIMENSION)
console.log(gameBoard)