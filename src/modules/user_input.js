 /* SDV503 Minesweeper game, user input
version 0.0, 15/05/2023
Caleb Eason

Module to receive and interpret user input*/

const readline = require('node:readline/promises');
const {stdin: input, stdout: output} = require('node:process');



const getInput = async (question) => {
    const rl = readline.createInterface({input,output});
    let userInput = await rl.question(question);
    rl.close();
    if(true){return userInput;}
    
}

(async () => {
    console.log(getInput("Enter an X value\n"));
    console.log('CRanatium')
})();