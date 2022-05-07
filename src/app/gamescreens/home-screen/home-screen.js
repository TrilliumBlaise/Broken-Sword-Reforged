const startBtn = document.querySelector('#start');
const loadBtn = document.querySelector('#load');
const storyBtn = document.querySelector('#story');

startBtn.addEventListener('click', () => {
  window.location.href = '../start-screen/start-screen.html';
});
loadBtn.addEventListener('click', () => {
  window.location.href = '../load-screen/load-screen.html';
});
storyBtn.addEventListener('click', () => {
  window.location.href = '../story-screen/story-screen.html';
});
