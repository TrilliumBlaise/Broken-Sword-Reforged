import CurrentPlayerAPI from '../../player/CurrentPlayerAPI.js';
import Enemy from '../../enemy/enemy.js';
import Player from '../../player/player.js';
import MyElement from '../../element/element.js';
import PlayerAPI from '../../player/PlayerAPI.js';
import { addToInventory, damageDurabiliy } from '../inventory-screen/ItemAPI.js';
import Weapon from '../inventory-screen/items/weapon/weapon.js';

const delayInMilliseconds = 5000;
let player = null;
let enemy = null;
let count = 0;

//Event Listeners

//Fills the background with clouds on load and checks for the initial fight
document.addEventListener('DOMContentLoaded', () => {
    player = CurrentPlayerAPI.read();
    setTimeout(function () {
        document.querySelector('.background').classList.remove('blur');
        document.querySelector('.text').innerHTML = "You look around in search of battle.";
        fillTheSky();
        setTimeout(function () {
            document.querySelector('.text').innerHTML = '';
            spawn();
        }, delayInMilliseconds - 1000)
        
    }, delayInMilliseconds);
    
});

//Allows the player to attack the enemy and be attacked by the enemy. 
//Checks if the player is dead or if the enemy is dead
document.querySelector('.attack-button').addEventListener('click', () => {
    let battleDelay = 0; //variable used to delay finishing the attack to show that a new crystal has been earned.
    const playerDamage = enemy.damage(player); //returns [damage, boolean]
    const weaponDrop = damageDurabiliy(player, playerDamage[0]); //return array [player, reward] or [player, null];
    console.log(weaponDrop);
    player = weaponDrop[0];
    if (weaponDrop[1]) {
        battleDelay = 5000;
        document.querySelector('.battle-text').innerHTML = `Your weapon has broken.<br>As the dust settles you find ${weaponDrop[1]}`
    }
    setTimeout(function () {
        const enemyDamage = Player.takeDamage(player, enemy);// [damage, player]
        player = enemyDamage[1];
        document.querySelector('.battle-text').innerHTML = `You have taken ${enemyDamage[0]} damage from ${enemy.name}.<br>`
        if (playerDamage[1] && playerDamage[0] != 0) {
            document.querySelector('.battle-text').innerHTML += `You have dealt a critical hit! <br>`
        }
        document.querySelector('.battle-text').innerHTML += `${enemy.name} has taken ${playerDamage[0]} damage.<br>`
        document.querySelector('.player-hp').innerHTML = `HP: ${player.hp}/${player.maxHP}`;
        document.querySelector('.enemy-hp').innerHTML = `HP: ${enemy.hp}/${enemy.maxHP}`;
        if (player.hp === 0)  {
            dead();
        }
        if (enemy.hp === 0) {
            reward()
        }
    }, battleDelay)
    
});

//Allows the player to control the inventory screen
document.querySelector('.inventory-button').addEventListener('click', () => {
    document.querySelector('.battle-screen').classList.add('blur');
    document.querySelector('.inventory-screen').classList.replace('fadeOut', 'fadeIn');
    document.querySelector('.inventory-screen').innerHTML += `<iframe src= '../inventory-screen/inventory-screen.html' frameborder= '0'></iframe>`
    //Closes the inventory screen
    document.querySelector('.close-button').addEventListener('click', () => {
        document.querySelector('.battle-screen').classList.remove('blur');
        document.querySelector('.inventory-screen').classList.replace('fadeIn', 'fadeOut');
        document.querySelector('.inventory-screen').innerHTML = `<button class="close-button">X</button>`
        player = CurrentPlayerAPI.read();
    });
});

//Allows the player to run away from a fight
document.querySelector('.run-button').addEventListener('click', () => {
    let boolean = canRun();
    if (boolean) {
        count = 0;
        document.querySelector('.battle-info').classList.add('fadeOut');
        document.querySelector('.battle-text').innerHTML = `<div class= 'run-screen'>You have successfully run away and made it back to the village</div>`
        CurrentPlayerAPI.save(player);
        setTimeout(function () {
            window.location.href = '../village-screen/village-screen.html';
        }, delayInMilliseconds);
    }
    if (!boolean) {
        document.querySelector('.battle-text').innerHTML = `You have tried to run away, but the creature caught up with you.<br>`
        const enemyDamage = Player.takeDamage(player, enemy); //returns [integer, player]
        player = enemyDamage[1];
        document.querySelector('.battle-text').innerHTML += `You have taken ${enemyDamage[0]} damage from ${enemy.name}.<br>`
        document.querySelector('.player-hp').innerHTML = `HP: ${player.hp}/${player.maxHP}`;
    }
});

