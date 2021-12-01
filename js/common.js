const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu-wrap');
const headerColor = document.querySelector('header');
const main = document.querySelector('main');
const body = document.querySelector('body');


menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    headerColor.classList.toggle('active');
    body.classList.toggle('stopScroll');

});


window.addEventListener('scroll', function(e) {

    if (window.scrollY > 200) {
        headerColor.style.top = "0";
        headerColor.style.background = "rgba(0, 0, 0, 0.5)";

    } else if (window.scrollY < 50) {
        headerColor.style.top = "30px";
        headerColor.style.background = "transparent";
    }
});

