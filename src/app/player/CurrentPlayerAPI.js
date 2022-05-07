import Player from './player.js';

export default class CurrentPlayerAPI {
  static read() {
    const json = sessionStorage.getItem('currentPlayer');

    if (!json) {
      return Player.test();
    }
    return JSON.parse(json);
  }

  static save(data) {
    sessionStorage.setItem('currentPlayer', JSON.stringify(data));
  }
}
