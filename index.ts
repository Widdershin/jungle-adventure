const readline = require("readline");

import * as Jungle from "jungle-core";
const core = Jungle.Core;

const appDomain = new Jungle.Domain({});

const rootCell = core.recover({
  basis: "cell",

  form: {
    prime() {
      this.number = Math.floor(Math.random() * 100);
    }
  },

  guess: {
    basis: "contact:op",

    resolve_in(input) {
      if (input < this.number) {
        return {gameOver: false, message: "Too low!"};
      }

      if (input > this.number) {
        return {gameOver: false, message: "Too high!"};
      }

        return {gameOver: true, message: "You win!"};
    }
  }
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getInput(cb) {
  rl.question("Guess a number: \n", number => {
    cb(parseInt(number, 10));
  });
}

const guesser = rootCell.shell.designate(":guess")[":guess"];

function playGame() {
  getInput(input => {
    guesser.put(input).then((result: any) => {
      const {gameOver, message} = result;

      console.log(message);

      if (gameOver) {
        rl.close();
      } else {
        playGame();
      }
    });
  });
}

playGame();
