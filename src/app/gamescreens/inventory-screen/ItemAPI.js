import Weapon from './items/weapon/weapon.js'
import Crystal from "./items/crystal/crystal.js";

//Function for adding an item to the inventory
//@Param: dropper - the item or enemy that is giving the new item
//@Param: player
//returns [player, reward]
export function addToInventory(player, dropper) {
    console.log(player);
    const drop = dropper.drop;
    if (typeof(drop) === 'number') {
        player.gold += drop;
        return [player, `${drop} Gold`]
    }
    if (drop === 'weapon') {
        const weapon = new Weapon(randomName(player.usedNames), dropper.enemyElement);
        if (player.inventory[0].length === 11) {
            alert('Your weapon inventory is full and so the new weapon is lost.');
            
        }
        player.inventory[0].push(weapon)
        return [player, weapon.type.type];
    }
    if (drop === 'orb') {
        if (player.inventory[2].length === 5) {
            alert('Your level up inventory is full and the level up orb is lost.')
        }
        const orb = `orb ${randomName(player.usedNames)}`
        player.inventory[2].push(orb);
        return [player, 'Level Orb'];

    }
    if (drop === 'crystal') {
        if (player.inventory[1].length === 10) {
            alert('Your crystal inventory is full and the new crystal is lost.')
        }
        const crystal = new Crystal(dropper.weaponElement1, randomName(player.usedNames));
        player.inventory[1].push(crystal);
        if (crystal.rarity.match(/^[aeiou].*/i)) {
            return [player, `An ${crystal.rarity} ${crystal.crystalElement.element} Crystal`];
        }
        return [player, `A ${crystal.rarity} ${crystal.crystalElement.element} Crystal`];
    }
}

//Function for removing an item from the inventory
//Preconditions:
    //1. If item === crsytal or item === orb, then function is being called from inventory-screen.js
//@Params: item - the item being removed
//@Param: player
//returns player
export function useItemFromInventory(player, item) {
    
    if (typeof(item) === 'number') {
        player.gold -= item;
        return player
    }
    if (item.drop === 'crystal' && typeof(item.name) === 'number') {
        player.inventory[0].splice(0, 1);
        return player;
    }
    if (item.crystalElement) {
        const index = player.inventory[1].indexOf(item);
        const boolean = checkCrystalUsage(player.inventory[0][0], item);
        if (!(boolean)) {
           alert("Your crystal shines momentarily and then the crystal shatters. Nothing seems to have changed...");
        }
        if (boolean) {
            Weapon.useCrystal(player.inventory[0][0], item);
        }
        if (player.inventory[1].length === 1) {
            document.querySelector(`#crystal-1`).innerHTML = ''
        }
        player.inventory[1].splice(index, 1);
        for (let i = 0; i < player.inventory[1].length; i++) {
            const crystal = player.inventory[1][i];
            document.querySelector(`#crystal-${i + 1}`).innerHTML = `<div class= 'item crystal ${crystal.element.element.toLowerCase()}' draggable = 'true'>${crystal.rarity}</div>`
            document.querySelector(`#crystal-${(i + 2)}`).innerHTML = ''
        }
        return player;
    }
    if (typeof(item) === 'string') {
        const index = player.inventory[2].indexOf(item);
        if (player.inventory[2].length === 1) {
            document.querySelector(`#orb-1`).innerHTML = ''
        }
        player.inventory[2].splice(index, 1);
        if (player.level < 10) {
            player.level += 1;
            player.maxHP += 25;
            player.hp = player.maxHP;
        }
        for (let i = 0; i < player.inventory[2].length; i++) {
            const orb = player.inventory[2][i];
            document.querySelector(`#orb-${i + 1}`).innerHTML = `<div class= 'item orb' draggable = 'true'></div>`
            document.querySelector(`#orb-${(i + 2)}`).innerHTML = ''
        }
        return player;
    }
    
}

//Function for damaging a weapon's durablity
//@Param: player
//@Param: damageToDurability - the damage being done to the weapon
//return either [player, null] or [player,reward]
export function damageDurabiliy(player, damageToDurablity) {
    console.log(typeof(player.inventory[0][0].name))
    if (typeof(player.inventory[0][0].name) === 'string') {
        return [player, null];
    }
    const durablity = player.inventory[0][0].type.durability -= damageToDurablity;
    if (durablity <= 0) {
        const arr = addToInventory(player, player.inventory[0][0]);
        const reward = arr[1];
        player = arr[0];
        player = useItemFromInventory(player, player.inventory[0][0]);
        return [player,reward]
    }
}
//Helper functions

//Returns the index of an item
//@Params: slot
export function getIndex(slot) {
    const thisClass = slot.classList[1];
    const slots = document.querySelectorAll(`.${thisClass}`);
    switch (slot) {
        case slots[0]: return 0;
        case slots[1]: return 1;
        case slots[2]: return 2;
        case slots[3]: return 3;
        case slots[4]: return 4;
        case slots[5]: return 5;
        case slots[6]: return 6;
        case slots[7]: return 7;
        case slots[8]: return 8;
        case slots[9]: return 9;
        case slots[10]: return 10;
    }
}

//Checks to see if the crystal usage number is correct
//@Params: weapon, crystal
//returns true if the crystals used is below x returns false otherwise
export function checkCrystalUsage(weapon, crystal) {
    if (typeof(weapon.name) != 'string') {
        return;
    }
    if (crystal.rarity === 'Basic' && weapon.numberCrystalsUsed[0] < 2) {
        weapon.numberCrystalsUsed[0]++;
        return true;
    }
    if (crystal.rarity === 'Rare' && weapon.numberCrystalsUsed[1] < 3) {
        weapon.numberCrystalsUsed[1]++;
        return true;
    }
    if (crystal.rarity === 'Epic' && weapon.numberCrystalsUsed[3] < 4) {
        weapon.numberCrystalsUsed[2]++;
        return true;
    }
    if (crystal.rarity === 'Legendary') {
        return true;
    }
    return false;
}

//Creates a unique id for each item in the game
function randomName(usedNames) {
    const ran = Math.floor(Math.random() * 999999)
    if (usedNames.indexOf(ran) !== -1) {
        randomName();
    }
    usedNames.push(ran);
    return ran;
}
