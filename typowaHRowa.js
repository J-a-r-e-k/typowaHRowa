const body = document.querySelector('body');
const wrapNav = document.querySelector('.header__wrapNav');
const navIcon = document.querySelector('.nav__icon');
const navBoard = document.querySelector('.nav__elements');
const navText = document.querySelectorAll('.nav__text');
const elementBio = document.querySelector('.bio');
const elementOffer = document.querySelector('.offer');
const elementIndividualOffer = document.querySelector('.individualOffer');
const section = document.querySelectorAll('.sectionNav');
const containerOffer = document.querySelector('.carousel-container--offer');
const containerIndividualOffer = document.querySelector('.carousel-container--individualOffer');

const time = 7;
const arrPartners = [
  ['APP', 'S-Plus', 'NTS', 'XS Logistics'],
  ['Lionelo', 'Zeegma', 'Overmax', 'Duka', 'Astat'],
  ['Take & GO', 'Surge Cloud', 'Qodeca', 'Third Kind Games'],
  ['Przychodnia Sucholeska', 'Medicover'],
  ['Pricer', 'Cenatorium', 'Desa Locum'],
  ['Kura Warzyw'],
  ['Qborg'],
  ['HANDS grupa reklamowa'],
  ['sieć siłowni UP'],
];
const partnerCompany = [...document.querySelectorAll('.partner__Company')];
const showPartner = (e) => {
  let nrPartner = 0;
  partnerCompany[e].textContent = arrPartners[e][nrPartner];
  const show = () => {
    nrPartner++;
    if (nrPartner === arrPartners[e].length) {
      nrPartner = 0;
    }
    partnerCompany[e].textContent = arrPartners[e][nrPartner];
  };
  setInterval(show, time * 1000);
};
partnerCompany.forEach((e, index) => {
  showPartner(index);
});
const startPosition = () => {
  const hash = window.location.hash.replace('#/', '');
  if (hash) {
    const topElement = document.querySelector(`#${hash}`).offsetTop;
    window.scrollTo({
      top: innerWidth < 1024 ? topElement : topElement - 100,
    });
  }
};

const nav = (flag) => {
  document.querySelector('.nav__icon').classList.toggle('nav__icon--active');
  if (flag && navBoard.style.right == '') {
    navBoard.style.right = '50%';
    body.style.overflow = 'hidden';
    body.style.touchAction = 'none';
    document.documentElement.style.overflow = 'hidden';
  } else {
    navBoard.style.right = '';
    body.style.overflow = 'scroll';
    body.style.touchAction = 'auto';
    document.documentElement.style.overflow = 'scroll';
  }
};

const scrolled = () => {
  if (document.querySelector('.header').offsetHeight <= scrollY + 101) {
    wrapNav.classList.add('header__wrapNav--scrol');
    navBoard.style.backgroundColor = '#d9d9d9';
  } else {
    wrapNav.classList.remove('header__wrapNav--scrol');
    navBoard.style.backgroundColor = '#fff';
  }
  section.forEach((e, index) => {
    navText[index].style.textShadow =
      scrollY + 101 >= e.offsetTop &&
        scrollY <= e.offsetTop + e.offsetHeight - 101
        ? '1px 0px 0px'
        : '0px 0px 0px';
  });

  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    if (
      scrollPosition >= sectionTop - 101 &&
      scrollPosition < sectionTop - 101 + sectionHeight
    ) {
      history.pushState(null, null, `#/${sectionId}`);
    }
  });
};

const navBtn = (btn) => {
  nav(false);
  setTimeout(() => {
    const topElement = document.querySelector(`#${btn.target.name}`).offsetTop;
    window.scrollTo({
      top: innerWidth < 1024 ? topElement : topElement - 100,
      behavior: 'smooth',
    });
  }, 50);
};

const bio = () => {
  elementBio.style.display = 'flex';
  body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  body.style.touchAction = 'none';
};

const offer = () => {
  elementOffer.style.display = 'flex';
  body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  body.style.touchAction = 'none';
  Carousel(containerOffer);
};

const individualOffer = () => {
  elementIndividualOffer.style.display = 'flex';
  body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  body.style.touchAction = 'auto';
  Carousel(containerIndividualOffer);
};

