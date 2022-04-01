export class Crystal {
  constructor(element, id) {
    this.crystalElement = element;
    this.rarity = setRarity();
    this.id = id;
  }
}

//Returns a random rarity level for a crystal
function setRarity() {
  const ran = Math.floor(Math.random() * 10);
  if (ran < 4) return 'Basic';
  if (ran < 7) return 'Rare';
  if (ran < 9) return 'Epic';
  return 'Legendary';
}
