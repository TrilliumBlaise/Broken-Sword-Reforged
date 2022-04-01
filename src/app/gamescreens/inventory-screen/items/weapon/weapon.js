import { elements, isSameElement } from '../../../../element/element.js';
import { weapons } from './weapon_type.js';

export default class Weapon {
  constructor(
    name,
    element1,
    element2 = elements[4],
    element3 = elements[4],
    element4 = elements[4]
  ) {
    this.name = name;
    this.type = weapons[Math.floor(Math.random() * weapons.length)];
    this.powerModifier = 0;
    this.numberCrystalsUsed = [0, 0, 0];
    this.drop = 'crystal';
    this.weaponElements = [element1, element2, element3, element4];
  }
  //Methods
  static getPower(weapon) {
    return weapon.type.power + weapon.powerModifier;
  }
  //Changes the element of this
  //@Params: crystal - the crystal that is used to enhance this
  static enhanceWeapon(weapon, crystal) {
    if (typeof weapon.name !== 'string') {
      return;
    }
    if (crystal.crystalElement) {
      if (
        crystal.rarity === 'Basic' &&
        isSameElement(weapon.weaponElements[0], elements[4])
      ) {
        weapon.weaponElements[0] = crystal.crystalElement;
        return;
      }
      if (
        crystal.rarity === 'Rare' &&
        isSameElement(weapon.weaponElements[1], elements[4])
      ) {
        weapon.weaponElements[1] = crystal.crystalElement;
        return;
      }
      if (
        crystal.rarity === 'Epic' &&
        isSameElement(weapon.weaponElements[2], elements[4])
      ) {
        weapon.weaponElements[2] = crystal.crystalElement;
        return;
      }
      if (
        crystal.rarity === 'Legendary' &&
        isSameElement(weapon.weaponElements[3], elements[4])
      ) {
        weapon.weaponElement4 = crystal.crystalElement;
        return;
      }
      weapon.powerModifier += 5;
    }
    return;
  }
}
