export default class PlayerAPI {
    static getPlayers() {
        const players = read()
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
            throw new Error("Cannot be null")
        }
        const data = read();
        const index = (() => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].name !== player.name) {
                    continue;
                }
                return data.indexOf(data[i]);
            }
        })(); 
        data.splice(index, 1, player);
        save(data);
        return data;
    }

    static deletePlayer(player) {
        const data = read();
        const index = (() => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].name !== player.name) {
                    continue;
                }
                return data.indexOf(data[i]);
            }
        })();
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
    const json = localStorage.getItem('player');

    if (!json) {
        return [      
            
        ]
    }
    return JSON.parse(json);
}

function save(data) {
    localStorage.setItem('player', JSON.stringify(data))
}
