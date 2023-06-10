const gameWinner = (state) => ({
  wins: () => state.playerWon = true
})

const winStatusReporter = (state) => ({
  readWinStatus: () => state.playerWon
})

const turnIncrementer = (state) => ({
  incrementTurns: () => ++state.turns
})

const winnerChecker = (state) => ({
  identifyAnyWinners: () => {
    if (state.playerOne.readWinStatus()) {
      return 1;
    } else if (state.playerTwo.readWinStatus()) {
      return 2;
    } else {
      return null;
    }
  }
})

const gameEnder = (state) => ({
  checkIfGameIsOver: () => {
    if (state.winner || state.turns >= 9) {
      state.gameIsComplete = true
    }
  }
})

const gameOverMessager = (state) => ({
  updateGameOverMessage: () => {
    state.gameOverMessage = `Player ${state.winner} wins!`
  }
}) 

const stater = (state) => ({
  logState: () => console.log(state) 
})

// Player Function Factory
const Player = (playerInt) => {
  let state = {
    whichPlayer: playerInt,
    playerWon: false,
  }

  return Object.assign(
    {},
    gameWinner(state),
    winStatusReporter(state),
    stater(state)
  );
} 

// Game Controller IIFE
const gameController = (function() {
  
  let state = {
    playerOne: Player(1),
    playerTwo: Player(2),
    turns: 0,
    gameIsComplete: false,
    winner: null,
    gameOverMessage: null
  } 

  return Object.assign(
    {},
    stater(state),
    turnIncrementer(state),
    playerWinStateUpdater(state),
    winnerChecker(state),
    gameEnder(state),
    gameOverMessager(state)
  );
})();

// const prompt = require("prompt-sync")({ sigint: true });

// let userInput = prompt("input: ");

// console.log(`userInput: ${userInput}`);

// define rules for tic tac toe
// user 1 decides they want to play tic-tac-toe
// user 1 finds user 2 to play tic-tac-toe with
// user 1 brings user 2 to a place where they can play tic-tac-toe
// a game of tic tac toe is started
// user 1 and user 2 decide who will be player 1 and player 2

// turns of tic-tac-toe are executed sequentially
// a turn consists of: 
// player "x" making a move
// player "x"'s  move being analyzed to determine if they won
// status is recorded in players's info
// query players to determine if there is a winner
// if there is a winner, end game

// if all spaces have been exhausted without a winner, end the game and indicate it was a tie