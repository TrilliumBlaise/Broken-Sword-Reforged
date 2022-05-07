import PlayerAPI from '../../player/PlayerAPI.js';
import CurrentPlayerAPI from '../../player/CurrentPlayerAPI.js';

const player = CurrentPlayerAPI.read();
const currentAction = document.querySelector('.text').dataset;
const textOutput = document.querySelector('.text');
const inventory = document.querySelector('.inventory');

const iFrame = document.createElement('iframe');
iFrame.src = '../inventory-screen/inventory-screen.html';
//Allows the player to make the inventory screen visible and invisible
document.querySelector('.inventory-button').addEventListener('click', () => {
  inventory.classList.remove('fadeOut');
  inventory.appendChild(iFrame);
});

document.querySelector('.close').addEventListener('click', e => {
  inventory.classList.add('fadeOut');
  inventory.removeChild(iFrame);
});

//Allows the player to save and quit the game
document.querySelector('.yes').addEventListener('click', () => {
  if (currentAction.current === 'save') {
    const savePlayer = CurrentPlayerAPI.read();
    const players = PlayerAPI.getPlayers();
    const foundPlayerFlag = players.some(player => player.name === savePlayer.name);
    if (!foundPlayerFlag) {
      PlayerAPI.saveNewPlayer(savePlayer);
    }
    if (foundPlayerFlag) {
      PlayerAPI.updatePlayer(savePlayer);
    }
    textOutput.innerHTML = 'Your game has been saved.<br> Would you like to quit?';
    currentAction.current = 'quit';
    return;
  }
  window.lcation.reload();
});

//Allows the player to not save and not quit the game
document.querySelector('.no').addEventListener('click', () => {
  if (currentAction.current === 'save') {
    textOutput.innerHTML = 'Your game has NOT been saved.<br> Would you like to quit?';
    currentAction.current = 'quit';
    return;
  }
  window.location.href = '../village-screen/village-screen.html';
});
