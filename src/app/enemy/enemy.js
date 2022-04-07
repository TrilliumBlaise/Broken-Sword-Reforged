import { elements, isSameElement } from '../element/element.js';
import { enemies } from './enemies.js';
import Player from '../player/player.js';

let creature;
export function createEnemy(player, count) {
  if (!player)
    return {
      name: enemies[enemies.length - 1].name,
      enemyElement: elements[4],
      drop: undefined,
      hp: enemies[enemies.length - 1].statsBelowLevel10[0],
      power: enemies[enemies.length - 1].statsBelowLevel10[1],
      speed: enemies[enemies.length - 1].statsBelowLevel10[2],
      takeDamage,
    };
  const sprite = setSprite(count);
  const enemy = [
    '',
    {
      name: sprite[1],
      sprite: sprite[0],
      enemyElement: elements[getRandomNumber(4)],
      drop: setDrop(player, count),
      hp: 0,
      power: 0,
      speed: 0,
      takeDamage,
    },
  ];
  const stats = setStats(player);
  enemy[1].hp = stats[0];
  enemy[1].maxHP = enemy[1].hp;
  enemy[1].power = stats[1];
  enemy[1].speed = stats[2];
  enemy[0] = createElement(enemy[1]);
  return enemy;
}

function createElement(enemy) {
  const enemyDiv = document.createElement('div');
  enemyDiv.classList.add('enemy');
  enemyDiv.style.backgroundImage = enemy.sprite.backgroundImage;
  enemyDiv.style.backgroundRepeat = enemy.sprite.backgroundRepeat;
  enemyDiv.style.backgroundPosition = enemy.sprite.backgroundPosition;
  enemyDiv.style.backgroundSize = `${enemy.sprite.backgroundSize[0]}% ${enemy.sprite.backgroundSize[1]}%`;
  const enemyInfo = document.createElement('div');
  enemyInfo.classList.add('enemy-hp');
  enemyDiv.append(enemyInfo);
  return enemyDiv;
}

function takeDamage(player) {
  let isCrit = false;
  if (!player.inventory) {
    throw new Error('Illegal Argument - player must be of type Player');
  }
  let damage = Player.dealDamage(player) + player.level * 10;
  player.inventory[0][0].weaponElements.forEach(weaponElement => {
    if (isSameElement(weaponElement.beats, this.enemyElement)) {
      isCrit = true;
      damage = damage * 2;
    }
  });
  damage = Math.floor(damage * player.inventory[0][0].type.speed);
  this.hp = this.hp - damage;
  if (this.hp < 0) {
    this.hp = 0;
  }
  if (isCrit) {
    return [damage, true];
  }
  return [damage, false];
}

function getRandomNumber(number) {
  return Math.floor(Math.random() * number);
}
//returns the creature type of this
//@Param count
function setCreature(count) {
  const countEnemies = enemies.filter(enemy => {
    if (enemy.count?.min <= count && count <= enemy.count?.max) return enemy;
  });
  if (countEnemies.length < 3) countEnemies.push(countEnemies[0]);
  return countEnemies[getRandomNumber(countEnemies.length)];
}
//returns the name of this
//@Param creature, element
function setSprite(count) {
  creature = setCreature(count);
  const index = getRandomNumber(creature.name.length);
  return [creature.sprites[index], creature.name[index]];
}

//@params player, count
//returns the drop of this
function setDrop(player, count) {
  const i = getRandomNumber(10);
  if (i < 8) return 'weapon';
  if (i < 9) return 100 + 5 * player.level * count;
  return 'orb';
}
//returns the stats of this [hp, power, speed]
//@Param player, creature
function setStats(player) {
  if (player.level < 5) return creature.statsBelowLevel5;
  if (player.level < 10) return creature.statsBelowLevel10;
  return creature.statsElse;
}
