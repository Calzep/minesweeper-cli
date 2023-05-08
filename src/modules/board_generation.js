/* SDV503 Minesweeper game, board generation module
version 0.0, 04/05/2023
Caleb Eason

Module to generate and display a 9 by 9 minesweeper game board*/

//Variables and Constants
const BOARD_DIMENSION = 3 //Specifies the amount of rows and columns in the board, hardcoded
var gameBoard = []  //Global Variable for holding cell information

function initialiseBoard(dimension){
    //iterate through each column
    for (let i = 0; i < dimension; i++){
        //iterate thorugh each row for column i
        for (let j = 0; j < dimension; j++){
            //Creates an object for each cell in the grid
            //x and y refer to the graphical position of each cell, state can be 'covered', 'uncovered' or flagged'
            gameBoard.push({x:i+1,y:j+1,containsMine:false,state:'covered',minesNearby:0})
        }
    }
    return gameBoard
}

gameBoard = initialiseBoard(BOARD_DIMENSION)
console.log(gameBoard)