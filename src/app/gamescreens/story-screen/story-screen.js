import { story } from './story.js';

const span = document.querySelector('span');
const pages = document.querySelector('.pages');
let currentIndex;
document.addEventListener('DOMContentLoaded', e => {
  span.innerHTML = story[0];
  currentIndex = 0;
  pages.children[currentIndex].style.color = 'grey';
  loadEvents();
});

function loadEvents() {
  const screenWidth = screen.availWidth;
  document.querySelector('#return').addEventListener('click', e => {
    window.location.href = '../home-screen/home-screen.html';
  });
  if (screenWidth < 951) {
    document.addEventListener('swiped-right', e => {
      changeCurrentParagraph(false, true);
    });

    document.addEventListener('swiped-left', e => {
      changeCurrentParagraph(true, false);
    });
    return;
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
      changeCurrentParagraph(false, true);
    }
    if (e.key === 'ArrowRight') {
      changeCurrentParagraph(true, false);
    }
  });
  document.addEventListener('click', e => {
    if (e.shiftKey) {
      e.preventDefault();
      changeCurrentParagraph(false, true);
      return;
    }
    changeCurrentParagraph(true, false);
  });
}

function changeCurrentParagraph(next = false, previous = false) {
  if (next && currentIndex < story.length - 1) {
    pages.children[currentIndex].style.color = 'rgb(248, 248, 248)';
    span.innerHTML = story[++currentIndex];
    pages.children[currentIndex].style.color = 'grey';
    return;
  }
  if (previous && currentIndex > 0) {
    pages.children[currentIndex].style.color = 'rgb(248, 248, 248)';
    span.innerHTML = story[--currentIndex];
    pages.children[currentIndex].style.color = 'grey';
    return;
  }
}
