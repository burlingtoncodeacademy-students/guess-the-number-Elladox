const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);
  // Now try and complete the program.
  process.exit();
}


// start by getting the pc to pick an number at random
  // using Math.random * 100 and flooring it to a even integer 
//if the number is equal to the questionText , then the pc should "win" and exit the game with a message
//if the number is != to the questionText then the pc should continue to guess numbers
  //the player inputs higher or lower and the pc modifies its range accordingly
    // at a base to modify the range you use the guessed number + or - 1 depending on h or l
    // this would take too long so I should make it guess the middle of the range provided ((min + max) /2)