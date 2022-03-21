import Player from '../../player/player.js'
import CurrentPlayerAPI from '../../player/CurrentPlayerAPI.js';
import Weapon from '../inventory-screen/items/weapon/weapon.js';
import MyElement from '../../element/element.js';

const playerInput = document.querySelector('#player-name');
const weaponInput = document.querySelector('#weapon-name');
const enter = document.querySelector('#enter');

enter.addEventListener('click', () => {
    if (playerInput.value === '' || weaponInput.value === '') {
        alert('Please tell me your name and the name of your starting weapon');
        return;
    }
    const player = new Player(playerInput.value, new Weapon(weaponInput.value, MyElement.EMPTY));
    CurrentPlayerAPI.save(player);
    window.location.href = '../village-screen/village-screen.html'
});

playerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (playerInput.value === '' || weaponInput.value === '') {
            alert('Please tell me your name and the name of your starting weapon');
            return;
        }
        const player = new Player(playerInput.value, new Weapon(weaponInput.value, MyElement.EMPTY));
        CurrentPlayerAPI.save(player);
        window.location.href = '../village-screen/village-screen.html'
    };
});

weaponInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (playerInput.value === '' || weaponInput.value === '') {
            alert('Please tell me your name and the name of your starting weapon');
            return;
        }
        const player = new Player(playerInput.value, new Weapon(weaponInput.value, MyElement.EMPTY));
        CurrentPlayerAPI.save(player);
        window.location.href = '../village-screen/village-screen.html'
    };
});