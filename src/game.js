/* SDV503 Minesweeper game
version A.3, 16/05/2023
Caleb Eason*/

//ANCHOR Variables and Constants
const readline = require('node:readline/promises');
const {stdin: input, stdout: output} = require('node:process');

var boardDimension = 5 //Global variable Specifing the amount of rows and columns in the board
var gameBoard = []  //Global Variable for holding cell information

//Global values for the mimimum and maximum amount of mines that can generate
var minMines = 2 
var maxMines = 5

//Global variables for the characters used to represent items on the board.
var coveredDisp = ' '
var uncoveredDisp = '░'
var flaggedDisp = '?'
var mineDisp = 'X'

var showHelpText = true

//ANCHOR Functions

//ANCHOR Initialise Board
function initialiseBoard(){
    //iterate through each column
    for (let i = 0; i < boardDimension; i++){
        //iterate thorugh each row for column i
        for (let j = 0; j < boardDimension; j++){
            //Creates an object for each cell in the grid
            //x and y refer to the graphical position of each cell, state can be 'covered', 'uncovered' or flagged'
            gameBoard.push({x:i+1,y:j+1,containsMine:false,state:'covered',minesNearby:0,display:coveredDisp})
        }
    }
    return gameBoard
}

//ANCHOR Place Mines
function placeMines(){
    //Randomly calculate how any mines to place on the board
    let mineCount = Math.floor(Math.random() * (maxMines - minMines + 1)) + minMines
    //console.log('mineCount:',mineCount) //*for debugging

    //place mines on the board, iterates through the loop for each mines that needs to be placed
    for (let i = 0; i < mineCount; i++){
        //Loop to prevent placing multiple mines in the same cell
        while (true) {
            //generate a random x and y coordinate within range of the game board
            let x_candidate = Math.floor(Math.random() * (boardDimension)) + 1
            let y_candidate = Math.floor(Math.random() * (boardDimension)) + 1
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

//ANCHOR Count Nearby Mines
function countNearbyMines () {
    //Iterate over each cell in the board
    for (let i = 0; i < gameBoard.length; i++){
        let nearbyMines = 0         // Counter to keep track of mines
        let cx = gameBoard[i].x     //coords for current cell, c stands for current
        let cy = gameBoard[i].y
        //console.log('x,y:',cx,cy)   //*for debugging

        for (var j = -1; j <= 1; j++){
            for (let k = -1; k <= 1; k++){
                let arrIndex = gameBoard.map((element, index) => {
                    if (element.x == cx+j && element.y == cy+k){
                        return index
                    }}).filter(element => element >=0)
                //console.log(arrIndex)                       //*for debugging
                //console.log(gameBoard[arrIndex],'\n\n')     //*for debugging
                if (Object.keys(arrIndex).length !== 0){
                    if (gameBoard[arrIndex].containsMine == true){
                        nearbyMines++
                    }
                }
            }
        }
        //console.log(nearbyMines)    //*for debugging
        gameBoard[i].minesNearby = nearbyMines
    }
}

//ANCHOR Display Board
function displayBoard(){
    //clear space in the console beacuse console.clear() doesn't work in node
    console.log('\n'.repeat(20)) 
  
    //Create X axis key
    let xkey = '     1'
    for (let i = 2; i <= boardDimension; i++){
        xkey += `   ${i}`
    }
    console.log(xkey)
  
    //Create the top border of the board, use a for loop to create a variable amount of cells
    let startRow = '   ╔═══'
    //console.log(startRow)   //*for debugging
    for (let i = 1; i < boardDimension; i++){
        startRow += '╦═══'
        //console.log(startRow) //*for debugging
    }
    startRow += '╗'
    console.log(startRow)
  
    //Create each row of the grid and y axis key
    for (let i = 1; i < boardDimension; i++){
  
        //Create the left and right cell boarders
        let middleRow1 = ` ${i} ║ ${gameBoard[(i-1)*boardDimension].display} `
        for (let j = 1; j < boardDimension; j++){
            middleRow1 += `║ ${gameBoard[j+(i-1)*boardDimension].display} `
        }
        middleRow1 += '║'
        console.log(middleRow1)
  
        //create the top boarder of the next row        
        let middleRow2 = '   ╠═══'
        for (let j = 1; j < boardDimension; j++){
            middleRow2 += '╬═══'
        }
        middleRow2 += '╣'
        console.log(middleRow2)
    }
  
    //Create the left and right cell boarders of the final row
    let endRow1 = ` ${boardDimension} ║ ${gameBoard[(boardDimension**2-boardDimension)].display} `
    for (let i = 1; i < boardDimension; i++){
        endRow1 += `║ ${gameBoard[(boardDimension**2-boardDimension)+i].display} `
    }
    endRow1 += '║'
    console.log(endRow1)
  
    //Create bottom boarder of the final row
    let endRow2 = '   ╚═══'
    for (let i = 1; i < boardDimension; i++){
        endRow2 += '╩═══'
    }
    endRow2 += '╝'
    console.log(endRow2)
}

//ANCHOR Check for Mine
function checkForMine(x_input,y_input){
    //locates the index of the cell that has the inputted x and y values
    arrIndex = gameBoard.map((element, index) => {
        if (element.x == x_input && element.y == y_input){
            return index
        }}).filter(element => element >=0)
    
    //check if the returned result is not undefined, 
    //if true return the value of contains mine for the selected cell
    if (Object.keys(arrIndex).length !== 0){
        if (gameBoard[arrIndex].containsMine === true){
            console.log('game lost, ending game')   //TODO - LOGIC FOR BREAKING LOOP NEEDED
            gameBoard[arrIndex].display = mineDisp
        }
    } else {
        console.log('The value entered is outside of the game board!')  //REVIEW - This behaviour may be duplicated
    }
    
}

//ANCHOR Uncover Cell
function uncoverCell(x_input,y_input){
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
            if (gameBoard[arrIndex].minesNearby > 0){
                gameBoard[arrIndex].display = gameBoard[arrIndex].minesNearby
            } else {
                gameBoard[arrIndex].display = uncoveredDisp
                recursiveUncover(x_input,y_input)
            }
            checkForMine(x_input,y_input)
        } 
    } else {
        //error trapping
        console.log('The value entered is outside of the game board!')
    }
}

//ANCHOR Recursive Uncover
function recursiveUncover(x,y){
    for (var i = -1; i <= 1; i++){
        for (let j = -1; j <= 1; j++){
            let arrIndex = gameBoard.map((element, index) => {
                if (element.x == x+i && element.y == y+j){
                    return index
                }}).filter(element => element >=0)
            //console.log(arrIndex)                       //*for debugging
            //console.log(gameBoard[arrIndex],'\n\n')     //*for debugging
            if (Object.keys(arrIndex).length !== 0){
                uncoverCell(x+i,y+j)
            }
        }
    }
}
//ANCHOR Toggle Flag
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
        if (gameBoard[arrIndex].state === 'covered'){
            gameBoard[arrIndex].state = 'flagged'
            gameBoard[arrIndex].display = flaggedDisp
        } 
        else if (gameBoard[arrIndex].state === 'flagged'){
            gameBoard[arrIndex].state = 'covered'
            gameBoard[arrIndex].display = coveredDisp
        }
    } else {
        //error trapping
        console.log('The value entered is outside of the game board!')
    }
}