const Carousel = (nameBoard) => {
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0
  let prevTranslate = 0;
  let animationID = 0;
  let currentIndex = 0;

  const container = nameBoard
  const track = container.querySelector('.carousel-track');
  const trackTouch = container.querySelectorAll('.carousel-slide');
  const slides = Array.from(track.children);
  const nextButton = container.querySelector('.next');
  const prevButton = container.querySelector('.prev');

  const getPositionX = (event) => {
    return event.type.includes('mouse')
      ? event.pageX
      : event.touches[0].clientX;
  };

  const setSlidePosition = () => {
    track.style.transform = `translateX(${currentTranslate}px)`;
  };

  const animation = () => {
    setSlidePosition();
    if (isDragging) {
      animationID = requestAnimationFrame(animation);
    }
  };

  const slide = (direction) => {
    const slideWidth = slides[0].offsetWidth;
    const maxIndex = slides.length - 1;
    currentIndex = Math.max(0, Math.min(maxIndex, currentIndex + direction));
    currentTranslate = prevTranslate = -currentIndex * slideWidth;
    track.style.transition = 'transform 0.3s ease-out';
    setSlidePosition();
    updateDots();
    setTimeout(() => {
      track.style.transition = 'none';
    }, 300);
  };

  const resetCarousel = () => {
    currentIndex = 0;
    currentTranslate = 0;
    prevTranslate = 0;
    setSlidePosition();
    updateDots();
  };

  const touchStart = (event) => {
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    track.style.cursor = 'grabbing';
  };

  const touchMove = (event) => {
    if (!isDragging) return;
    const currentPosition = getPositionX(event);
    const diff = currentPosition - startPos;
    currentTranslate = prevTranslate + diff;
  };

  const touchEnd = () => {
    isDragging = false;
    cancelAnimationFrame(animationID);
    track.style.cursor = 'grab';
    const movedBy = currentTranslate - prevTranslate;
    if (Math.abs(movedBy) > 100) {
      if (movedBy < 0) {
        slide(1);
      } else {
        slide(-1);
      }
    } else {
      slide(0);
    }
  };

  nextButton.addEventListener('click', () => slide(1));
  prevButton.addEventListener('click', () => slide(-1));
  trackTouch.forEach((e) => {
    e.addEventListener('touchstart', touchStart);
    e.addEventListener('touchmove', touchMove);
    e.addEventListener('touchend', touchEnd);
  })
  track.addEventListener('mousedown', touchStart);
  track.addEventListener('mousemove', touchMove);
  track.addEventListener('mouseup', touchEnd);
  track.addEventListener('mouseleave', touchEnd);
  track.addEventListener('dragstart', (e) => e.preventDefault());
  const createDotNavigation = () => {
    if (container.querySelector('.carousel-dots')) return;
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'carousel-dots';

    const style = document.createElement('style');
    document.head.appendChild(style);
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        const diff = index - currentIndex;
        slide(diff);
        updateDots();
      });
      dotsContainer.appendChild(dot);
    });
    container.appendChild(dotsContainer);
    return dotsContainer;
  };
  const updateDots = () => {
    const dots = container.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };
  createDotNavigation();
  resetCarousel();

};

const close = () => {
  elementBio.style.display = 'none';
  elementOffer.style.display = 'none';
  elementIndividualOffer.style.display = 'none';
  body.style.overflow = 'scroll';
  document.documentElement.style.overflow = 'scroll';
  body.style.touchAction = 'auto';
};

let debounceTimeout;
function debounce(func, delay) {
  return function (...args) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => func.apply(this, args), delay);
  };
}

document
  .querySelector('.header__logo')
  .addEventListener('click', () => window.scrollTo(0, 0));
document.querySelector('.btn__description--bio').addEventListener('click', bio);
document
  .querySelector('.btn__description--offer')
  .addEventListener('click', offer);
document
  .querySelector('.btn__description--IndividualOffer')
  .addEventListener('click', individualOffer);
document
  .querySelectorAll('.closeSvg')
  .forEach((e) => e.addEventListener('click', close));
navIcon.addEventListener('click', nav);
window.addEventListener('scroll', debounce(scrolled, 200));
document.querySelector('.nav__elements').addEventListener('click', navBtn);
document.addEventListener('DOMContentLoaded', startPosition);
