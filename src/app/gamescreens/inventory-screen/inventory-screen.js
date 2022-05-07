import CurrentPlayerAPI from '../../player/CurrentPlayerAPI.js';
import Player from '../../player/player.js';
import { getIndex } from './ItemAPI.js';
import { useItemFromInventory } from './ItemAPI.js';

let player = CurrentPlayerAPI.read();
if (player.length === 0) player = Player.test();

//Add eventListeners
const screenWidth = screen.availWidth;
//Allows for usability of Crystals and LevelUp orbs
let useItem;
document.querySelectorAll('.inventory-slot').forEach(slot => {
  for (let i = 1; i < 10; i++) {
    if (slot.id === `crystal-${i}`) {
      slot.addEventListener('dblclick', () => {
        player = useItemFromInventory(player, player.inventory[1][i - 1]);
        CurrentPlayerAPI.save(player);
      });
    }
    if (slot.id === `orb-${i}`) {
      slot.addEventListener('dblclick', () => {
        player = useItemFromInventory(player, player.inventory[2][i - 1]);
        CurrentPlayerAPI.save(player);
      });
    }
  }
});

//Allows for Drag and Drop of Weapon Slots and Hovered
let dragged;
let hovered;
const DELAY = 1500;
const span = document.querySelector('.item-info');
document.querySelectorAll('.weapon').forEach(slot => {
  if (screenWidth > 950) {
    addDragDropHoverWeaponSlots(slot);
  }
  if (screenWidth < 951) {
    addClickSortWeaponSlots(slot);
  }
});
//Allows for Drag and Drop of Crystal Slots and Hover
document.querySelectorAll('.crystalSlot').forEach(slot => {
  if (screenWidth > 950) {
    addDragDropHoverCrystalSlots(slot);
  }
  if (screenWidth < 951) {
    addClickSortCrystalSlots(slot);
  }
});
//Allows for Drag and Drop of Orb Slots and Hover
document.querySelectorAll('.orbSlot').forEach(slot => {
  if (screenWidth > 950) {
    addDragDropHoverOrbSlots(slot);
  }
  if (screenWidth < 951) {
    addClickSortOrbSlots(slot);
  }
});
//Fills the UI slots with items from this.inventory
document.addEventListener('DOMContentLoaded', () => {
  const goldAmount = document.querySelector('.gold-amount');
  const playerLevel = document.querySelector('.level');
  const weaponSlots = document.querySelectorAll('.weapon');
  const crystalSlots = document.querySelectorAll('.crystalSlot');
  const orbSlots = document.querySelectorAll('.orbSlot');
  const slotsArray = [weaponSlots, crystalSlots, orbSlots];
  if (screenWidth < 951) addUseButton();
  goldAmount.innerHTML = `Gold: ${player.gold}`;
  playerLevel.innerHTML = `Level: ${player.level}`;
  player.inventory.forEach((inventory, i) => {
    inventory.forEach((item, j) => {
      const slot = slotsArray[i][j];
      if (i === 0) {
        if (typeof item.name === 'number') {
          slot.innerHTML += `<div data-power= '${item.type.power}' data-element= '${item.weaponElements[0].element}' data-durability= '${
            item.type.durability
          }' class= 'item ${item.type.type.toLowerCase()}' draggable = 'true'></div>`;
        }
        if (typeof item.name === 'string') {
          slot.innerHTML += `<div 
          data-name= '${item.name}' 
          data-element1= '${item.weaponElements[0].element}' 
          data-element2= '${item.weaponElements[1].element}'
          data-element3= '${item.weaponElements[2].element}'
          data-element4= '${item.weaponElements[3].element}' 
          data-power= '${item.type.power}'  
          class= 'item ${item.type.type.toLowerCase()}' 
          draggable = 'true'></div>`;
        }
      }
      if (i === 1) {
        slot.innerHTML += `<div data-rarity='${item.rarity}' data-element= '${
          item.crystalElement.element
        }' class= 'item crystal ${item.crystalElement.element.toLowerCase()}' draggable = 'true'></div>`;
      }
      if (i === 2) {
        slot.innerHTML += `<div class= 'item orb' draggable = 'true'></div>`;
      }
    });
  });
});