//Allows for the player to encounter another creature
document.querySelector('.continue-button').addEventListener('click', () => {
    CurrentPlayerAPI.save(player);
    document.querySelector('.no-battle').classList.replace('fadeIn', 'fadeOut');
    document.querySelector('.text').innerHTML = "You press forward, in search of battle.";
    fillTheSky();
    setTimeout(() => {
        document.querySelector('.text').innerHTML = '';
        spawn();
    }, delayInMilliseconds);
});

document.querySelector('.return-button').addEventListener('click', () => {
    document.querySelector('.no-battle').classList.replace('fadeIn', 'fadeOut');
    document.querySelector('.text').innerHTML = 'Finding nothing else, you return to the village.'
    CurrentPlayerAPI.save(player);
    setTimeout(() => {
        window.location.href = '../village-screen/village-screen.html';
    }, delayInMilliseconds)
})


//Functions

//Function for filling the sky with clouds
function fillTheSky () {
    const clouds = document.querySelector('.background-clouds');
    //creates a random number between 1 and 5;
    const randomNumber = Math.floor((Math.random() * 5) + 1);
    for (let i = 1; i <= randomNumber; i++) {
        clouds.innerHTML += `<div class= "background-cloud cloud${i}"></div>`
    }
}
//Function for initiating comabt
function spawn() {
    const boolean = checkSpawn();
    if (boolean) {
        const battle = document.querySelector('.battle-screen').classList.replace('fadeOut', 'fadeIn');
        document.querySelector('.battle-info').classList.remove('fadeOut');
        document.querySelector('.background').classList.add('blur');
        enemy = Enemy.basicEnemy(player, count);
        console.log(enemy);
        if (enemy.enemyElement.element[0].match(/^[aeiou].*/i)) {
            document.querySelector('.battle-text').innerHTML = `You have encountered an ${enemy.enemyElement.element} ${enemy.name} prepare for battle!`
        }
        if (!(enemy.enemyElement.element[0].match(/^[aeiou].*/i))) {
            document.querySelector('.battle-text').innerHTML = `You have encountered a ${enemy.enemyElement.element} ${enemy.name} prepare for battle!`
        }
        setTimeout(function () {
            document.querySelector('.enemy').classList.add(`${enemy.name.toLowerCase()}`)
            document.querySelector('.player-hp').innerHTML = `HP: ${player.hp}/${player.maxHP}`;
            document.querySelector('.enemy-hp').innerHTML = `HP: ${enemy.hp}/${enemy.maxHP}`;
        }, delayInMilliseconds - 2000)
    }
    if (!boolean) {
        document.querySelector('.text').innerHTML = 'You look around but do not see any enemies here.<br>Would you like to continue on or return home for now?'
        document.querySelector('.no-battle').classList.replace('fadeOut', 'fadeIn');
    }
    count++;
    return
}

//Function for destroying a character that has died
function dead() {
    PlayerAPI.deletePlayer(player);
    window.location.href = '../game-over-screen/game-over-screen.html'
}

//Function for giving out a reward for beating the enemy
function reward() {
    document.querySelector('.enemy').classList.remove(`${enemy.name.toLowerCase()}`)
    const arr = addToInventory(player, enemy); //returns [player, reward]
    player = arr[0];
    document.querySelector('.battle-info').classList.add('fadeOut');
    document.querySelector('.battle-text').innerHTML = `<div class= 'reward'>You have slain the ${enemy.enemyElement.element} ${enemy.name}!<br> Reward: ${arr[1]}</div>`
    setTimeout(function () {
        document.querySelector('.battle-screen').classList.replace('fadeIn', 'fadeOut');
        document.querySelector('.text').innerHTML = 'You look around but do not see any further enemies here.<br>Would you like to continue on or return home for now?'
        document.querySelector('.no-battle').classList.replace('fadeOut', 'fadeIn');
    }, delayInMilliseconds + 2000);
}

//Function for having random encounters
function checkSpawn() {
    const ran = getRandomNumber(4);
    switch (ran) {
        case 0:
        case 1:
        case 2: return true;
        case 3: return false;
    }
}

//Function for checking if the run attempt was successful
function canRun() {
    const random = getRandomNumber(10);
    switch (random) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5: 
        case 6:
        case 7:
        case 8: return false;
        case 9: return true;
    }
}

//Function for generating random numbers
//@Params number
//returns random number between 0 (inclusive) and number (exclusive)
function getRandomNumber(number) {
    return Math.floor(Math.random() * number)
}
