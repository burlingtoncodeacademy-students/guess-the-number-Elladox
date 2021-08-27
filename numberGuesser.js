const { rejects } = require("assert");
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);
//ask function to receive input from the user in response to a given question
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
//random number generator
function randomNum(min, max) {
  let rangeMin = Math.ceil(min);
  let rangeMax = Math.floor(max);
  return Math.floor(Math.random() * (rangeMax - rangeMin) + rangeMin);
}
//returns the middle of two given numbers, allowing the pc to guess more accurately
function smartNum(sMin, sMax) {
  
  let test2 = Math.floor((sMin + sMax) / 2);
  
  return test2;
}
/* establish some global variables */
let parsedPlayerMin = "starting bot number";
let parsedPlayerMax = "starting top number";
let playerNumber = "starting player number";
let validGuess = false;
play();
async function play() {
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