function addUseButton() {
  const button = document.createElement('button');
  button.innerText = 'USE';
  button.classList.add('use');
  button.addEventListener('click', e => {
    console.log(useItem);
    if (useItem.classList.contains('crystal')) {
      const index = getIndex(useItem.closest('.crystalSlot'));
      player = useItemFromInventory(player, player.inventory[1][index]);
      CurrentPlayerAPI.save(player);
    }
  });
  document.querySelector('.level_up-row').appendChild(button);
}

function setSpan(slot) {
  const item = slot.querySelector('.item');
  if (item.classList.contains('orb')) {
    span.innerHTML = 'Use me to level up!';
  }
  if (item.classList.contains('crystal')) {
    span.innerHTML = `
    Rarity: ${item.dataset.rarity}<br>
    Element: ${item.dataset.element}
    `;
  }
  if (item?.dataset?.name) {
    if (screenWidth < 951) {
      span.innerHTML = `
        Name: ${item.dataset.name} Power: ${item.dataset.power}<br>
        Element 1: ${item.dataset.element1} Element 2: ${item.dataset.element2}<br>
        Element 3: ${item.dataset.element3} Element 4: ${item.dataset.element4}<br>
      `;
    } else {
      span.innerHTML = `
      Name: ${item.dataset.name}<br>
      Power: ${item.dataset.power}<br>
      Element 1: ${item.dataset.element1}<br>
      Element 2: ${item.dataset.element2}<br>
      Element 3: ${item.dataset.element3}<br>
      Element 4: ${item.dataset.element4}<br>
    `;
    }
  }
  if (item?.dataset?.durability) {
    span.innerHTML = `
      Element: ${item.dataset.element}<br>
      Power: ${item.dataset.power}<br>
      Durability: ${item.dataset.durability}<br>
    `;
  }
  span.classList.add('active');
}

function addDragDropHoverWeaponSlots(slot) {
  slot.addEventListener('mouseenter', e => {
    if (e.target.classList.contains('item')) return;
    hovered = setTimeout(() => {
      setSpan(slot);
    }, DELAY);
  });
  slot.addEventListener('mouseleave', () => {
    clearTimeout(hovered);
    span.innerHTML = '';
    span.classList.remove('active');
  });
  slot.addEventListener('dragstart', e => {
    const index = getIndex(slot);
    dragged = [e.target, index, slot];
    e.dataTransfer.setData('text/plain', player.inventory[0][index]);
  });
  slot.addEventListener('dragover', e => {
    e.preventDefault();
  });
  slot.addEventListener('dragenter', e => {
    if (e.target.classList.contains('weapon')) {
      slot.children[0].classList.add('dropzone--active');
    }
  });
  slot.addEventListener('dragleave', e => {
    if (slot.children[0].classList.contains('dropzone--active')) {
      slot.children[0].classList.remove('dropzone--active');
    }
  });
  slot.addEventListener('drop', e => {
    e.preventDefault();
    const initialIndex = dragged[1];
    const newIndex = getIndex(slot);
    const initialItem = player.inventory[0][initialIndex];
    const newItem = player.inventory[0][newIndex];
    player.inventory[0].splice(initialIndex, 1, newItem);
    player.inventory[0].splice(newIndex, 1, initialItem);
    if (player.inventory[0][initialIndex]) {
      slot.appendChild(dragged[0]);
      if (slot.children[0].classList.contains('dropzone--active')) {
        slot.children[0].classList.remove('dropzone--active');
      }
      if (slot.children.length > 1) {
        dragged[2].appendChild(e.target);
      }
      CurrentPlayerAPI.save(player);
      return;
    }
    player.inventory[0].splice(initialIndex, 1, initialItem);
    player.inventory[0].splice(newIndex, 1);
    if (slot.children[0].classList.contains('dropzone--active')) {
      slot.children[0].classList.remove('dropzone--active');
    }
  });
}

