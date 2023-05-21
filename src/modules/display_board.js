/* SDV503 Minesweeper game, display board module
version 3, 16/05/2023
Caleb Eason

Module to generate a visual display of the game board*/
const BOARD_DIMENSION = 20 //Specifies the amount of rows and columns in the board, hardcoded
var gameBoard = []
//ANCHOR Initialise Board
function initialiseBoard(){
  //iterate through each column
  for (let i = 0; i < BOARD_DIMENSION; i++){
      //iterate thorugh each row for column i
      for (let j = 0; j < BOARD_DIMENSION; j++){
          //Creates an object for each cell in the grid
          //x and y refer to the graphical position of each cell, state can be 'covered', 'uncovered' or flagged'
          gameBoard.push({x:i+1,y:j+1,containsMine:false,state:'covered',minesNearby:0,display:' '})
  }}
  return gameBoard
}
gameBoard = initialiseBoard()
function displayBoard(){
  //clear space in the console beacuse console.clear() doesn't work in node
    console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n') 

    //Create X axis key
    let xkey = '     1'
    for (let i = 2; i <= BOARD_DIMENSION; i++){
      xkey += `   ${i}`
    }
    console.log(xkey)

    //Create the top border of the board, use a for loop to create a variable amount of cells
    let startRow = '   ╔═══'
    //console.log(startRow)   //*for debugging
    for (let i = 1; i < BOARD_DIMENSION; i++){
        startRow += '╦═══'
        //console.log(startRow) //*for debugging
    }
    startRow += '╗'
    console.log(startRow)

    //Create each row of the grid and y axis key
    for (let i = 1; i < BOARD_DIMENSION; i++){

        //Create the left and right cell boarders
        let middleRow1 = ` ${i} ║ ${gameBoard[(i-1)*BOARD_DIMENSION].display} `
        for (let j = 1; j < BOARD_DIMENSION; j++){
            middleRow1 += `║ ${gameBoard[j+(i-1)*BOARD_DIMENSION].display} `
        }
        middleRow1 += '║'
        console.log(middleRow1)

        //create the top boarder of the next row        
        let middleRow2 = '   ╠═══'
        for (let j = 1; j < BOARD_DIMENSION; j++){
            middleRow2 += '╬═══'
        }
        middleRow2 += '╣'
        console.log(middleRow2)
        
    }

    //Create the left and right cell boarders of the final row
    let endRow1 = ` ${BOARD_DIMENSION} ║ ${gameBoard[(BOARD_DIMENSION**2-BOARD_DIMENSION)].display} `
    for (let i = 1; i < BOARD_DIMENSION; i++){
        endRow1 += `║ ${gameBoard[(BOARD_DIMENSION**2-BOARD_DIMENSION)+i].display} `
    }
    endRow1 += '║'
    console.log(endRow1)

    //Create bottom boarder of the final row
    let endRow2 = '   ╚═══'
    for (let i = 1; i < BOARD_DIMENSION; i++){
        endRow2 += '╩═══'
    }
    endRow2 += '╝'
    console.log(endRow2)

}


displayBoard()