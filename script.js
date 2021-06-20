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

  // const clicked = e.target.closest('.nav__link')
  // if (!clicked) return  /* alternative for matching */

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

/////////////////////////////////////////////
// Operations tabs and contents

const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  // e.target can be either button or span -> closest()
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  tabs.forEach((tab) => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  tabsContent.forEach((content) =>
    content.classList.remove('operations__content--active')
  );

  let id = clicked.dataset.tab;
  const content = document.querySelector(`.operations__content--${id}`);
  content.classList.add('operations__content--active');
});

////////////////////////////////////////////
// mouseover ivent
const nav = document.querySelector('.nav');

function handleHover(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // select elements from link to nav
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    console.log(link.closest('.nav'))

    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach((sibling) => {
      if (sibling !== link) {
        sibling.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

////////////////////////////////////
// Sticky navigation
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height

const stickyNav = function(entries) {
  const [entry] = entries
  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {root: null, threshold: 0, rootMargin: `-${navHeight}px`})
headerObserver.observe(header)

//////////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('section')

const revealSection = function(entries, observer) {
  const [entry] = entries
  console.log(entry)
  if (!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {root: null, threshold: 0.15})

allSections.forEach((section) => {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})