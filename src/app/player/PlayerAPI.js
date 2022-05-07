export default class PlayerAPI {
  static getPlayers() {
    const players = read();
    if (!players) {
      return [];
    }

    return players;
  }

  static saveNewPlayer(player) {
    const data = read();

    data.push(player);
    save(data);

    return player;
  }

  static updatePlayer(player) {
    if (!player) {
      throw new Error('Cannot be null');
    }
    const data = read();
    const index = data.findIndex(d => d.name === player.name);
    data.splice(index, 1, player);
    save(data);
    return data;
  }

  static deletePlayer(player) {
    const data = read();
    const index = data.findIndex(d => d.name === player.name);
    data.splice(index, 1);
    save(data);
    return player;
  }
}

/* Format of a player
{
  name: '',
  level: 0,
  hp: [],
  inventory: [],
  equipSlot: {}
  gold: 0
}
*/

function read() {
  const json = localStorage.getItem('players');

  if (!json) {
    return [];
  }
  return JSON.parse(json);
}

function save(data) {
  localStorage.setItem('players', JSON.stringify(data));
}
