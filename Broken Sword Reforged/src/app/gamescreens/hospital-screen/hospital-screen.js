import CurrentPlayerAPI from '../../player/CurrentPlayerAPI.js'

const player = CurrentPlayerAPI.read();
const delayInMilliseconds = 5000;

document.querySelector('.player-welcome').innerHTML = `"Welcome, ${player.name}!`
document.querySelector('.cost-to-stay').innerHTML = `It costs ${player.level * 100} gold to stay here."`

document.querySelector('.yes').addEventListener('click', () => {
    player.gold -= (player.level * 100);
    player.hp = player.maxHP;
    document.querySelector('.text').innerHTML = `${player.name} your health has been fully restored! Good Luck!`
    CurrentPlayerAPI.save(player);
    setTimeout(function() {
        window.location.href = '../village-screen/village-screen.html'
    }, delayInMilliseconds)
})

document.querySelector('.no').addEventListener('click', () => {
    document.querySelector('.text').innerHTML = `${player.name}, thank you for stopping by! Good Luck!`
    setTimeout(function() {
        window.location.href = '../village-screen/village-screen.html'
    }, delayInMilliseconds)
})