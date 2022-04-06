import { elements, isSameElement } from '../element/element.js';
import { enemies } from './enemies.js';
import Player from '../player/player.js';

let creature;
export function createEnemy(player, count) {
  if (!player) {
      name: enemies[enemies.length - 1].name,
      enemyElement: elements[4],
      drop: undefined,
      hp: enemies[enemies.length - 1].statsBelowLevel10[0],
      power: enemies[enemies.length - 1].statsBelowLevel10[1],
      speed: enemies[enemies.length - 1].statsBelowLevel10[2],
      takeDamage,
    };
  const enemy = {
    name: setName(count),
    enemyElement: elements[getRandomNumber(4)],
    drop: setDrop(player, count),
    hp: 0,
    power: 0,
    speed: 0,
    takeDamage,
  };
  const stats = setStats(player);
  enemy.hp = stats[0];
  enemy.maxHP = enemy.hp;
  enemy.power = stats[1];
  enemy.speed = stats[2];
  console.log(enemy.name);
  return enemy;
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
  const i = getRandomNumber(3);
  if (count >= 0 && count < 2) return enemies[i];
  if (count >= 2 && count < 4) return enemies[i + 1];
  if (count >= 4 && count < 6) return enemies[i + 2];
  if (count >= 6 && count < 8) return enemies[i + 3];
  if (count >= 8 && count < 10) {
    if (i < 2) return enemies[4];
    return enemies[5];
  }
  if (count >= 10) return enemies[5];
}
//returns the name of this
//@Param creature, element
function setName(count) {
  creature = setCreature(count);
  if (creature.name.length !== 4) return creature.name[0];
  return creature.name[getRandomNumber(creature.name.length)];
}

//@params player, count
//returns the drop of this
function setDrop(player, count) {
  const i = getRandomNumber(6);
  if (i < 3) return 'weapon';
  if (i < 5) return 100 + 5 * player.level * count;
  return 'orb';
}
//returns the stats of this [hp, power, speed]
//@Param player, creature
function setStats(player) {
  if (player.level < 5) return creature.statsBelowLevel5;
  if (player.level < 10) return creature.statsBelowLevel10;
  return creature.statsElse;
}
