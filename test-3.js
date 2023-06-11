const gameboardItems = document.querySelectorAll('div.gameboard-item');
const modalResult = document.querySelector('div#modal-results');
const modalText = document.querySelector('div#modal-text');
const resetButton = document.querySelector('button#btn-reset');

let turns = 0; 
const gameboard = [null,null,null,null,null,null,null,null,null];
let currentPlayer = 'X'; 

function renderGameboard(gameboard, gameboardItems) {
  for (let i = 0; i < gameboard.length; i++) {
    gameboardItems[i].innerText = gameboard[i];
  }
}

function isValidMove(i) {
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

renderGameboard(gameboard, gameboardItems);

gameboardItems.forEach( item => {
  item.addEventListener('click', executeTurn)
})

resetButton.addEventListener('click', resetGame)