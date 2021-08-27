const { rejects } = require('assert');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
//ask function to receive input from the user in response to a given question
function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}
//random number generator
function randomNum(min, max) {
    let rangeMin = Math.ceil(min)
    let rangeMax = Math.floor(max)
    return Math.floor(Math.random() * (rangeMax - rangeMin) + rangeMin)
}
//function for binary searches, ensuring that the pc doesn't have to guess too long
function smartNum(sMin, sMax) {
    return Math.floor((sMin + sMax) / 2)
}
//function for the player to guess a number of the pc's choosing
async function guessReverse() {
       /* global vars for guessGame  */
let parsedPlayerMin = "starting bot number";
let parsedPlayerMax = "starting top number";


    console.log("Let's play a game where you try to guess my number!")
    //get the player to establish a range of numbers
    /* use a loop to force an actual number */
    while(isNaN(parsedPlayerMin)){
        let playerMin = await ask('Pick a number for the bottom range.')
        parsedPlayerMin = parseInt(playerMin)
    }
    while(isNaN(parsedPlayerMax)){
        let playerMax = await ask('Now pick a number for the top range.')
        //turn the returned range into actual numbers instead of a string
        parsedPlayerMax = parseInt(playerMax)
    }
    
    //generate a random number for the pc, using the randomNum function
    pcNum = randomNum(parsedPlayerMin, parsedPlayerMax)
    let playerGuess = await ask('Alright ive got my number, try and guess it!.')
    //establish a variable to keep track of the number of guesses made
    let guessCount = 1
    //use a loop to allow the game to function without a million else if functions
    while (true) {
        //increase the value of the guess tracking variable by one each loop
       
        //if the guess is correct sulk and end the game
        if (parseInt(playerGuess) === pcNum) {
            console.log("you figured it out?, I'll make sure to pick a better number next time.")
            //return the current value of the guess tracker
            if ( guessCount === 1) {
                console.log(`Holy cow you got it in a single Guess!`)
            } else {
                console.log(`It took you a whole ${guessCount} tries!`)
            }
            //offer to replay a guessing game, either restarting the initial process or ending the program
            let replay = await ask('would you like to play again?')
            if (replay === "yes") {
                pickGame()
            } else if (replay === "no") {
                console.log('Goodbye then')
                process.exit()
            }
            process.exit()
            //return info to the player on whether the guess was too high or too low, so that they don't have to guess at complete random
        } else if (playerGuess > pcNum) {
            ++guessCount
            playerGuess = await ask('Your guess is too high, try a lower number.')
        } else if (playerGuess < pcNum) {
            ++guessCount
            playerGuess = await ask('Your guess is too low, try a higher number.')
        } else if(isNaN(playerGuess)){
            playerGuess = await ask(`Please enter an actual number as a guess`)
        }
    }
}
//function for the pc to guess a number of the player's choosing

async function guessGame() {
    /* global vars for guessGame  */
let parsedPlayerMin = "starting bot number";
let parsedPlayerMax = "starting top number";
let playerNumber = "starting player number";
let validGuess = false;
    console.log("lets play a guessing game!");
    /* put it in a while loop to force user to input an actual number */
    while (isNaN(parsedPlayerMin)) {
      //get the player to establish a range of numbers
      let playerMin = await ask("Pick a number for the bottom range");
      parsedPlayerMin = parseInt(playerMin);
    }
    /* do the same thing for the top range */
    while (isNaN(parsedPlayerMax)) {
      let playerMax = await ask("Now pick a number for the top range");
      //turn the returned range into actual numbers instead of a string
      parsedPlayerMax = parseInt(playerMax);
    }
  
    while (isNaN(playerNumber)) {
      //start by asking for their number
      playerNumber = await ask("Now pick a number for me to guess!");
      //return the chosen number to the player for confirmation
    }
  
    console.log(`you've picked ${playerNumber}, now i'll try and guess it!`);
    //establish the initial guess by the computer
    let pcGuess = randomNum(parsedPlayerMin, parsedPlayerMax);
    let guessNum = 1;
  
    while (true) {
      //guess a random number and ask if its correct
  
      let guess1 = await ask(
        `${pcGuess} , is this your number? Type y for yes and n for no`
      );
  
      //if its correct gloat and end the game
      if (guess1 === "y") {
        console.log("Ha,I win! Try harder next time!");
        console.log(`It only took me ${guessNum} tries too!`);
        //code to restart function if you want to play again
        let playAgain = await ask("Would you like to play again");
        if (playAgain === "yes") {
          play();
        } else if (playAgain === "no") {
          process.exit();
        }
        //if not correct ask if the number was higher or lower and guess again with an updated range
      } else if (guess1 === "n") {
        ++guessNum;
        validGuess = false;
  
      /* set up while loop to check that the user enters either higher or lower */
        while (validGuess === false) {
          let guess2 = await ask("is your number higher or lower than mine?");
          if (guess2 === "higher" && pcGuess > playerNumber) {
                //if the player lies end the game
            console.log("I don't play with cheaters");
            process.exit();
          } else if (guess2 === "higher") {
            validGuess = true;
            //change the range and guess "smart" by guessing the middle of the new range
            //hard change to value of parsedPlayerMin by one to prevent guessing the same number
            parsedPlayerMin = ++pcGuess;
            pcGuess = smartNum(parsedPlayerMin, parsedPlayerMax);
          } else if (guess2 === "lower" && pcGuess < playerNumber) {
            console.log("I don't play with cheaters");
            process.exit();
          } else if (guess2 === "lower") {
            validGuess = true;
            parsedPlayerMax = --pcGuess;
            pcGuess = smartNum(parsedPlayerMin, parsedPlayerMax);
          } else {
            console.log(`Please tell me if my guess was higher or lower`);
            validGuess = false;
          }
        }
      } else {
        console.log(`Please enter either y or no to confirm the guess`);
      }
    }
  }

//simple ask prompt to decide which function to run. run one or the other function depending on the answer
async function pickGame() {
    let promt = await ask(`Let's try to guess some numbers!
    Would you like me to pick a number [you pick], or do you want to pick a number [I'll pick]?`)
    if (promt === 'you pick') {
        guessReverse()
    } else if (promt === "I'll pick") {
        guessGame()
    }
}

pickGame()