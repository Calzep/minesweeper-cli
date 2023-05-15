/* SDV503 Minesweeper game, win condition module
version 0.0, 04/05/2023
Caleb Eason

Module to check if the user has uncovered every cell and end the game if true*/

var gameBoard = [   //global variable, taken form board gen module
    { x: 1, y: 1, containsMine: true, state: 'covered', minesNearby: 0 },
    { x: 1, y: 2, containsMine: false, state: 'uncovered', minesNearby: 0 },
    { x: 1, y: 3, containsMine: false, state: 'uncovered', minesNearby: 0 },
    { x: 2, y: 1, containsMine: false, state: 'uncovered', minesNearby: 0 },
    { x: 2, y: 2, containsMine: false, state: 'uncovered', minesNearby: 0 },
    { x: 2, y: 3, containsMine: false, state: 'uncovered', minesNearby: 0 },
    { x: 3, y: 1, containsMine: false, state: 'uncovered', minesNearby: 0 },
    { x: 3, y: 2, containsMine: true, state: 'covered', minesNearby: 0 },
    { x: 3, y: 3, containsMine: false, state: 'uncovered', minesNearby: 0 }
  ]

function checkWinCondition(){
    let gamefinished = true
    for (let i = 0; i < gameBoard.length; i++){
        if(!(gameBoard[i].state === 'uncovered' || gameBoard[i].containsMine === true)){
            gamefinished = false
            console.log('win conditions not met')   //*for debugging
            break
        }
    }
    if (gamefinished === true){
        console.log('game won, ending game')    //*for debugging
    }
}

checkWinCondition()