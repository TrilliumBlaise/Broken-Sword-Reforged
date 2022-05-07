import Player from '../../player/player.js';
import CurrentPlayerAPI from '../../player/CurrentPlayerAPI.js';
import Weapon from '../inventory-screen/items/weapon/weapon.js';
import { elements } from '../../element/element.js';

const playerInput = document.querySelector('#player-name');
const weaponInput = document.querySelector('#weapon-name');
const enter = document.querySelector('#enter');

enter.addEventListener('click', () => {
  initGame();
});

playerInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') initGame();
});

weaponInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') initGame();
});

function initGame() {
  if (validatePlayer()) {
    const player = new Player(playerInput.value, new Weapon(weaponInput.value, elements[0]));
    CurrentPlayerAPI.save(player);
    window.location.href = '../village-screen/village-screen.html';
  }
}

function validatePlayer() {
  if (playerInput.value === '' || weaponInput.value === '') {
    alert('Please tell me your name and the name of your starting weapon');
    return false;
  }
  return true;
}
