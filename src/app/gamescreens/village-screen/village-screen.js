import CurrentPlayerAPI from '../../player/CurrentPlayerAPI.js';
import { elements } from '../../element/element.js';

//Variables
const player = CurrentPlayerAPI.read();
const hospitalBtn = document.querySelector('.hospital');
const homeBtn = document.querySelector('.home');
const adventureBtn = document.querySelector('.adventure');
const evilBtn = document.querySelector('.evil-one');

///Fill Home button with player.name.toUpperCase()'S HOME
homeBtn.innerHTML = `${player.name.toUpperCase()}'S HOME`;

//Button functionality

//Lets the hospital button route to the hospital screen
hospitalBtn.addEventListener('click', () => {
  window.location.href = '../hospital-screen/hospital-screen.html';
});

//Lets the home button route to the Player Home screen
homeBtn.addEventListener('click', () => {
  window.location.href = '../player_home-screen/player_home-screen.html';
});

//Lets the adventure button route to the field screen
adventureBtn.addEventListener('click', () => {
  window.location.href = '../field-screen/field-screen.html';
});

//Opens the final warnings screen
evilBtn.addEventListener('click', () => {
  document.querySelector('.main').classList.add('blur');
  document.querySelector('.warning').classList.replace('fadeOut', 'fadeIn');
  if (!checkPrimeWeapon()) {
    document.querySelector('.buttons').classList.add('fadeOut');
    document.querySelector('.text').innerHTML =
      'Only with the complete form of the Sword of Light can you defeat the Evil One!';
    setTimeout(function () {
      document.querySelector('.buttons').classList.remove('fadeOut');
      document.querySelector('.main').classList.remove('blur');
      document.querySelector('.warning').classList.replace('fadeIn', 'fadeOut');
    }, 5000);
    return;
  }
  document.querySelector(
    '.text'
  ).innerHTML = `Once you have begun this battle, there is no turning back.<br> Are you sure you want to proceed?`;
});

//Lets the yes button route to the final_battle-screen
document.querySelector('.yes').addEventListener('click', () => {
  document.querySelector('.text').innerHTML = 'Prepare yourself!';
  document.querySelector('.buttons').classList.add('fadeOut');
  setTimeout(function () {
    window.location.href = '../final_battle-screen/final_battle-screen.html';
  }, 2000);
});

//Allows the player to say they need a bit more preparation
document.querySelector('.no').addEventListener('click', () => {
  document.querySelector('.text').innerHTML =
    'It is wise to make sure you are prepared for this fight.';
  document.querySelector('.buttons').classList.add('fadeOut');
  setTimeout(function () {
    document.querySelector('.buttons').classList.remove('fadeOut');
    document.querySelector('.main').classList.remove('blur');
    document.querySelector('.warning').classList.replace('fadeIn', 'fadeOut');
  }, 5000);
});

//Functions

//Function for checking to see if the Prime Weapon is complete
//returns false if any element is None else returns true
function checkPrimeWeapon() {
  const primeWeapon = getPrimeWeapon();
  primeWeapon.weaponElements.forEach(weaponElement => {
    if (isSameElement(weaponElement, elements[4])) return false;
  });
  return true;
}

//Function for getting the Prime Weapon
//returns primeWeapon
function getPrimeWeapon() {
  let primeWeapon;
  for (let i = 0; i < player.inventory[0].length; i++) {
    let weapon = player.inventory[0][i];
    if (typeof weapon.name === 'string') {
      primeWeapon = weapon;
    }
  }
  return primeWeapon;
}
