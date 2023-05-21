/* SDV503 Minesweeper game
version 1.1, 19/05/2023
Caleb Eason

THIS PROGRAM IS DEPENDANT ON THE SYNCRONOUS READLINE MOUDLE
The module has been included in the node_modules file.  To install, use 'npm install'.
If this doesn't work visit 'https://www.npmjs.com/package/readline-sync' to install manually*/

//ANCHOR Packages, Variables and Constants
var readlineSync = require('readline-sync');

var gameState   //Variable for holding the current game state.  Can be 'start', 'ongoing', 'win' or 'loss'

var boardDimension = 3 //Global variable Specifing the amount of rows and columns in the board
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
    }}
    return gameBoard
}

//ANCHOR Place Mines
function placeMines(){
    //Randomly calculate how any mines to place on the board
    let mineCount = Math.floor(Math.random() * (maxMines - minMines + 1)) + minMines
    //console.log('mineCount:',mineCount) //*for debugging

    //Create a duplicate of the game board
    let tempBoard = gameBoard.slice(0)  //JS is weird, without .slice() aparently both varibles share the same source

    //place mines on the board, iterates through the loop for each mines that needs to be placed
    for (let i = 0; i < mineCount; i++){
        //pick a random index from the duplicate gameboard
        let tempIndex = Math.floor(Math.random() * (tempBoard.length))
        //console.log(tempBoard,tempIndex)  //*for debugging
          
        /*finds the index of the object in gameBoard that matches the x and y coordinates of the randomly selected 
        index in the duplicate gameboard.
        Maps the property values for each object in the list into an array, then iterates over the array, checking
        if the values of x and y match those from the duplicate board.  When a match is found, the index of the 
        matching object is returned,  The filter function removes the undefined values*/
        arrIndex = gameBoard.map((element, index) => {
        if (element.x == tempBoard[tempIndex].x && element.y == tempBoard[tempIndex].y){
            return index
        }}).filter(element => element >=0)
        //console.log('matched cell',gameBoard[arrIndex],'\n')   //*for debugging
        gameBoard[arrIndex].containsMine = true
        tempBoard.splice(tempIndex, 1)
        //console.log('tempboard',tempBoard)    //*for debugging
        //console.log('gameboard',gameBoard)
}}

//ANCHOR Count Nearby Mines
function countNearbyMines () {
    //Iterate over each cell in the board
    for (let i = 0; i < gameBoard.length; i++){
        let nearbyMines = 0         //Counter to keep track of mines
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
                //console.log(gameBoard[arrIndex],'\n\n')
                //Test if the object is not null, as running this code for cells on the edge of the board will return
                //undefined values when the for loop tries to select a non existant adjacent cell.
                if (Object.keys(arrIndex).length !== 0){
                    //If the cell contains a mine, increase the value of nearbyMines
                    if (gameBoard[arrIndex].containsMine == true){
                        nearbyMines++
        }}}}
        //console.log(nearbyMines)    //*for debugging
        gameBoard[i].minesNearby = nearbyMines
}}

//ANCHOR Display Board
function displayBoard(){
    //clear space in the console beacuse console.clear() doesn't work in node
    console.log('\n'.repeat(20))

    //Create X axis key
    let xkey = '     1'
    //for each column, concat a new string to display the value of i (column number)
    for (let i = 2; i <= boardDimension && i <10; i++){
        xkey += `   ${i}`
    }
    
    //When the value of I reaches 2 digits, the indentation between each number needs to be reduced
    //Will only run if the boardDimension is > 10
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
    //if true, return the value of contains mine for the selected cell
    if (Object.keys(arrIndex).length !== 0){
        //Test if the cell contains a mine
        if (gameBoard[arrIndex].containsMine === true){
            //If the player hits a mine on the first turn, the mine should be relocated.
            //The variable gameState determins if it is the first turn or not
            if (gameState == 'start'){
                //Remove the mine form the cell and run the place mine function setting the mine count to 1
                //Change the uncovered cell back to covered and rerun the uncover cell function.
                //If the placemine function chooses the same place to replace the mine, this will just run again.
                gameBoard[arrIndex].containsMine = false
                minMines = 1
                maxMines = 1
                gameBoard[arrIndex].state = 'covered'
                //console.log('moving mine')  //*for debugging
                placeMines()
                uncoverCell(x_input,y_input)
            } else {
                //If it is not the first turn, change gameState to 'loss' which will end the game
                gameBoard[arrIndex].display = mineDisp
                gameState = 'loss'
                displayBoard();
}}}}

