'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////
// Learn more button to scroll down from Hero

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', () => {
  const s1coords = section1.getBoundingClientRect();

  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
});

//////////////////////////////////////
// Page navigation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // to prevent from jumping without smooth scroll
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    const section = document.querySelector(id).getBoundingClientRect();

    window.scrollTo({
      left: section.left + window.pageXOffset,
      top: section.top + window.pageYOffset,
      behavior: 'smooth',
    });
  }
});
