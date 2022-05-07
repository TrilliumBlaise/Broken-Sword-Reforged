import CurrentPlayerAPI from '../../player/CurrentPlayerAPI.js';

const player = CurrentPlayerAPI.read();
const delayInMilliseconds = 5000;

const MESSAGE = `
  As you enter the hospital, you see before you the kind doctor. <br />
  He nods his head and welcomes you inside.<br>Welcome, ${player.name}!<br> It costs ${player.level * 100} gold for my services.
`;
document.addEventListener('DOMContentLoaded', e => {
  const messageElement = document.createElement('span');
  messageElement.innerHTML = MESSAGE;
  messageElement.classList.add('message');
  document.querySelector('.text').appendChild(messageElement);
});
document.querySelector('.yes').addEventListener('click', () => {
  player.gold -= player.level * 100;
  player.hp = player.maxHP;
  document.querySelector('.text').innerHTML = `${player.name} your health has been fully restored! Good Luck!`;
  CurrentPlayerAPI.save(player);
  setTimeout(function () {
    window.location.href = '../village-screen/village-screen.html';
  }, delayInMilliseconds);
});

document.querySelector('.no').addEventListener('click', () => {
  document.querySelector('.text').innerHTML = `${player.name}, thank you for stopping by! Good Luck!`;
  setTimeout(function () {
    window.location.href = '../village-screen/village-screen.html';
  }, delayInMilliseconds);
});
