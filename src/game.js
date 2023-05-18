/* SDV503 Minesweeper game
version 1, 18/05/2023
Caleb Eason*/

//ANCHOR Packages, Variables and Constants
var readlineSync = require('readline-sync');

var gameState   //Variable for holding the current game state.  Can be 'start', 'ongoing', 'win' or 'loss'

var boardDimension = 5 //Global variable Specifing the amount of rows and columns in the board
var gameBoard = []  //Global Variable for holding cell information
var minMines = 2    //Global values for the mimimum and maximum amount of mines that can generate
var maxMines = 5

//Global variables for the characters used to represent items on the board.
var coveredDisp = ' '
var uncoveredDisp = '░'
var flaggedDisp = '?'
var mineDisp = 'X'


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
        while (true) {  //REVIEW - THIS IS INNEFICIENT AND CAN LAST FORWEVER ON LARGER BAORDS
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
    for (let i = 2; i <= boardDimension && i <10; i++){
        xkey += `   ${i}`
    }
    
    //When the value of I reaches 2 digits, the indentation between each number needs to be reduced
    for (let i = 10; i <= boardDimension; i++){
        xkey += `  ${i}`
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
    for (let i = 1; i < boardDimension && i < 10; i++){
  
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

    //Once i reaches double digits the indentation needs to be changed
    for (let i = 10; i < boardDimension; i++){
  
        //Create the left and right cell boarders
        let middleRow1 = `${i} ║ ${gameBoard[(i-1)*boardDimension].display} `
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
let endRow1
    if (boardDimension < 10){
        endRow1 = ` ${boardDimension} ║ ${gameBoard[(boardDimension**2-boardDimension)].display} `
    } else {
        //if the board size is over 2 digits the indentation needs to be modified
        endRow1 = `${boardDimension} ║ ${gameBoard[(boardDimension**2-boardDimension)].display} `
    }
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
            if (gameState == 'start'){
                gameBoard[arrIndex].containsMine = false
                minMines = 1
                maxMines = 1
                gameBoard[arrIndex].state = 'covered'
                //console.log('moving mine')  //*for debugging
                placeMines()
                uncoverCell(x_input,y_input)
            } else {
                gameBoard[arrIndex].display = mineDisp
                gameState = 'loss'
                displayBoard();
            }
        }
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
        console.log('\nThe value entered is outside of the game board!')
        readlineSync.question('Press ENTER to conintue\n>')
    }
}

//ANCHOR Recursive Uncover
function recursiveUncover(x,y){
    //console.log('running recursive')    //*for debugging
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
            //console.log('win conditions not met')   //*for debugging
            break
        }
    }
    //If the for loop is not broken then the game is won
    if (gamefinished === true){
        gameState = 'win'
        displayBoard()
    }
}


//ANCHOR Game Settings
function settings(){
    console.log(`
    To change the board size, type 'change_size'
    To change the amount of mines on the board, type 'change_mine_count'
    To customise the game's iconography, type 'change_icons'
    
    To exit this menu, type 'exit' or 'e'`);
    let userInput = readlineSync.question(">")
    
    if (userInput.toLowerCase() === 'exit' || userInput.toLowerCase() === 'e'){
        if (boardDimension**2 <= maxMines){
            console.log(`\n
            Warning: the game board is too small to accomodate the current mine count settings!
            To continue, you will need to reduce the mine count, or increase the board size!`)
            settings()
        }
        else{console.log('\n|--- Main Menu ---|')}
    }
    else if (userInput.toLowerCase() === 'change_size'){
        function changeSize(){
            let userInput = readlineSync.question("Enter the new board dimension\n");
            if (userInput > 0 && userInput**2 >maxMines && userInput < 100){
                boardDimension = userInput
                console.log('\nChanged the board size to',boardDimension)
                settings()
            }
            else if (userInput**2 <= maxMines && userInput.length > 0){
                boardDimension = userInput
                console.log(`\nChanged the board size to ${boardDimension}

                Warning: the game board is now too small to accomodate the current mine count settings!
                To continue, you will need to reduce the mine count!`)
                settings()
            }
            else if (userInput >= 100){
                console.log("Come on, you're not solving a board that big.  Enter a smaller size.\n")
                changeSize()
            }else {
                console.log('\nInvalid input, input must be a number greater than 0!\n')
                changeSize()
            }
        }
        changeSize()
    }
    else if (userInput.toLowerCase() === 'change_mine_count'){
        function changeMinMines(){
            let userInput = readlineSync.question('Enter the mimimum number of mines the game should generate\n');
            if (userInput > 0 && userInput < boardDimension**2){
                minMines = userInput
                console.log('\nChanged the minimum number of mines generated to',minMines,'\n')
            } 
            else if (userInput >= boardDimension**2) {
                console.log(`Invalid input, the minimum amount of mines can not be greater than or eqaul to the amount of cells on the board (${boardDimension**2})!\n`)
                changeMinMines()
            }else {
                console.log('Invalid input, input must be a number greater than 0!\n')
                changeMinMines()
            }
        }
        changeMinMines()
        function changeMaxMines(){
            let userInput = readlineSync.question('Enter the maximum number of mines the game should generate\n');
            if (userInput >= minMines && userInput < boardDimension**2){
                maxMines = userInput
                console.log('\nChanged the maximum number of mines generated to',maxMines)
                settings()
            } else if (userInput < minMines) {
                console.log(`Invalid input, the maximum amount of mines can not be less than the mimimum (${minMines})!\n`)
                changeMaxMines()
            } else if (userInput >= boardDimension**2) {
                console.log(`Invalid input, the maximum amount of mines can not be greater than or eqaul to the amount of cells on the board (${boardDimension**2})!\n`)
                changeMaxMines()
            } else {
                console.log('Invalid input, input must be a number greater than 0!\n')
                changeMaxMines()
            }
        }
        changeMaxMines()
    }
    else if (userInput.toLowerCase() === 'change_icons'){
        function changeIcon1(){
            let userInput = readlineSync.question('Enter the icon to represent covered cells\n');
            if (userInput.length === 1){
                coveredDisp = userInput
                console.log('\nChanged the icon for covered cells to',coveredDisp,'\n')
            } else {
                console.log('Invalid input, input must be exactly 1 character in length!\n')
                changeIcon1()
            }
        }
        changeIcon1()
        function changeIcon2(){
            let userInput = readlineSync.question('Enter the icon to represent uncovered cells\n');
            if (userInput.length === 1){
                uncoveredDisp = userInput
                console.log('\nChanged the icon for uncovered cells to',uncoveredDisp,'\n')
            } else {
                console.log('Invalid input, input must be exactly 1 character in length!\n')
                changeIcon2()
            }
        }
        changeIcon2()
        function changeIcon3(){
            let userInput = readlineSync.question('Enter the icon to represent flagged cells\n');
            if (userInput.length === 1){
                flaggedDisp = userInput
                console.log('\nChanged the icon for flagged cells to',flaggedDisp,'\n')
            } else {
                console.log('Invalid input, input must be exactly 1 character in length!\n')
                changeIcon3()
            }
        }
        changeIcon3()
        function changeIcon4(){
            let userInput = readlineSync.question('Enter the icon to represent a mine\n');
            if (userInput.length === 1){
                mineDisp = userInput
                console.log('\nChanged the icon for mines to',mineDisp,'\n')
                
            } else {
                console.log('Invalid input, input must be exactly 1 character in length!\n')
                changeIcon4()
            }
        }
        changeIcon4()
        settings()
    } else {
        console.log('Invalid input!\n')
        settings()
    }

}

