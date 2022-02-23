const paragraphs = document.querySelectorAll('.p');
const currentParagraph = document.querySelector('.current-paragraph');
const body = document.querySelector('body');

body.addEventListener('click', () => {
    switch (currentParagraph.innerHTML) {
        case 'paragraph-1': {
            paragraphs[0].classList.replace('fadeIn', 'fadeOut');
            paragraphs[1].classList.replace('fadeOut', 'fadeIn');
            currentParagraph.innerHTML = 'paragraph-2';
            break;
        }
        case 'paragraph-2': {
            paragraphs[1].classList.replace('fadeIn', 'fadeOut');
            paragraphs[2].classList.replace('fadeOut', 'fadeIn');
            currentParagraph.innerHTML = 'paragraph-3';
            break;
        }
        case 'paragraph-3': {
            paragraphs[2].classList.replace('fadeIn', 'fadeOut');
            paragraphs[3].classList.replace('fadeOut', 'fadeIn');
            currentParagraph.innerHTML = 'paragraph-4';
            break;}
        case 'paragraph-4': {
            window.location.href = '../home-screen/home-screen.html';
            break;}
    }
})