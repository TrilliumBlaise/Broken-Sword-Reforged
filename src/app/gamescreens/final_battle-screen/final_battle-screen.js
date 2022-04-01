import CurrentPlayerAPI from '../../player/CurrentPlayerAPI.js';
import PlayerAPI from '../../player/PlayerAPI.js';
import { damageDurabiliy } from '../inventory-screen/ItemAPI.js';
import Player from '../../player/player.js';
import Enemy from '../../enemy/enemy.js';

//Creates the iventory screen element
const inventoryScreen = document.createElement('iframe');
inventoryScreen.src = '../inventory-screen/inventory-screen.html';

let player = CurrentPlayerAPI.read();
const enemy = Enemy.createEnemy();

//Allows player's access to the inventory
document.querySelector('.inventory-button').addEventListener('click', () => {
  const inventory = document.querySelector('.inventory');
  if (inventory.classList.contains('fadeOut')) {
    inventory.classList.replace('fadeOut', 'fadeIn');
    inventory.style.position = 'relative';
    inventory.append(inventoryScreen);
    return;
  }
  if (inventory.classList.contains('fadeIn')) {
    inventory.classList.replace('fadeIn', 'fadeOut');
    inventory.style.position = 'absolute';
    inventory.removeChild(inventoryScreen);
    player = CurrentPlayerAPI.read();
    return;
  }
});

//Checks to see if the player is currently equipped with the Sword of Light
//Runs the battle function
document.querySelector('body').addEventListener('click', () => {
  const equippedWeapon = player.inventory[0][0];
  if (typeof equippedWeapon.name != 'string') {
    document.querySelector('.battle-text').innerHTML =
      'Only the sword of light can defeat the Evil One!';
    return;
  }
  battle();
});

//Functions

//Function for destroying a player who died
function dead() {
  PlayerAPI.deletePlayer(player);
  window.location.href = '../game-over-screen/game-over-screen.html';
}

//Function for running a single round of battle
function battle() {
  const playerDamage = enemy.takeDamage(player); //returns [damage, boolean]
  const enemyDamage = Player.takeDamage(player, enemy); // [damage, player]

  player = enemyDamage[1];
  document.querySelector(
    '.battle-text'
  ).innerHTML = `You have taken ${enemyDamage[0]} damage from ${enemy.name}.<br>`;
  if (playerDamage[1] && playerDamage[0] != 0) {
    document.querySelector(
      '.battle-text'
    ).innerHTML += `You have dealt a critical hit! <br>`;
  }
  document.querySelector(
    '.battle-text'
  ).innerHTML += `${enemy.name} has taken ${playerDamage[0]} damage.<br>`;
  document.querySelector(
    '.player-hp'
  ).innerHTML = `${player.name}'s HP: ${player.hp}/${player.maxHP}`;
  document.querySelector(
    '.final-boss-hp'
  ).innerHTML = `The Evil One's HP: ${enemy.hp}/${enemy.maxHP}`;
  if (player.hp === 0) {
    dead();
  }
  if (enemy.hp === 0) {
    reward();
  }
}