function addClickSortWeaponSlots(slot) {
  slot.addEventListener('click', e => {
    setSpan(slot);
    if (!dragged) {
      const index = getIndex(slot);
      dragged = [e.target, index, slot];
      slot.style.backgroundColor = 'lightblue';
      setTimeout(() => {
        dragged = undefined;
        slot.style.backgroundColor = 'white';
      }, 1000);
      return;
    }
    dragged[2].style.backgroundColor = 'white';
    const initialIndex = dragged[1];
    const newIndex = getIndex(slot);
    const initialItem = player.inventory[0][initialIndex];
    const newItem = player.inventory[0][newIndex];
    player.inventory[0].splice(initialIndex, 1, newItem);
    player.inventory[0].splice(newIndex, 1, initialItem);
    if (player.inventory[0][initialIndex]) {
      slot.appendChild(dragged[0]);
      if (slot.children[0].classList.contains('dropzone--active')) {
        slot.children[0].classList.remove('dropzone--active');
      }
      if (slot.children.length > 1) {
        dragged[2].appendChild(e.target);
      }
      CurrentPlayerAPI.save(player);
      dragged = undefined;
      return;
    }
    player.inventory[0].splice(initialIndex, 1, initialItem);
    player.inventory[0].splice(newIndex, 1);
    if (slot.children[0].classList.contains('dropzone--active')) {
      slot.children[0].classList.remove('dropzone--active');
    }
    dragged = undefined;
  });
}

function addDragDropHoverCrystalSlots(slot) {
  slot.addEventListener('mouseenter', e => {
    if (e.target.classList.contains('item')) return;
    hovered = setTimeout(() => {
      setSpan(slot);
    }, DELAY);
  });
  slot.addEventListener('mouseleave', () => {
    clearTimeout(hovered);
    span.innerHTML = '';
    span.classList.remove('active');
  });
  slot.addEventListener('dragstart', e => {
    const index = getIndex(slot);
    dragged = [e.target, index, slot];
    e.dataTransfer.setData('text/plain', player.inventory[1][index]);
  });
  slot.addEventListener('dragover', e => {
    e.preventDefault();
  });
  slot.addEventListener('dragenter', e => {
    if (e.target.classList.contains('crystal')) {
      slot.children[0].classList.add('dropzone--active');
    }
  });
  slot.addEventListener('dragleave', e => {
    if (slot.children[0].classList.contains('dropzone--active')) {
      slot.children[0].classList.remove('dropzone--active');
    }
  });
  slot.addEventListener('drop', e => {
    e.preventDefault();
    const initialIndex = dragged[1];
    const newIndex = getIndex(slot);
    const initialItem = player.inventory[1][initialIndex];
    const newItem = player.inventory[1][newIndex];
    player.inventory[1].splice(initialIndex, 1, newItem);
    player.inventory[1].splice(newIndex, 1, initialItem);
    if (player.inventory[2][initialIndex]) {
      slot.appendChild(dragged[0]);
      if (slot.children[0].classList.contains('dropzone--active')) {
        slot.children[0].classList.remove('dropzone--active');
      }
      if (slot.children.length > 1) {
        dragged[2].appendChild(e.target);
      }
      CurrentPlayerAPI.save(player);
      return;
    }
    player.inventory[1].splice(initialIndex, 1, initialItem);
    player.inventory[1].splice(newIndex, 1);
    if (slot.children[0].classList.contains('dropzone--active')) {
      slot.children[0].classList.remove('dropzone--active');
    }
  });
}

function addClickSortCrystalSlots(slot) {
  slot.addEventListener('click', e => {
    setSpan(slot);
    useItem = e.target;
    const currentColor = e.target.style.backgroundColor;
    if (!dragged) {
      const index = getIndex(slot);
      dragged = [e.target, index, slot];
      e.target.style.backgroundColor = 'lightblue';
      setTimeout(() => {
        dragged = undefined;
        e.target.style.backgroundColor = currentColor;
      }, 1000);
      return;
    }
    dragged[0].style.backgroundColor = currentColor;
    const initialIndex = dragged[1];
    const newIndex = getIndex(slot);
    const initialItem = player.inventory[1][initialIndex];
    const newItem = player.inventory[1][newIndex];
    player.inventory[1].splice(initialIndex, 1, newItem);
    player.inventory[1].splice(newIndex, 1, initialItem);
    if (player.inventory[2][initialIndex]) {
      slot.appendChild(dragged[0]);
      if (slot.children[0].classList.contains('dropzone--active')) {
        slot.children[0].classList.remove('dropzone--active');
      }
      if (slot.children.length > 1) {
        dragged[2].appendChild(e.target);
      }
      CurrentPlayerAPI.save(player);
      dragged = undefined;
      return;
    }
    player.inventory[1].splice(initialIndex, 1, initialItem);
    player.inventory[1].splice(newIndex, 1);
    if (slot.children[0].classList.contains('dropzone--active')) {
      slot.children[0].classList.remove('dropzone--active');
    }
    dragged = undefined;
  });
}