//ANCHOR Check Win Conditions
function checkWinCondition(){
    let gamefinished = true
    //Iterate through each cell to check if it either contains a mine or has been uncovered
    for (let i = 0; i < gameBoard.length; i++){
        //If at any point a cell is found that is covered and does not contain a mine the loop will break
        if(!(gameBoard[i].state === 'uncovered' || gameBoard[i].containsMine === true)){
            gamefinished = false
            console.log('win conditions not met')   //*for debugging
            break
        }
    }
    //If the for loop is not broken then the game is won
    if (gamefinished === true){
        console.log('game won, ending game')    //TODO - LOGIC FOR ENDING GAME NEEDED
    }
}

//ANCHOR User Input
const getInput = async (prompt = '>') => {
    //Get user input through the readline module
    const rl = readline.createInterface({input,output});
    let userInput = await rl.question(prompt);
    rl.close();
    
    return userInput;
}

//ANCHOR Game Settings  //TODO - This is broken.  Selection doesn't work
async function settings(){
    console.log('|--- Game Settings ---|');  //*for debugging
    console.log(`
    To change the board size, type 'change_size'
    To change the amount of mines on the board, type 'change_mine_count'
    To customise the game's iconography, type 'change_icons'
    
    To exit this menu, type 'exit' or 'e'`);
    let userInput = await getInput();
    
    if (userInput.toLowerCase() === 'exit' || userInput.toLowerCase() === 'e'){}
    else if (userInput.toLowerCase() === 'change_size'){
        await (async function changeSize(){
            let userInput = await getInput('Enter the new board dimension\n');
            if (typeof userInput == 'number' && userInput > 0){
                boardDimension = userInput
                await settings()
            } else {
                console.log('Invalid input, input must be a number greater than 0!')
                await changeSize
            }
        })
    }
    else if (userInput.toLowerCase() === 'change_mine_count'){
        await (async function changeMinMines(){
            let userInput = await getInput('Enter the mimimum number of mines the game should generate\n');
            if (typeof userInput == 'number' && userInput > 0){
                minMines = userInput
                await settings()
            } else {
                console.log('Invalid input, input must be a number greater than 0!')
                await changeMinMines()
            }
        })
        await (async function changeMaxMines(){
            let userInput = await getInput('Enter the maximum number of mines the game should generate\n');
            if (typeof userInput == 'number' && userInput > minMines && userInput < boardDimension){
                maxMines = userInput
                await settings()
            } else if (maxMines < minMines) {
                console.log(`Invalid input, the maximum amount of mines can not be less than the mimimum (${minMines})!`)
                await changeMaxMines()
            } else if (maxMines >= boardDimension**2) {
                console.log(`Invalid input, the maximum amount of mines can not be greater than or eqaul to the amount of cells on the board (${boardDimension**2})!`)
                await changeMaxMines()
            } else {
                console.log('Invalid input, input must be a number greater than 0!')
                await changeMinMines()
            }
        })
    }
    else if (userInput.toLowerCase() === 'change_icons'){
        await (async function changeIcon1(){
            let userInput = await getInput('Enter the icon to represent covered cells\n');
            if (userInput.length() === 1){
                coveredDisp = userInput
            } else {
                console.log('Invalid input, input must be exactly 1 character in length!')
                await changeIcon1()
            }
        })
        await (async function changeIcon2(){
            let userInput = await getInput('Enter the icon to represent uncovered cells\n');
            if (userInput.length() === 1){
                uncoveredDisp = userInput
            } else {
                console.log('Invalid input, input must be exactly 1 character in length!')
                await changeIcon2()
            }
        })
        await (async function changeIcon3(){
            let userInput = await getInput('Enter the icon to represent flagged cells\n');
            if (userInput.length() === 1){
                flaggedDisp = userInput
            } else {
                console.log('Invalid input, input must be exactly 1 character in length!')
                await changeIcon3()
            }
        })
        await (async function changeIcon4(){
            let userInput = await getInput('Enter the icon to represent a mine\n');
            if (userInput.length() === 1){
                mineDisp = userInput
                await changeIcon4()
            } else {
                console.log('Invalid input, input must be exactly 1 character in length!')
            }
        })
        await settings()
    } else {
        console.log('Invalid input!')
        await settings()
    }

}

