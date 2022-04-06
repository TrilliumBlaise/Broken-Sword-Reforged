//Enemies array is order from weakest to strongest
/*Slime count = 0-2, Animal count = 0-3, Undead count = 0-5, Beast count = 3-7, Dragon count = 5-9, Corrupted count = 7->10*/
export const enemies = [
  {
    name: ['Slime'],
    count: { min: 0, max: 2 },
    //Stat arrays are orderd by [HP, Power, Speed]
    statsBelowLevel5: [50, 3, 1.0],
    statsBelowLevel10: [100, 6, 1.5],
    statsElse: [150, 9, 2.0],
  },
  {
    name: ['Bear', 'Tiger', 'Lion', 'Boar'],
    count: { min: 0, max: 3 },
    //Stat arrays are orderd by [HP, Power, Speed]
    statsBelowLevel5: [75, 5, 1.3],
    statsBelowLevel10: [100, 14, 1.0],
    statsElse: [150, 21, 2.3],
  },
  {
    name: ['Wraith', 'Zombie', 'Lich', 'Vampire'],
    count: { min: 0, max: 5 },
    //Stat arrays are orderd by [HP, Power, Speed]
    statsBelowLevel5: [75, 15, 0.7],
    statsBelowLevel10: [150, 30, 1.2],
    statsElse: [225, 45, 1.7],
  },
  {
    name: ['Yeti', 'Werewolf', 'Chimera', 'Chlorofiend'],
    count: { min: 3, max: 7 },
    //Stat arrays are orderd by [HP, Power, Speed]
    statsBelowLevel5: [75, 15, 1.3],
    statsBelowLevel10: [150, 30, 1.0],
    statsElse: [225, 45, 2.3],
  },
  {
    name: ['Dragon'],
    count: { min: 5, max: 9 },
    //Stat arrays are orderd by [HP, Power, Speed]
    statsBelowLevel5: [150, 20, 1.1],
    statsBelowLevel10: [300, 40, 1.6],
    statsElse: [450, 60, 2.1],
  },
  {
    name: ['Corrupted'],
    count: { min: 7, max: 1000 },
    //Stat arrays are orderd by [HP, Power, Speed]
    statsBelowLevel5: [150, 15, 1.0],
    statsBelowLevel10: [300, 30, 1.5],
    statsElse: [450, 45, 2.0],
  },
  {
    name: ['Evil One'],
    //Stat arrays are orderd by [HP, Power, Speed]
    statsBelowLevel5: [900, 65, 2.2],
    statsBelowLevel10: [900, 65, 2.2],
    statsElse: [900, 65, 2.2],
  },
];

