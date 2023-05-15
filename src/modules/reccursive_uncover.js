/* SDV503 Minesweeper game, reccursive cell uncover modlue
version 1.0, 16/05/2023
Caleb Eason

Module for reccursively uncovering cells if an uncovered cell has no mines nearby*/

function reccursiveUncover(x,y){
    for (var i = -1; i <= 1; i++){
        for (let j = -1; j <= 1; j++){
            let arrIndex = gameBoard.map((element, index) => {
                if (element.x == x+i && element.y == y+j){
                    return index
                }}).filter(element => element >=0)
            //console.log(arrIndex)                       //*for debugging
            //console.log(gameBoard[arrIndex],'\n\n')     //*for debugging
            if (Object.keys(arrIndex).length !== 0){
                console.log('call uncover function with current cell coords')
            }
        }
    }
}