//ANCHOR Begin Game
function begin(){
    console.log(`
    To begin the game, press ENTER
    To change game settings, type 'settings' or 's'\n`);
    //Retrieve user input with getInput function
    let userInput = readlineSync.question('>')

    if (userInput.toLowerCase() == ''){
        //console.log('Starting Game')    //*for debugging
    }
    else if (userInput.toLowerCase() === 'settings' || userInput.toLowerCase() === 's'){
        //open the settings menu from the settings function
        console.log('\n'.repeat(20))    //Clear console
        console.log('|--- Game Settings ---|');
        settings()
        begin()

    }
    /*For expanding functionality in the future.  Would open a small instruction manual
    else if (userInput.toLowerCase() === 'help' || userInput.toLowerCase() === 'h'){
        console.log('displaying help')  //*for debugging
    }*/ 
    else {
        //error trapping
        console.log('\nInvalid input!')
        begin()
    }
}

//ANCHOR Select Action
function selectAction(){
    function getX(){
        let userInput = readlineSync.question('Enter x coordinate:  ')
        if (userInput > 0){
            return userInput
        } else {
            console.log("\nInvalid input!  Input must be a number greater than 0\n")
            getX()
        }
    }
    let x = Number(getX())
    function getY(){
        let userInput = readlineSync.question('Enter y coordinate:  ')
        if (userInput > 0){
            return userInput
        } else {
            console.log("\nInvalid input!  Input must be a number greater than 0\n")
            getY()
        }
    }
    let y = Number(getY())
    function getAction(){
        let userInput = readlineSync.question('Select an Action:  ')
        if (userInput.toLowerCase() == 'flag' || userInput.toLowerCase() == 'f'){
            toggleFlag(y,x)
        }
        else if (userInput.toLowerCase() == 'uncover' || userInput.toLowerCase() == 'u'){
            uncoverCell(y,x)
        } else {
            console.log(`\nInvalid input!  Valid inputs are:
            'flag'     - places/removes flag
            'f'        - places/removes flag
            'uncover'  - reveals a tile
            'u'        - reveals a tile\n`)
            getAction()
        }
    }
    getAction(x,y)
}

//ANCHOR Root Loop
function root (){
    //ANCHOR Initialisation
    console.log('\n\nWelcome to Minesweeper');
    gameState = 'start'
    begin();
    gameBoard = []
    gameBoard = initialiseBoard();
    placeMines();
    countNearbyMines();
    //console.log(gameBoard)  //*for debugging
    //clear space in the console beacuse console.clear() doesn't work in node
    console.log('\n'.repeat(20))
    console.log(`Welcome to minesweeper.\n
    To play, start by slecting the x and y coordinates of the tile you want to interact with.
    Once you have selected a tile, You can type 'flag' or 'f' to place or remove a marker flag, 
    or you can type 'uncover' or 'u' to reveal the tile.\n\n`);
    readlineSync.question('press ENTER to conintue\n>')
    //ANCHOR Gameplay loop
    while (true){
        displayBoard();
        //console.log(gameBoard)    //*for debugging
        selectAction()
        checkWinCondition()
        if (gameState == 'win'){
            console.log('\nYou win!  Congratulations!\n')
            break
        }
        else if (gameState == 'loss'){
            console.log('\nYou lose!  You detonated a mine!\n')
            break
        }
        gameState = 'ongoing'
    }
    function playAgain(){
        replay = readlineSync.question('Would you like to play again? [y/n]\n>')
        if (replay.toLowerCase() == 'y' || replay.toLowerCase() == 'yes'){
            root()
        }
        else if (replay.toLowerCase() == 'n' || replay.toLowerCase() == 'no'){}
        else {
            console.log(`Invalid input!  Enter either 'y', 'yes','n' or 'no'`)
        }
    }
    playAgain()
}

root()