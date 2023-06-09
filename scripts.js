class Gameboard {
  constructor() {
    this.entries = ['X','X','X','X','X','X','X','X','X']
  }
}

const gameboard = new Gameboard();

const gameboardContainer = document.querySelector('.gameboard-container');

const mainContent = document.querySelector('#main-content');

const gameboardItems = document.querySelectorAll('.gameboard-item');

renderGameboard('O');

console.log(`entries: ${JSON.stringify(gameboard.entries,null,4)}`);

console.log(`gameboard.entries[0]: ${gameboard.entries[0]}.`);

// mainContent.addEventListener('click', renderGameboard)

const toggleTile = (event) => {
  let a = null;
  if (event.target.id.length > 0) {
    a = event.target.id;
   } else {
    a = event.target.parentElement.id;
  }
  console.log(`div#${a}>span`);
  const b = document.querySelector(`div#${a}>span`);
  console.log(`b: ${b.innerText}`);
  b.innerText = b.innerText === 'O' ? 'X' : 'O';
} 

gameboardItems.forEach( item => {
  item.addEventListener('click', toggleTile)
})

function renderGameboard() {
  for (let i = 0; i < gameboard.entries.length; i++) {
    const element = gameboard.entries[i] === 'O' ? 'X' : 'O';
    const divToUpdate = document.querySelector(`div#game-tile-${i+1}>span`)
    divToUpdate.innerText = element;
    gameboard.entries[i] = element;
  }
} 

