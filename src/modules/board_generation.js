/* SDV503 Minesweeper game, board generation module
version 0.0, 04/05/2023
Caleb Eason

Module to generate and display a 9 by 9 minesweeper game board*/

//Variables and Constants
const BOARD_DIMENSION = 3 //Specifies the amount of rows and columns in the board, hardcoded

function initialiseBoard(dimension){
    let gameBoard = []
    for (let i = 0; i < dimension; i++){
        gameBoard.push([])
        for (let j = 0; j <dimension; j++){
            gameBoard[i].push(j+1+i*dimension)
        }
    }
    return gameBoard
    
}

const gameBoard = initialiseBoard(BOARD_DIMENSION)
console.log(gameBoard)