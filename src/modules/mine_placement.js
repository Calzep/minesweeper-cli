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
    { x: 1, y: 2, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 1, y: 3, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 2, y: 1, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 2, y: 2, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 2, y: 3, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 3, y: 1, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 3, y: 2, containsMine: false, state: 'covered', minesNearby: 0 },
    { x: 3, y: 3, containsMine: false, state: 'covered', minesNearby: 0 }
  ]


function placeMines(min,max,dimension){
    //Randomly calculate how any mines to place on the board
    let mineCount = Math.floor(Math.random() * (max - min + 1)) + min
    //console.log('mineCount:',mineCount) //*for debugging

    //place mines on the board, iterates through the loop for each mines that needs to be placed
    for (let i = 0; i < mineCount; i++){
        //Loop to prevent placing multiple mines in the same cell
        while (true) {
            //generate a random x and y coordinate within range of the game board
            let x_candidate = Math.floor(Math.random() * (dimension)) + 1
            let y_candidate = Math.floor(Math.random() * (dimension)) + 1
            //console.log('x and y candidate:',x_candidate,y_candidate) //*for debugging
            
            /*find the index of an object whose x and y values match those of x_candidate and y_candidate.

            maps the property values for each object in the list into an array, then iterates over the list, checking
            if the values of x and y match x_candidate and y_candidate.  When a match is found, the index of the 
            matching object is returned, otherwise undefined is returned.  The filter funciton removes the undefined values*/
            arrIndex = gameBoard.map((element, index) => {
                if (element.x == x_candidate && element.y == y_candidate){
                    return index
                }}).filter(element => element >=0)
            //console.log('matched cell',gameBoard[arrIndex],'\n')   //*for debugging

            //Checks if the matched cell contains a mine.  If it doesn't, a mine is placed and the loop is broken
            //if there is already a mine present, the loop repeats and a new set of coordinates are generated
            if (gameBoard[arrIndex].containsMine == false){
                gameBoard[arrIndex].containsMine = true
                //console.log('loop broken, cell value:',gameBoard[arrIndex],'\n') //*for debugging
                break
            }
        }
    }
}

placeMines(MIN_MINES,MAX_MINES,BOARD_DIMENSION)
console.log(gameBoard)