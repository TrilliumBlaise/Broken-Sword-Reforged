import CurrentPlayerAPI from '../../player/CurrentPlayerAPI.js';
import PlayerAPI from '../../player/PlayerAPI.js';
import Player from '../../player/player.js';
import { createEnemy } from '../../enemy/enemy.js';

//Creates the iventory screen element
const inventoryScreen = document.createElement('iframe');
inventoryScreen.src = '../inventory-screen/inventory-screen.html';

let player = CurrentPlayerAPI.read();
const enemy = createEnemy();

document.addEventListener('DOMContentLoaded', e => {
  const playerHP = document.querySelector('.player-hp');
  const enemyHP = document.querySelector('.final-boss-hp');
  playerHP.innerHTML = `
    ${player.name}'s HP: ${player.hp} / ${player.maxHP}
  `;
  enemyHP.innerHTML = `
    ${enemy.name}'s HP: ${enemy.hp} / ${enemy.maxHP}
  `;
});
//Allows player's access to the inventory
const inventory = document.querySelector('.inventory');
const background = document.querySelector('.battle-screen');
document.querySelector('.inventory-button').addEventListener('click', () => {
  background.classList.add('blur');
  inventory.classList.replace('fadeOut', 'fadeIn');
  inventory.append(inventoryScreen);
});

document.querySelector('.close').addEventListener('click', e => {
  background.classList.remove('blur');
  inventory.classList.replace('fadeIn', 'fadeOut');
  inventory.removeChild(inventoryScreen);
  player = CurrentPlayerAPI.read();
});

//Checks to see if the player is currently equipped with the Sword of Light
//Runs the battle function
document.querySelector('.attack').addEventListener('click', () => {
  const equippedWeapon = player.inventory[0][0];
  if (typeof equippedWeapon.name != 'string') {
    document.querySelector('.battle-text').innerHTML = 'Only the sword of light can defeat the Evil One!';
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

function reward() {
  const body = document.querySelector('body');
  body.innerHTML = '';
  const background = document.createElement('div');
  background.style.backgroundImage = `url('../../../assets/images/final_battle-screen-background.jpg')`;
  background.classList.add('background', 'blur');
  const message = document.createElement('span');
  message.style.zIndex = 1;
  message.innerHTML = `Congratulations ${player.name}!<br><br>You have conquered your ancient foe and brought peace to the land`;
  body.appendChild(background);
  body.appendChild(message);
  setTimeout(() => {
    PlayerAPI.deletePlayer(player);
    message.innerHTML = `You will be returned to the main menu shortly. Your adventure has come to an end and your character has been deleted.<br><br> Thank you for playing`;
    setTimeout(() => {
      window.location.href = '../home-screen/home-screen.html';
    }, 5000);
  }, 5000);
}

//Function for running a single round of battle
function battle() {
  const playerDamage = enemy.takeDamage(player); //returns [damage, boolean]
  const enemyDamage = Player.takeDamage(player, enemy); // [damage, player]

  player = enemyDamage[1];
  document.querySelector('.battle-text').innerHTML = `You have taken ${enemyDamage[0]} damage from The ${enemy.name}.<br>`;
  if (playerDamage[1] && playerDamage[0] != 0) {
    document.querySelector('.battle-text').innerHTML += `You have dealt a critical hit! <br>`;
  }
  document.querySelector('.battle-text').innerHTML += `The ${enemy.name} has taken ${playerDamage[0]} damage.<br>`;
  document.querySelector('.player-hp').innerHTML = `${player.name}'s HP: ${player.hp}/${player.maxHP}`;
  document.querySelector('.final-boss-hp').innerHTML = `The Evil One's HP: ${enemy.hp}/${enemy.maxHP}`;
  if (player.hp === 0) {
    dead();
  }
  if (enemy.hp === 0) {
    reward();
  }
}
