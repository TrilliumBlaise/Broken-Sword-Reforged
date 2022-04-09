import CurrentPlayerAPI from '../../player/CurrentPlayerAPI.js';
import Player from '../../player/player.js';
import { getIndex } from './ItemAPI.js';
import { useItemFromInventory } from './ItemAPI.js';

let player = CurrentPlayerAPI.read();
if (player.length === 0) player = Player.test();

//Add eventListeners

//Allows for usability of Crystals and LevelUp orbs
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

//Allows for Drag and Drop of Weapon Slots

let dragged;
let hovered;
const DELAY = 1500;
const span = document.querySelector('.item-info');
document.querySelectorAll('.weapon').forEach(slot => {
  slot.addEventListener('mouseenter', e => {
    if (e.target.classList.contains('item')) return;
    hovered = setTimeout(() => {
      const item = slot.querySelector('.item');
      if (typeof item?.dataset?.name === 'string') {
        span.innerHTML = `
        Name: ${item.dataset.name}<br>
        Power: ${item.dataset.power}<br>
        Element 1: ${item.dataset.element1}<br>
        Element 2: ${item.dataset.element2}<br>
        Element 3: ${item.dataset.element3}<br>
        Element 4: ${item.dataset.element4}<br>`;
      }
      if (typeof item?.dataset?.name === 'number') {
        span.innerHTML = `
        Power: ${item.dataset.power}<br>
        Durability: ${item.dataset.durability}<br>
        Element: ${item.dataset.element}<br>
        `;
      }
      span.classList.add('active');
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
});
//Allows for Drag and Drop of Crystal Slots
document.querySelectorAll('.crystalSlot').forEach(slot => {
  slot.addEventListener('mouseenter', e => {
    if (e.target.classList.contains('item')) return;
    hovered = setTimeout(() => {
      const item = slot.querySelector('.item');
      if (item?.dataset?.rarity) {
        span.innerHTML = `
        Rarity: ${item.dataset.rarity}<br>
        Element: ${item.dataset.element}
        `;
      }
      span.classList.add('active');
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
});
//Allows for Drag and Drop of Orb Slots
document.querySelectorAll('.orbSlot').forEach(slot => {
  slot.addEventListener('mouseenter', e => {
    if (e.target.classList.contains('item')) return;
    hovered = setTimeout(() => {
      const item = slot.querySelector('.item');
      span.innerHTML = 'Use me to level up!';
      span.classList.add('active');
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
});
//Fills the UI slots with items from this.inventory
document.addEventListener('DOMContentLoaded', () => {
  const goldAmount = document.querySelector('.gold');
  const weaponSlots = document.querySelectorAll('.weapon');
  const crystalSlots = document.querySelectorAll('.crystalSlot');
  const orbSlots = document.querySelectorAll('.orbSlot');
  const slotsArray = [weaponSlots, crystalSlots, orbSlots];
  goldAmount.innerHTML = `Gold: ${player.gold}`;
  player.inventory.forEach((inventory, i) => {
    inventory.forEach((item, j) => {
      const slot = slotsArray[i][j];
      if (i === 0) {
        if (typeof item.name === 'number') {
          slot.innerHTML += `<div data-power= '${
            item.type.power
          } data-element= '${
            item.weaponElements[0].element
          }' data-durability= '${
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

