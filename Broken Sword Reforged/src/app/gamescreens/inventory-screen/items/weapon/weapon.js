import MyElement from '../../../../element/element.js';
import Crystal from '../crystal/crystal.js';
import WeaponType from './weapon_type.js'

export default class Weapon {
    //Properties name must be unique
    name;
    type;
    drop;
    powerModifier;
    numberCrystalsUsed
    weaponElement1;
    weaponElement2;
    weaponElement3;
    weaponElement4;

    //Constrcutors
    constructor(name, element) {
        this.name = name;
        this.type = Weapon.setWeaponType();
        this.powerModifier = 0;
        this.numberCrystalsUsed = [0,0,0]
        this.drop = 'crystal';
        this.weaponElement1 = element;
        this.weaponElement2 = MyElement.EMPTY;
        this.weaponElement3 = MyElement.EMPTY;
        this.weaponElement4 = MyElement.EMPTY;
    }
    
    //Methods
    //returns a random weaponType
    static setWeaponType() {
        const random = Math.floor(Math.random() * 6);
        return WeaponType.weaponTypeArray[random];
    }
    
    //returns the actual power of a weapon
    static getPower(weapon) {
        return weapon.type.power + weapon.powerModifier;
    }
    //Changes the element of this
    //@Params: crystal - the crystal that is used to enhance this
    static useCrystal(weapon,crystal) {
        if (typeof(weapon.name) !== 'string') {
            return;
        }
        if (crystal instanceof Crystal) {
            if (crystal.rarity === 'Basic' && weapon.weaponElement1 === MyElement.EMPTY) {
                weapon.weaponElement1 = crystal.crystalElement;
                return;
            }
            if (crystal.rarity === 'Rare' && weapon.weaponElement2 === MyElement.EMPTY) {
                weapon.weaponElement2 = crystal.crystalElement;
                return;
            }
            if (crystal.rarity === 'Epic' && weapon.weaponElement3 === MyElement.EMPTY) {
                weapon.weaponElement3 = crystal.crystalElement;
                return;
            }
            if (crystal.rarity === 'Legendary' && weapon.weaponElement4 === MyElement.EMPTY) {
                weapon.weaponElement4 = crystal.crystalElement;
                return;
            }
            weapon.powerModifier += 5;
        }
        return;
    }
}