import PlayerAPI from '../../player/PlayerAPI.js';
import CurrentPlayerAPI from '../../player/CurrentPlayerAPI.js';

let thisPlayerDiv = '';
const loadedPlayers = [];

const loadPlayers = () => {
  const data = JSON.parse(localStorage.getItem('playersTest'));
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    loadedPlayers.push(data[i]);
    document.querySelector('.saved-players-list').innerHTML += `
        
        <div class= 'player ${i}'>
            <div class= 'thisPlayer' hidden>${data[i]}</div>
            ${data[i].name}<br>Lvl:${data[i].level + 1}
        </div>`;
  }
};
loadPlayers();

//AddEventListeners Here

document.querySelectorAll('.player').forEach(player => {
  player.addEventListener('click', () => {
    if (thisPlayerDiv !== '') {
      thisPlayerDiv.style.backgroundColor = 'rgb(27, 109, 24)';
    }
    thisPlayerDiv = player;
    player.style.backgroundColor = 'rgb(42, 177, 38)';
  });
});
document.querySelector('#load').addEventListener('click', () => {
  const player = loadedPlayers[thisPlayerDiv.classList[1]];
  CurrentPlayerAPI.save(player);
  window.location.href = '../village-screen/village-screen.html';
});
document.querySelector('#return').addEventListener('click', () => {
  window.location.href = '../home-screen/home-screen.html';
});
document.querySelector('#delete').addEventListener('click', () => {
  const myPlayer = thisPlayerDiv.querySelector('.thisPlayer').innerHTML;
  PlayerAPI.deletePlayer(myPlayer);
  location.reload();
});
