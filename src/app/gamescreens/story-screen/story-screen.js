const paragraphs = document.querySelectorAll('[data-current]');
const body = document.querySelector('body');
body.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') {
    changeCurrentParagraph(false, true);
  }
  if (e.key === 'ArrowRight') {
    changeCurrentParagraph(true, false);
  }
});
document.querySelectorAll('div').forEach(div => {
  div.addEventListener('click', e => {
    if (e.shiftKey) {
      e.preventDefault();
      changeCurrentParagraph(false, true);
      return;
    }
    changeCurrentParagraph(true, false);
  });
});

function changeCurrentParagraph(next = false, previous = false) {
  let current;
  for (let i = 0; i < paragraphs.length; i++) {
    if (paragraphs[i].dataset.current === 'true') current = paragraphs[i];
  }
  if (next) {
    if (!current.nextElementSibling.classList.contains('p')) {
      window.location.href = '../home-screen/home-screen.html';
      return;
    }
    current.classList.replace('fadeIn', 'fadeOut');
    current.dataset.current = 'false';
    current.nextElementSibling.classList.replace('fadeOut', 'fadeIn');
    current.nextElementSibling.dataset.current = 'true';
  }
  if (previous) {
    if (!current.previousElementSibling.classList.contains('p')) {
      return;
    }
    current.classList.replace('fadeIn', 'fadeOut');
    current.dataset.current = 'false';
    current.previousElementSibling.classList.replace('fadeOut', 'fadeIn');
    current.previousElementSibling.dataset.current = 'true';
  }
}
