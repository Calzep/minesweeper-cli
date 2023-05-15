/* SDV503 Minesweeper game, display board module
version 1.0, 15/05/2023
Caleb Eason

Module to generate a visual display of the game board*/
const BOARD_DIMENSION = 3 //Specifies the amount of rows and columns in the board, hardcoded
var gameBoard = [   //global variable, taken form board gen module
    { x: 1, y: 1, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 1, y: 2, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 1, y: 3, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 2, y: 1, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 2, y: 2, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 2, y: 3, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 3, y: 1, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 3, y: 2, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 3, y: 3, containsMine: false, state: 'covered', minesNearby: 0 }
  ]

function displayBoard(){
    console.clear() //clear space in the console

    //Create the top border of the board, use a for loop to create a variable amount of cells
    let startRow = '╔════'
    //console.log(startRow)   //*for debugging
    for (let i = 1; i < BOARD_DIMENSION; i++){
        startRow += '╦════'
        //console.log(startRow) //*for debugging
    }
    startRow += '╗'
    console.log(startRow)

    //Create each row of the grid
    for (let i = 1; i < BOARD_DIMENSION; i++){

        //Create the left and right cell boarders
        let middleRow1 = '║    '
        for (let i = 1; i < BOARD_DIMENSION; i++){
            middleRow1 += '║    '
        }
        middleRow1 += '║'
        console.log(middleRow1)

        //create the top boarder of the next row        
        let middleRow2 = '╠════'
        for (let i = 1; i < BOARD_DIMENSION; i++){
            middleRow2 += '╬════'
        }
        middleRow2 += '╣'
        console.log(middleRow2)
        
    }

    //Create the left and right cell boarders of the final row
    let endRow1 = '║    '
    for (let i = 1; i < BOARD_DIMENSION; i++){
        endRow1 += '║    '
    }
    endRow1 += '║'
    console.log(endRow1)

    //Create bottom boarder of the final row
    let endRow2 = '╚════'
    for (let i = 1; i < BOARD_DIMENSION; i++){
        endRow2 += '╩════'
    }
    endRow2 += '╝'
    console.log(endRow2)

}


displayBoard()