import Enemy from "../enemy/enemy.js";
import Weapon from "../gamescreens/inventory-screen/items/weapon/weapon.js";
import CurrentPlayerAPI from "./CurrentPlayerAPI.js";

export default class Player {

    //Properties
    name;
    level;
    hp;
    maxHP;
    inventory;
    gold;
    usedNames;
    
    //Constructor
    constructor(name, primeWeapon) {
        this.name = name;
        this.level = 0;
        this.hp = 100;
        this.maxHP = this.hp;
        this.inventory = [[], [], []];
        this.gold = 0;
        this.usedNames = [];
        this.inventory[0][0] = primeWeapon
    }

    //Methods

    //Getters (not currently used)
    getName() {
        return this.name;
    }

    getLevel() {
        return this.level;
    }

    getInventory() {
        return this.inventory;
    }

    getGold() {
        return this.gold;
    }

    //sets a random number
    //returns true if number is 0-7 inclusive false if number is 8-9 inclusive
    static isHit() {
        const random = Player.getRandomNumber(10);
        switch (random) {
            case 0:
            case 1: 
            case 2:
            case 3: 
            case 4:
            case 5:
            case 6:
            case 7:{return true;}
            case 8:
            case 9:
        }
        return false;
    }

    //returns damage dealt
    static dealDamage(player) {
        if (Player.isHit()) {
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

    //returns a random number between 0 (inclusive) and number (exclusive)
    static getRandomNumber(number) {
        return Math.floor(Math.random() * number)
    }
}