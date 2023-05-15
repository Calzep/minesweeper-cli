/* SDV503 Minesweeper game, display board module
version 3, 16/05/2023
Caleb Eason

Module to generate a visual display of the game board*/
const BOARD_DIMENSION = 5 //Specifies the amount of rows and columns in the board, hardcoded
var gameBoard = [   //global variable, taken form board gen module
{
  x: 1,
  y: 1,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: ' '
},
{
  x: 1,
  y: 2,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: ' '
},
{
  x: 1,
  y: 3,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: ' '
},
{
  x: 1,
  y: 4,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: ' '
},
{
  x: 1,
  y: 5,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: ' '
},
{
  x: 2,
  y: 1,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: ' '
},
{
  x: 2,
  y: 2,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: ' '
},
{
  x: 2,
  y: 3,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: ' '
},
{
  x: 2,
  y: 4,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: ' '
},
{
  x: 2,
  y: 5,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: ' '
},
{
  x: 3,
  y: 1,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: ' '
},
{
  x: 3,
  y: 2,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: ' '
},
{
  x: 3,
  y: 3,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: ' '
},
{
  x: 3,
  y: 4,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: ' '
},
{
  x: 3,
  y: 5,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: ' '
},
{
  x: 4,
  y: 1,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: ' '
},
{
  x: 4,
  y: 2,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: ' '
},
{
  x: 4,
  y: 3,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: '?'
},
{
  x: 4,
  y: 4,
  containsMine: false,
  state: 'covered',
  minesNearby: 3,
  display: '3'
},
{
  x: 4,
  y: 5,
  containsMine: false,
  state: 'covered',
  minesNearby: 2,
  display: '2'
},
{
  x: 5,
  y: 1,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: ' '
},
{
  x: 5,
  y: 2,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: 'X'
},
{
  x: 5,
  y: 3,
  containsMine: false,
  state: 'covered',
  minesNearby: 2,
  display: '2'
},
{
  x: 5,
  y: 4,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: '░'
},
{
  x: 5,
  y: 5,
  containsMine: false,
  state: 'covered',
  minesNearby: 0,
  display: '░'
}
]

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