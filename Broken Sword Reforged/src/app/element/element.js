export default class MyElement {
    
    //The Elements
    static FIRE = new MyElement('Fire');
    static WATER = new MyElement('Water');
    static AIR = new MyElement('Air');
    static EARTH = new MyElement('Earth');
    static EMPTY = new MyElement('None');

    //Properties
    element;

    //Array for getting random Element
    static elementArray = [MyElement.FIRE, MyElement.WATER, MyElement.AIR, MyElement.EARTH];

    //Constructor
    constructor(element) {
        this.element = element;
    }
    //Getters (not currently used)
    get elementArray() {
        return MyElement.elementArray;
    }

    get element() {
        return this.element;
    }

    //Method for checking if an element is beaten by another elemeent.
    //@Params: current, other
    //returns true if current beats other else returns false
    static beats(current, other) {
        if (current.element === 'Fire' && other.element === 'Earth') {
            return true;
        }
        if (current.element === 'Water' && other.element === 'Fire') {
            return true;
        }
        if (current.element === 'Air' && other.element === 'Water') {
            return true;
        }
        if (current.element === 'Earth' && other.element === 'Air') {
            return true;
        }
        return false;
    }
}