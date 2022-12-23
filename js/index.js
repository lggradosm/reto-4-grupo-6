'use strict';

const nav = document.querySelector('nav');
const iconMenu = document.getElementById('icon-menu');
const iconClose = document.getElementById('icon-close');
const listHeader = document.querySelector('.list--header');


document.addEventListener('scroll', () => {
  nav.classList.toggle ('nav--scroll', window.scrollY > 0);
});

iconMenu.addEventListener('click', () => {
  // listHeader.style.pointerEvents = 'auto';
  // listHeader.style.opaity = 1;
  listHeader.classList.add ('list--header-show');

});

iconClose.addEventListener('click', () => {
  listHeader.classList.remove ('list--header-show');
});

const swiper = new Swiper('.swiper', {
  autoplay: {
    delay: 3000,
  },
  // Optional parameters
  direction: 'vertical',
  loop: true,
  Speed: 5000,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  /*scrollbar: {
    el: '.swiper-scrollbar',
  },*/
});