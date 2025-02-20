import './style.css'
import scrollAnimation from './scrollAnimation'

let lastScrollPos;
const scrollFactor = 0.002;

window.onscroll = () => {
    if (lastScrollPos) {
        scrollAnimation.update((window.scrollY - lastScrollPos)*scrollFactor);
    }
    lastScrollPos = window.scrollY;
}

const containter = document.querySelector('.scroll-animation');

window.onresize = () => {
    scrollAnimation.resize(containter.clientWidth,containter.clientHeight);
}