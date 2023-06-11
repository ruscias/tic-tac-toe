const gameboardItems = document.querySelectorAll('div.gameboard-item');
const resetButton = document.querySelector('button#btn-reset');


// player
const PlayerMaker = (isComputer, playerInt) => {
  const state = {
    isComputer, 
    playerInt,
    hasWon: false,
    selectionMade: false
  }

  return Object.assign(
    {}, 
    state
  ); 
} 

// gameController
const modalResult = document.querySelector('div#modal-results');
const modalText = document.querySelector('div#modal-text');
const modalPlayerSelection = document.querySelector('div#modal-player-selection');
const playerSelectionButtons = document.querySelectorAll('div.btn-player-selection>button');

const playerOne = PlayerMaker(false,1);
const playerTwo = PlayerMaker(false,2);
let turns = 0; 
let currentPlayer = 'X'; 

function parsePlayerSelectionButtonId(id) {
  const playerIntMapping = {
    "one": 1,
    "two": 2,
  }
  const isComputerMapping = {
    "computer": true,
    "human": false
  }
  const splitId = id.split('-');
  const result = {playerInt: null, isComputer: null};

  result.playerInt = playerIntMapping[splitId[1]];
  result.isComputer =  isComputerMapping[splitId[2]]
  return result;
}

function recordPlayerSelection() {
  this.classList.toggle('selected');
  console.log(`this.classList: ${this.classList}`);
  const result = parsePlayerSelectionButtonId(this.id);
  console.log(`result: ${JSON.stringify(result,null,4)}`);
  if (playerOne.playerInt === result.playerInt) {
    playerOne.isComputer = result.isComputer;
    playerOne.selectionMade = true;
    const buttonsToModify = document.querySelectorAll('div.btn-player-selection>button.btn-player-one');
    buttonsToModify.forEach( item => {
      item.removeEventListener('click', recordPlayerSelection);
      item.disabled = true;
    })
  } else if (playerTwo.playerInt === result.playerInt) {
    playerTwo.isComputer = result.isComputer;
    playerTwo.selectionMade = true;
    const buttonsToModify = document.querySelectorAll('div.btn-player-selection>button.btn-player-two');
    buttonsToModify.forEach( item => {
      item.removeEventListener('click', recordPlayerSelection);
      item.disabled = true;
    })    
  }

  if (playerOne.selectionMade && playerTwo.selectionMade) {
    modalPlayerSelection.classList.toggle('hidden');
  }
} 

function renderGameboard(gameboard, gameboardItems) {
  for (let i = 0; i < gameboard.length; i++) {
    gameboardItems[i].innerText = gameboard[i];
  }
}
function executeTurn() {
  const i = parseInt(this.id.split('-')[2])-1;
  console.log(`i: ${i}`);
  if (isValidMove(i)) {
    updateGameboard(i);
    gameboardItems[i].classList += ' gameboard-item-visible';
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turns++;
    renderGameboard(gameboard, gameboardItems);
    checkForWinner();
  }
}
function resetGame() {
  window.location.reload();
}

// gameboard
const gameboard = [null,null,null,null,null,null,null,null,null];
function isValidMove(i) {
  // basically, if the index on...
  // the gameboard is X or O...
  // the move is invalid 
  if (['X','O'].includes(gameboard[i])) {
    return false;
  } else {
    return true;
  }
}
function updateGameboard(i) {
  gameboard[i] = currentPlayer;
}
function processGameboardForWin() {
  
  function parsePlayerInt(playerChar) {
    return playerChar === 'X' ? 1 : 2;
  }

  function checkWin() {
    winningIndicies = [
      // horizontal
      [0,1,2],
      [3,4,5],
      [6,7,8],
      // vertical
      [0,3,6],
      [1,4,7],
      [2,5,8],
      // diagonal
      [0,4,8],
      [6,4,2]
    ]
    for (const indexGroup of winningIndicies) {
      console.log(`indexGroup: ${indexGroup}`);
      if(!gameboard[indexGroup[0]] || !gameboard[indexGroup[1]] || !gameboard[indexGroup[2]]) {
        continue;     
      }

      if (gameboard[indexGroup[0]] === gameboard[indexGroup[1]] && gameboard[indexGroup[1]] === gameboard[indexGroup[2]]) {
        return parsePlayerInt(gameboard[indexGroup[0]]);
      }
    }
    return false;
  }
   
  return checkWin();
}
function checkForWinner() {
  const winnerIdentified = processGameboardForWin();
  if (winnerIdentified > 0) {
    modalResult.classList.remove('hidden');
    modalResult.classList.toggle('show');
    modalText.innerText = `Player ${winnerIdentified} wins!`;
  } else if (turns >= 9) {
    modalResult.classList.remove('hidden');
    modalResult.classList.toggle('show');
    modalText.innerText = `It's a tie!`;
  } else {
    console.log('Keep going!')
  }
}




playerSelectionButtons.forEach( item => {
  item.addEventListener('click', recordPlayerSelection)
})

gameboardItems.forEach( item => {
  item.addEventListener('click', executeTurn)
})

resetButton.addEventListener('click', resetGame)