//ANCHOR Uncover Cell
function uncoverCell(x_input,y_input){
    //Find the index in gameboard which matches input
    arrIndex = gameBoard.map((element, index) => {
        if (element.x == x_input && element.y == y_input){
            return index
        }}).filter(element => element >=0)

    //check if the returned result is not undefined, 
    if (Object.keys(arrIndex).length !== 0){
        //check the state of the cell, if 'covered', set to 'uncovered'
        //if the state 'flagged' or 'uncovered', nothing happens
        if(gameBoard[arrIndex].state === 'covered'){
            gameBoard[arrIndex].state = 'uncovered'
            //When a cell is ucovered check if their are mines nearby.
            //If true display the nearby mine count on the unncoverd cell,
            //otherwise, display the empty cell icon and run recursive uncover
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
//Triggerd if an empty cell is uncovered
function recursiveUncover(x,y){
    //console.log('running recursive')    //*for debugging
    //Uses a for loop to run uncover cell on all adjacent cells
    //uncoverCell and recursiveUncover will recursively call each other until no more empty cells are uncovered
    for (var i = -1; i <= 1; i++){
        for (let j = -1; j <= 1; j++){
            let arrIndex = gameBoard.map((element, index) => {
                if (element.x == x+i && element.y == y+j){
                    return index
                }}).filter(element => element >=0)
            //console.log(arrIndex)                       //*for debugging
            //console.log(gameBoard[arrIndex],'\n\n')     //*for debugging
            //Test if the index is not null, as running this code for cells on the edge of the board will return
            //undefinde values when the for loop tries to select a non existant adjacent cell.
            if (Object.keys(arrIndex).length !== 0){
                uncoverCell(x+i,y+j)
}}}}

//ANCHOR Toggle Flag
function toggleFlag(x_input,y_input){
    //find the matching index in gameBoard
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
    //A text based command system, most of this code is self explanatory input and validation so commenting will be light
    console.log(`
    To change the board size, type 'change_size'
    To change the amount of mines on the board, type 'change_mine_count'
    To customise the game's iconography, type 'change_icons'
    
    To exit this menu, type 'exit' or 'e'`);
    //Retrieve user input with syncronous readline module
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
    //Retrieve user input with syncronous readline module
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
    /*//For expanding functionality in the future.  Would open a small instruction manual
    else if (userInput.toLowerCase() === 'help' || userInput.toLowerCase() === 'h'){
        console.log('displaying help')
    }*/ 
    else {
        //error trapping
        console.log('\nInvalid input!')
        begin()
    }
}

//ANCHOR Select Action
function selectAction(){
    //Get X coordinate from user
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
    //Get Y coordinate from user
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
    //Get Action from user (flag/uncover)
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
    console.log('\n\nWelcome to Minesweeper')
    //Set the gameState to start, ensures the user cannot fail on the first turn (see checkForMine function)
    gameState = 'start'
    begin();    //Opens the main menu, allowing the user to change settins
    gameBoard = []
    gameBoard = initialiseBoard()  //Creates a new game board
    placeMines();                   //Randomly place mines on the board
    countNearbyMines();             //Counts adjacent cells for all mines and stores in gameBoard
    //console.log(gameBoard)        //*for debugging
    console.log('\n'.repeat(20))    //clear space in the console beacuse console.clear() doesn't work in node
    console.log(`Welcome to minesweeper.\n
    To play, start by slecting the x and y coordinates of the tile you want to interact with.
    Once you have selected a tile, You can type 'flag' or 'f' to place or remove a marker flag, 
    or you can type 'uncover' or 'u' to reveal the tile.\n\n`)
    readlineSync.question('press ENTER to conintue\n>')

    //ANCHOR Gameplay loop
    while (true){
        displayBoard()              //Updates the visual display each turn
        //console.log(gameBoard)    //*for debugging
        selectAction()              //Gets user input each turn
        checkWinCondition()         //Checks if the game is complete
        //Checks if the user has won or lost and ends the game if so
        if (gameState == 'win'){
            console.log('\nYou win!  Congratulations!\n')
            break
        }
        else if (gameState == 'loss'){
            console.log('\nYou lose!  You detonated a mine!\n')
            break
        }
        //upadtes the game state to remove the first turn invincibility (see checkForMine function)
        gameState = 'ongoing'
    }
    //Once the loop is broken asks if the user wants to replay and either recalls root or ends
    function playAgain(){
        replay = readlineSync.question('Would you like to play again? [y/n]\n>')
        if (replay.toLowerCase() == 'y' || replay.toLowerCase() == 'yes'){
            root()
        }
        else if (replay.toLowerCase() == 'n' || replay.toLowerCase() == 'no'){}
        //error trapping
        else {
            console.log(`Invalid input!  Enter either 'y', 'yes','n' or 'no'`)
        }
    }
    playAgain()
}

root()