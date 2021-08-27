const { rejects } = require('assert');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
//ask function to receive input from the user in response to a given question
function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}
function randomNum(min, max) {
    let rangeMin = Math.ceil(min)
    let rangeMax = Math.floor(max)
    return Math.floor(Math.random() * (rangeMax - rangeMin) + rangeMin)
}
guessMe()
async function guessMe() {
    console.log("Let's play a game where you try to guess my number!")
    //get the player to establish a range of numbers
    let playerMin = await ask('Pick a number for the bottom range.')
    let playerMax = await ask('Now pick a number for the top range.')
    //turn the returned range into actual numbers instead of a string
    let parsedPlayerMin = parseInt(playerMin)
    let parsedPlayerMax = parseInt(playerMax)
    pcNum = randomNum(parsedPlayerMin, parsedPlayerMax)
    let playerGuess = await ask('Alright ive got my nubmer, try and guess it!.')
while(true) {
if (parseInt(playerGuess) === pcNum) {
console.log("wow you got it!. Congrats!")
process.exit()
} else if (playerGuess > pcNum) {
    playerGuess = await ask('Your guess is too high, try a lower number.')
} else if (playerGuess < pcNum) {
   playerGuess = await ask('Your guess is too low, try a higher number.')
}
}
}