//ANCHOR Begin Game
async function begin(){
    console.log(`
    To begin the game, press ENTER
    To change game settings, type 'settings' or 's'
    To display instructions, type 'help' or 'h'\n`);
    //Retrieve user input with getInput funciton
    let userInput = await getInput();

    if (userInput.toLowerCase() == ''){
        //console.log('Starting Game')    //*for debugging
    }
    else if (userInput.toLowerCase() === 'settings' || userInput.toLowerCase() === 's'){
        //open the settings menu from the settings function
        await settings()
        await begin()

    }
    else if (userInput.toLowerCase() === 'help' || userInput.toLowerCase() === 'h'){
        console.log('displaying help')  //*for debugging
    } else {
        console.log('\nInvalid input!')
        await begin()
    }
}

//ANCHOR Root Loop
async function root (){
    //ANCHOR Initialisation
    console.log('\n\nWelcome to Minesweeper');
    await begin();
    gameBoard = initialiseBoard();
    placeMines();
    countNearbyMines();
    console.log('welcome stuff');    //TODO - ADD WELCOME LOGIC, COMMANDS, CUSTOMISATION
    
    //ANCHOR Gameplay loop
    gameplay: while (true){
        displayBoard();     //TODO - ADD USER INPUT HERE
        //console.log(gameBoard)    //*for debugging
        console.log('input stuff here');
        //uncoverCell(x,y)
        //toggleFlag(x,y)
        //checkWinCondition()
        break
    }
    //TODO - ADD END GAME LOGIC
}

root()