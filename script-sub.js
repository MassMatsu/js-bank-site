const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

document
  .querySelector('.btn--show-modal')
  .addEventListener('click', function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });

document
  .querySelector('.btn--close-modal')
  .addEventListener('click', function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  });

// smooth scroll nav -----------------------

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    const scoords =
      id !== '#' && document.querySelector(id).getBoundingClientRect();

    window.scrollTo({
      left: scoords.left,
      top: scoords.top + window.pageYOffset,
      behavior: 'smooth',
    });
  }
});

const nav = document.querySelector('.nav');

function handleHover(e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    // narrow down from document to nav
    const container = e.target.closest('.nav');

    const links = container.querySelectorAll('.nav__link');
    const logo = container.querySelector('img');

    links.forEach((link) => {
      if (link !== e.target) {
        link.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
}
nav.addEventListener('mouseover', (e) => handleHover(e, 0.5));
nav.addEventListener('mouseout', (e) => handleHover(e, 1));

// learn more button to scroll down --------

document
  .querySelector('.btn--scroll-to')
  .addEventListener('click', function () {
    const scoords = document
      .querySelector('#section--1')
      .getBoundingClientRect();

    window.scrollTo({
      left: scoords.left + pageXOffset,
      top: scoords.top + pageYOffset,
      behavior: 'smooth',
    });
  });

// stickey nav
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

function stickyNav(entries) {
  const [entry] = entries; // one entry of multiple
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // null means viewport
  threshold: 0, // when header get out of viewport
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// reveal sections ------------------------
const allSections = document.querySelectorAll('section');

function revealSection(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
});

// tabs and display contents --------

const container = document.querySelector('.operations__tab-container');
const tabs = container.querySelectorAll('.btn');
const contents = document.querySelectorAll('.operations__content');

container.addEventListener('click', function (e) {
  const tab = e.target.closest('.operations__tab');
  if (!tab) return;

  tab.classList.contains('btn');
  tabs.forEach((tab) => tab.classList.remove('operations__tab--active'));
  tab.classList.add('operations__tab--active');
  const id = tab.dataset.tab;

  contents.forEach((content) => {
    content.classList.remove('operations__content--active');
  });
  document
    .querySelector(`.operations__content--${id}`)
    .classList.add('operations__content--active');
});

// lazy image -------------------------------

const imageTargets = document.querySelectorAll('img[data-src]');

function resolveImg(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove('lazy-img');
  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(resolveImg, {
  root: null,
  threshold: 0,
  rootMargin: '-300px',
});

imageTargets.forEach((image) => {
  imgObserver.observe(image);
});

// slider ----------------------------------

const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;

function getSlide(currentSlide) {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
  });
}

function nextSlide() {
  if (curSlide === slides.length - 1) curSlide = 0;
  else curSlide++;
  getSlide(curSlide);
  activateDot(curSlide)
}

function prevSlide() {
  if (curSlide === 0) curSlide = slides.length - 1;
  else curSlide--;
  getSlide(curSlide);
  activateDot(curSlide)
}

function createDots() {
  slides.forEach((_, index) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class='dots__dot' data-slide='${index}'></button>`
    );
  });
}

function activateDot(currentSlide) {
  const dots = document.querySelectorAll('.dots__dot');
  dots.forEach((dot) => {
    dot.classList.remove('dots__dot--active');
  });

  const dot = document.querySelector(
    `.dots__dot[data-slide='${currentSlide}']`
  );

  dot.classList.add('dots__dot--active');
}

getSlide(0);
createDots();
activateDot(0);

document
  .querySelector('.slider__btn--right')
  .addEventListener('click', nextSlide);
document
  .querySelector('.slider__btn--left')
  .addEventListener('click', prevSlide);

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const id = e.target.dataset.slide;

    getSlide(id);
    activateDot(id);
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft') prevSlide()
  if (e.key === 'ArrowRight') nextSlide()
})
