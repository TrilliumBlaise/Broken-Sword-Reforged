import PlayerAPI from '../../player/PlayerAPI.js';
import CurrentPlayerAPI from '../../player/CurrentPlayerAPI.js';

const player = CurrentPlayerAPI.read();
const currentAction = document.querySelector('#current');
const textOutput = document.querySelector('.text');

//Allows the player to make the inventory screen visible and invisible
document.querySelector('.inventory-button').addEventListener('click', () => {
  const inventory = document.querySelector('.inventory');
  if (inventory.classList.contains('fadeOut')) {
    inventory.classList.replace('fadeOut', 'fadeIn');
    inventory.style.position = 'relative';
    return;
  }
  if (inventory.classList.contains('fadeIn')) {
    inventory.classList.replace('fadeIn', 'fadeOut');
    inventory.style.position = 'absolute';
    return;
  }
});

//Allows the player to save and quit the game
document.querySelector('.yes').addEventListener('click', () => {
  switch (currentAction.innerHTML) {
    case 'save': {
      const savePlayer = CurrentPlayerAPI.read();
      const players = PlayerAPI.getPlayers();
      const foundPlayerFlag = players.filter(player => {
        if (player.name === savePlayer.name) return true;
      }
      if (!foundPlayerFlag) {
        PlayerAPI.saveNewPlayer(savePlayer);
      }
      if (foundPlayerFlag) {
        PlayerAPI.updatePlayer(savePlayer);
      }
      textOutput.innerHTML =
        'Your game has been saved.<br> Would you like to quit?';
      currentAction.innerHTML = 'quit';
      break;
    }
    case 'quit': {
      window.reload();
      break;
    }
  }
});

//Allows the player to not save and not quit the game
document.querySelector('.no').addEventListener('click', () => {
  switch (currentAction.innerHTML) {
    case 'save': {
      textOutput.innerHTML =
        'Your game has NOT been saved.<br> Would you like to quit?';
      currentAction.innerHTML = 'quit';
      break;
    }
    case 'quit': {
      currentAction.innerHTML = 'save';
      document.querySelector('.inventory').innerHTML = '';
      window.location.href = '../village-screen/village-screen.html';
      break;
    }
  }
});

document.querySelector(
  '.inventory'
).innerHTML = `<iframe src= '../inventory-screen/inventory-screen.html' scrolling= 'no'></iframe>`;
