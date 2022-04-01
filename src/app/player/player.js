import Weapon from '../gamescreens/inventory-screen/items/weapon/weapon.js';

export default class Player {
  constructor(name, primeWeapon) {
    this.name = name;
    this.level = 0;
    this.hp = 100;
    this.maxHP = this.hp;
    this.inventory = [[primeWeapon], [], []];
    this.gold = 0;
    this.usedNames = [];
  }

  //Methods

  //returns damage dealt
  static dealDamage(player) {
    if (isHit()) {
      return Weapon.getPower(player.inventory[0][0]);
    }
    return 0;
  }

  //@param enemy
  //@return [i, player]
  static takeDamage(player, enemy) {
    const i = Math.floor(enemy.power * enemy.speed);
    player.hp = player.hp - i;
    if (player.hp < 0) {
      player.hp = 0;
    }

    return [i, player];
  }
}

//returns true if number is 0-7 inclusive false if number is 8-9 inclusive
function isHit() {
  const random = Math.floor(Math.random() * 10);
  if (random < 8) return true;
  return false;
}
