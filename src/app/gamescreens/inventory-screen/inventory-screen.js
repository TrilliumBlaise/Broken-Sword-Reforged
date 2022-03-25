import CurrentPlayerAPI from "../../player/CurrentPlayerAPI.js";
import { getIndex } from "./ItemAPI.js";
import { useItemFromInventory } from "./ItemAPI.js";

let player = CurrentPlayerAPI.read()

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
                player = useItemFromInventory(player, player.inventory[2][i - 1])
                CurrentPlayerAPI.save(player);
            });
        }
    }
});

document.querySelector('.inventory').addEventListener('dblclick', () => {
    fillInInventory(); 
});

//Allows for Drag and Drop of Weapon Slots
let dragged;
document.querySelectorAll('.weapon').forEach(slot => {
    slot.addEventListener('dragstart', e => {
        const index = getIndex(slot);
        dragged = [e.target, index, slot];
        e.dataTransfer.setData('text/plain', player.inventory[0][index])
    });
    slot.addEventListener('dragover', e => {
        e.preventDefault();
    });
    slot.addEventListener('dragenter', e => {
        if (e.target.classList.contains('weapon')) {
            slot.children[0].classList.add('dropzone--active')
        }
    });
    slot.addEventListener('dragleave', e => {
        if (slot.children[0].classList.contains('dropzone--active')) {
            slot.children[0].classList.remove('dropzone--active')
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
                slot.children[0].classList.remove('dropzone--active')
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
            slot.children[0].classList.remove('dropzone--active')
        }
        
    })
});
//Allows for Drag and Drop of Crystal Slots
document.querySelectorAll('.crystalSlot').forEach(slot => {
    slot.addEventListener('dragstart', e => {
        const index = getIndex(slot);
        dragged = [e.target, index, slot];
        e.dataTransfer.setData('text/plain', player.inventory[1][index])
    });
    slot.addEventListener('dragover', e => {
        e.preventDefault();
    });
    slot.addEventListener('dragenter', e => {
        if (e.target.classList.contains('crystal')) {
            slot.children[0].classList.add('dropzone--active')
        }
    });
    slot.addEventListener('dragleave', e => {
        if (slot.children[0].classList.contains('dropzone--active')) {
            slot.children[0].classList.remove('dropzone--active')
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
                slot.children[0].classList.remove('dropzone--active')
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
            slot.children[0].classList.remove('dropzone--active')
        }
        
    })
})
//Allows for Drag and Drop of Orb Slots
document.querySelectorAll('.orbSlot').forEach(slot => {
    slot.addEventListener('dragstart', e => {
        const index = getIndex(slot);
        dragged = [e.target, index, slot];
        e.dataTransfer.setData('text/plain', player.inventory[2][index])
    });
    slot.addEventListener('dragover', e => {
        e.preventDefault();
    });
    slot.addEventListener('dragenter', e => {
        if (e.target.classList.contains('crystal')) {
            slot.children[0].classList.add('dropzone--active')
        }
    });
    slot.addEventListener('dragleave', e => {
        if (slot.children[0].classList.contains('dropzone--active')) {
            slot.children[0].classList.remove('dropzone--active')
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
                slot.children[0].classList.remove('dropzone--active')
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
            slot.children[0].classList.remove('dropzone--active')
        }
        
    })
});
//Fills the UI slots with items from this.inventory
document.addEventListener('DOMContentLoaded', () => {
    fillInInventory();
})

function fillInInventory() {
    const goldAmount = document.querySelector('.gold-amount');
    const playerLevel = document.querySelector('.level');
    const weaponSlots = document.querySelectorAll('.weapon');
    const crystalSlots = document.querySelectorAll('.crystalSlot');
    const orbSlots = document.querySelectorAll('.orbSlot');
    const slotsArray = [weaponSlots, crystalSlots, orbSlots];
    goldAmount.innerHTML = `Gold: ${player.gold}`;
    playerLevel.innerHTML = `${player.name}'s Level: ${player.level + 1}`
    for (let i = 0; i < player.inventory.length; i++) {
        let inventory = player.inventory[i];
        for (let j = 0; j < inventory.length; j++) {
            let slot = slotsArray[i][j];
            let item = inventory[j];
            if (i === 0) {
                if (typeof(item.name) === 'number') {
                    slot.innerHTML += `<div class= 'item ${item.type.type.toLowerCase()}' draggable = 'true'>
                    <span> Element: ${item.weaponElement1.element}<br>
                    Power: ${item.type.power}<br>
                    Durability: ${item.type.durability}</span>
                    </div>`
                }
                if (typeof(item.name) === 'string') {
                    slot.innerHTML += `<div  class= 'item ${item.type.type.toLowerCase()}' draggable = 'true'>
                    <span>Weapon of Light: ${item.name}<br>
                    Element 1: ${item.weaponElement1.element}<br>
                    Element 2: ${item.weaponElement2.element}<br>
                    Element 3: ${item.weaponElement3.element}<br>
                    Element 4: ${item.weaponElement4.element}<br>
                    Power: ${item.type.power + item.powerModifier} </span>
                    </div>`
                }
            }
            if (i === 1) {
                slot.innerHTML += `<div class= 'item crystal ${item.crystalElement.element.toLowerCase()}' draggable = 'true'>
                <span>Rarity: ${item.rarity}<br>Element: ${item.crystalElement.element}</span>
                </div>`
            }
            if (i === 2 && j < 5) {
                slot.innerHTML += `<div class= 'item orb' draggable = 'true'>
                <span>Use me to level up!</span>
                </div>`
            }
        }
    }   
}
