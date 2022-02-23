import MyElement from "../element/element.js";
import Player from "../player/player.js";


export default class Enemy {
    /*structure
    enemy = {
        name: "String",
        enemyElement: MyElement,
        power: "int",
        drop: "String",
        hp: "int",
        speed: "int",
        creatur: Creature
    }
    */
    
    //properties
    name;
	enemyElement;
	power;
	drop;
	hp;
	maxHP;
	speed;
	creature;

    //Constructor
    //@Params enemyElement, creature, name, drop, hp, power, speed
    constructor (enemyElement, creature, name, drop, hp, power, speed) {
        this.enemyElement = enemyElement;
        this.creature = creature;
        this.name = name;
        this.drop = drop;
        this.hp = hp;
		this.maxHP = this.hp;
        this.power = power;
        this.speed = speed;
    }
    //Factories

	//Factory for creating a basic enemy
	//@Param player, count
    //returns an enemy
    static basicEnemy(player, count) {
        const element = MyElement.elementArray[Enemy.getRandomNumber(4)];
        const creature = Enemy.setCreature(count);
        const statArray = Enemy.setStats(player, creature)
        return new Enemy(
            element,
            creature,
            Enemy.setName(creature, element.element),
            Enemy.setDrop(player, count),
            statArray[0],
            statArray[1],
            statArray[2]
        )
    }

	//Factory for the final enemy
    //returns enemy
    static finalEnemy() {
        return new Enemy(MyElement.NONE, 'Demon', 'Evil One', 'None', 900, 65, 2.2);
    }
    //Methods

    //returns damage dealt and whether isCrit is true for false
    //@param player
    damage(player) {
		let isCrit = false;
        if (!(player.inventory)) {
            throw new Error('Illegal Argument - player must be of type Player');
        }
        let damage = (Player.dealDamage(player) + (player.level * 10));
		if (MyElement.beats(player.inventory[0][0].weaponElement1, this.enemyElement)) {
            isCrit = true;
			damage = damage * 2;
		}
		if (MyElement.beats(player.inventory[0][0].weaponElement2, this.enemyElement)) {
			isCrit = true;
			damage = damage * 2;
		}
		if (MyElement.beats(player.inventory[0][0].weaponElement3, this.enemyElement)) {
			isCrit = true;
			damage = damage * 2;
		}
		if (MyElement.beats(player.inventory[0][0].weaponElement4, this.enemyElement)) {
			isCrit = true;
			damage = damage * 2;
		}
		damage = Math.floor(damage * player.inventory[0][0].type.speed);
		this.hp = this.hp - damage;
		if (this.hp < 0) {
			this.hp = 0;
		}
        if (isCrit) {
            return [damage, true]
        }
		return [damage, false];
    }

    //returns a random number between 0 and number
    //@Param number
    static getRandomNumber (number) {
        return Math.floor(Math.random() * number);
    }

    //returns the creature tyope of this
    //@Param count
    static setCreature(count) {
        const i = Enemy.getRandomNumber(3);
		if (count >= 0 && count < 2) {
			switch (i) {
				case 0: {return "Slime";}
				case 1: {return "Undead";}
				case 2: {return "Animal";}
			}
		}
		if (count >= 2 && count < 4 ) {
			switch (i) {
				case 0: {return "Undead";}
				case 1: {return "Animal";}
				case 2: {return "Beast";}
			}
		}
		if (count>= 4 && count < 6) {
			switch (i) {
				case 0: {return "Animal";}
				case 1: {return "Beast";}
				case 2: {return "Dragon";}
			}
		}
		if (count >=6 && count <8) {
			switch (i) {
				case 0: {return "Beast";}
				case 1: {return "Dragon";}
				case 2: {return "Corrupted";}
			}
		}
		if (count >=8 && count < 10) {
			switch (i) {
			case 0: {return "Dragon";}
			case 1: {return "Corrupted"}
			default: {return "Dragon";}
			}
		}
		if (count >= 10) {
			return "Corrupted";
		}
    }

    //returns the name of this
    //@Param creature, element
    static setName(creature, element) {
        let name;
        if (creature === "Slime") {
			return name = `Slime`;
		}
		if (creature === "Animal") {
			const i = Enemy.getRandomNumber(4)
			switch (i) {
			case 0: {return name = "Bear"; }
			case 1: {return name = "Tiger"; }
			case 2: {return name = "Lion"; }
			case 3: {return name = "Boar"; }
			}
		}
		if (creature === "Undead") {
			const i = Enemy.getRandomNumber(4)
			switch (i) {
			case 0: {return name = "Wraith"; }
			case 1: {return name = "Zombie"; }
			case 2: {return name = "Lich"; }
			case 3: {return name = "Vampire";}
			}
		}
		if (creature === "Beast") {
			const i = Enemy.getRandomNumber(4)
			switch (i) {
			case 0: {return name = "Werewolf"; }
			case 1: {return name = "Yeti"; }
			case 2: {return name = "Chimera"; }
			case 3: {return name = "Chlorofiend"; }
			}
		}
		if (creature === "Dragon") {
			return name = "Dragon";
		}
		if (creature === "Corrupted") {
			return name = "Corrupted";
		}
    }

	//@params player, count
    //returns the drop of this
    static setDrop(player, count) {
        const i = Enemy.getRandomNumber(5);
        switch (i) {
            case 0: {return "weapon";}
            case 1: {return "weapon";}
            case 2: {return 100 + ((5 * player.level) * count);}
            case 3: {return 100 + ((5 * player.level) * count);}
            case 4: {return "orb";}
            }
    }

    //returns the stats of this [hp, power, speed]
    //@Param player, creature
    static setStats(player, creature) {
        if (player.level < 5) {
			if (creature === "Slime") {
				return [50,3, 1.0];
			}//close SLIME
			if (creature === "Animal") {
                return [75,5,1.3];
			}//close ANIMAL
			if (creature === "Undead") {
                return [75,15,0.7];
			}//close UNDEAD
			if (creature === "Beast") {
                return [75, 15, 1.3];
			}//close BEAST
			if (creature === "Dragon") {
                return [150,20,1.1];
			}//close DRAGON
			if (creature === "Corrupted") {
                return [150.15,1.0];
			}//close HUMAN
		}//close player.level < 5.
		if (player.level >= 5 && player.level < 10) {
			if (creature === "Slime") {
                return [100, 6, 1.5];
			}//close SLIME
			if (creature === "Animal") {
                return [100, 14, 1.0];
			}//close ANIMAL
			if (creature === "Undead") {
                return [150, 30, 1.2];
			}//close UNDEAD
			if (creature === "Beast") {
                return [150, 30, 1.0]
			}//close BEAST
			if (creature === "Dragon") {
                return [300, 40, 1.6];
			}//close DRAGON
			if(creature === "Corrupted") {
                return [300, 30, 1.5];
			}//close HUMAN
		}//close player.level >= 5 %% player.level < 10
		if (player.level >= 10) {
			if (creature === "Slime") {
                return [150, 9, 2.0];
			}//close SLIME
			if (creature === "Animal") {
                return [150, 21, 2.3];
			}//close ANIMAL
			if (creature === "Undead") {
                return [225, 45, 1.7];
			}//close UNDEAD
			if (creature === "Beast") {
                return [225, 45, 2.3];
			}//close BEAST
			if (creature === "Dragon") {
                return [450, 60, 2.1];
			}//close DRAGON
			if(creature === "Corrupted") {
                return [450, 45, 2.0];
			}//close CORRUPTED
        }//close player.level >= 10
    }
}
