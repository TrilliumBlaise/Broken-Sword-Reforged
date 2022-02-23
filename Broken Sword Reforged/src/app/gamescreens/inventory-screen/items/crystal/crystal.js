export default class Crystal {
    //Propeties
    crystalElement;
    rarity;
    id;

    //Constructor
    constructor(element, id) {
        this.crystalElement = element;
        this.rarity = Crystal.setRarity();
        this.id = id;
    }

    get element() {
        return this.element;
    }

    //Returns a random rarity level for a crystal
    static setRarity() {
        const ran = Math.floor(Math.random() * 10);
        switch (ran) {
            case 0: return 'Basic';
            case 1: return 'Basic';
            case 2: return 'Basic';
            case 3: return 'Basic';
            case 4: return 'Rare';
            case 5: return 'Rare'
            case 6: return 'Rare'
            case 7: return 'Epic'
            case 8: return 'Epic'
            case 9: return 'Legendary'
        }
    }
}