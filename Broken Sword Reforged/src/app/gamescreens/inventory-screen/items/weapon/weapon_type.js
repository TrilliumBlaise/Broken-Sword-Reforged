export default class WeaponType {
    static DAGGER = new WeaponType('Dagger', 4, 2.0, 75);
    static SWORD = new WeaponType('Sword', 10, 1.0, 100);
    static CLUB = new WeaponType('Club', 15, 0.9, 150);
    static SPEAR = new WeaponType('Spear', 10, 1.5, 75);
    static AXE = new WeaponType('Axe', 20, 0.8, 150);
    static SHIELD = new WeaponType('Shield', 15, 1.1, 200);

    type = '';
    power = 0;
    speed = 0;
    durability = 0;

    static weaponTypeArray = [WeaponType.DAGGER, WeaponType.SWORD, WeaponType.CLUB, WeaponType.SPEAR, WeaponType.AXE, WeaponType.SHIELD];

    constructor(type, power, speed, durability) {
        this.type = type;
        this.power = power;
        this.speed = speed;
        this.durability = durability;
    }

    get type() {
        return this.type;
    }

    get power() {
        return this.power;
    }

    get speed() {
        return this.speed;
    }

    get durability() {
        return this.durability;
    }

    get weaponTypeArray() {
        return WeaponType.weaponTypeArray
    }
}