function addDragDropHoverOrbSlots(slot) {
  slot.addEventListener('mouseenter', e => {
    if (e.target.classList.contains('item')) return;
    hovered = setTimeout(() => {
      setSpan(slot);
    }, DELAY);
  });
  slot.addEventListener('mouseleave', () => {
    clearTimeout(hovered);
    span.innerHTML = '';
    span.classList.remove('active');
  });
  slot.addEventListener('dragstart', e => {
    const index = getIndex(slot);
    dragged = [e.target, index, slot];
    e.dataTransfer.setData('text/plain', player.inventory[2][index]);
  });
  slot.addEventListener('dragover', e => {
    e.preventDefault();
  });
  slot.addEventListener('dragenter', e => {
    if (e.target.classList.contains('crystal')) {
      slot.children[0].classList.add('dropzone--active');
    }
  });
  slot.addEventListener('dragleave', e => {
    if (slot.children[0].classList.contains('dropzone--active')) {
      slot.children[0].classList.remove('dropzone--active');
    }
  });
  slot.addEventListener('drop', e => {
    e.preventDefault();
    const initialIndex = dragged[1];
    const newIndex = getIndex(slot);
    const initialItem = player.inventory[2][initialIndex];
    const newItem = player.inventory[2][newIndex];
    player.inventory[2].splice(initialIndex, 1, newItem);
    player.inventory[2].splice(newIndex, 1, initialItem);
    if (player.inventory[2][initialIndex]) {
      slot.appendChild(dragged[0]);
      if (slot.children[0].classList.contains('dropzone--active')) {
        slot.children[0].classList.remove('dropzone--active');
      }
      if (slot.children.length > 1) {
        dragged[2].appendChild(e.target);
      }
      CurrentPlayerAPI.save(player);
      return;
    }
    player.inventory[2].splice(initialIndex, 1, initialItem);
    player.inventory[2].splice(newIndex, 1);
    if (slot.children[0].classList.contains('dropzone--active')) {
      slot.children[0].classList.remove('dropzone--active');
    }
  });
}

function addClickSortOrbSlots(slot) {
  slot.addEventListener('click', e => {
    setSpan(slot);
    if (!dragged) {
      const index = getIndex(slot);
      dragged = [e.target, index, slot];
      slot.style.backgroundColor = 'lightblue';
      setTimeout(() => {
        dragged = undefined;
        slot.style.backgroundColor = 'white';
      }, 1000);
      return;
    }
    dragged[2].style.backgroundColor = 'white';
    const initialIndex = dragged[1];
    const newIndex = getIndex(slot);
    const initialItem = player.inventory[2][initialIndex];
    const newItem = player.inventory[2][newIndex];
    player.inventory[2].splice(initialIndex, 1, newItem);
    player.inventory[2].splice(newIndex, 1, initialItem);
    if (player.inventory[2][initialIndex]) {
      slot.appendChild(dragged[0]);
      if (slot.children[0].classList.contains('dropzone--active')) {
        slot.children[0].classList.remove('dropzone--active');
      }
      if (slot.children.length > 1) {
        dragged[2].appendChild(e.target);
      }
      CurrentPlayerAPI.save(player);
      dragged = undefined;
      return;
    }
    player.inventory[2].splice(initialIndex, 1, initialItem);
    player.inventory[2].splice(newIndex, 1);
    if (slot.children[0].classList.contains('dropzone--active')) {
      slot.children[0].classList.remove('dropzone--active');
    }
    dragged = undefined;
  });
}

