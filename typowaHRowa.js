const body = document.querySelector('body');
const wrapNav = document.querySelector('.header__wrapNav');
const navIcon = document.querySelector('.nav__icon');
const navBoard = document.querySelector('.nav__elements');
const navText = document.querySelectorAll('.nav__text');
const elementBio = document.querySelector('.bio');
const elementOffer = document.querySelector('.offer');
const section = document.querySelectorAll('.sectionNav');

const container = document.querySelector('.carousel-container');
const track = container.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = container.querySelector('.next');
const prevButton = container.querySelector('.prev');

//Partner//
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
  partnerCompany[e].textContent = arrPartners[e][nrPartner]; // Wyświetlenie po załadowaniu strony
  // Funkcja zmieniająca banery
  const show = () => {
    nrPartner++;
    if (nrPartner === arrPartners[e].length) {
      nrPartner = 0;
    }
    partnerCompany[e].textContent = arrPartners[e][nrPartner];
  };
  setInterval(show, time * 1000);
};
//Petla uruchamiająca interwał na każdym elemencie
partnerCompany.forEach((e, index) => {
  showPartner(index);
});

const startPosition = () => {
  const hash = window.location.hash.replace('#/', '');

  if (hash) {
    const topElement = document.querySelector(`#${hash}`).offsetTop;
    window.scrollTo({
      top: innerWidth < 1024 ? topElement : topElement - 100,
      // behavior: 'smooth', // Płynne przewijanie
    });
  }
};

//Nav Burger//
const nav = (flag) => {
  document.querySelector('.nav__icon').classList.toggle('nav__icon--active');
  if (flag && navBoard.style.right == '') {
    // navBoard.style.display = 'flex';
    navBoard.style.right = '50%';
    body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  } else {
    navBoard.style.right = '';
    body.style.overflow = 'scroll';
    document.documentElement.style.overflow = 'scroll';
  }
};
//Menu color depends on scroll//
const scrolled = () => {
  // console.log('ok');
  if (document.querySelector('.header').offsetHeight <= scrollY + 101) {
    wrapNav.classList.add('header__wrapNav--scrol');
    navBoard.style.backgroundColor = '#d9d9d9';
  } else {
    wrapNav.classList.remove('header__wrapNav--scrol');
    navBoard.style.backgroundColor = '#fff';
  }

  //Bold selected text//
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
//Move to items//
const navBtn = (btn) => {
  nav(false);
  setTimeout(() => {
    const topElement = document.querySelector(`#${btn.target.name}`).offsetTop;
    window.scrollTo({
      top: innerWidth < 1024 ? topElement : topElement - 100,
      behavior: 'smooth', // Płynne przewijanie
    });
  }, 50);
};

const bio = () => {
  elementBio.style.display = 'flex';
  body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';


};

const offer = () => {
  elementOffer.style.display = 'flex';
  body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';



};

const close = () => {
  elementBio.style.display = 'none';
  elementOffer.style.display = 'none';
  body.style.overflow = 'scroll';
  document.documentElement.style.overflow = 'scroll';



};

let debounceTimeout;
function debounce(func, delay) {
  return function (...args) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => func.apply(this, args), delay);
  };
}
//////////////////////
const Carousel = () => {
  // Stan wewnętrzny
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;
  let currentIndex = 0;

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

    // Aktualizujemy stan kropek po przesunięciu
    updateDots();

    setTimeout(() => {
      track.style.transition = 'none';
    }, 300);
  };

  // Handlery eventów
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

    if (Math.abs(movedBy) > 10) {
      if (movedBy < 0) {
        slide(1);
      } else {
        slide(-1);
      }
    } else {
      slide(0);
    }
  };

  // Inicjalizacja event listenerów
  nextButton.addEventListener('click', () => slide(1));
  prevButton.addEventListener('click', () => slide(-1));

  // Touch events
  track.addEventListener('touchstart', touchStart);
  track.addEventListener('touchmove', touchMove);
  track.addEventListener('touchend', touchEnd);

  // Mouse events
  track.addEventListener('mousedown', touchStart);
  track.addEventListener('mousemove', touchMove);
  track.addEventListener('mouseup', touchEnd);
  track.addEventListener('mouseleave', touchEnd);

  // Prevent dragging
  track.addEventListener('dragstart', (e) => e.preventDefault());

  /////////////////////////////////////
  const createDotNavigation = () => {
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'carousel-dots';

    // Dodajemy style dla kropek
    const style = document.createElement('style');
    document.head.appendChild(style);

    // Tworzymy kropki dla każdego slajdu
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      if (index === 0) dot.classList.add('active');

      // Dodajemy event listener do każdej kropki
      dot.addEventListener('click', () => {
        const diff = index - currentIndex;
        slide(diff);
        updateDots();
      });

      dotsContainer.appendChild(dot);
    });

    // Dodajemy kontener z kropkami do karuzeli
    container.appendChild(dotsContainer);

    return dotsContainer;
  };

  // Funkcja aktualizująca stan kropek
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



  // Inicjalizacja nawigacji kropek
  createDotNavigation();



  return {
    // next: () => slide(1),
    // prev: () => slide(-1),
    // goToSlide: 0,
  };
};
Carousel();


///////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
document
  .querySelector('.header__logo')
  .addEventListener('click', () => window.scrollTo(0, 0));

document.querySelector('.btn__description--bio').addEventListener('click', bio);
document
  .querySelector('.btn__description--offer')
  .addEventListener('click', offer);
document
  .querySelectorAll('.closeSvg')
  .forEach((e) => e.addEventListener('click', close));

navIcon.addEventListener('click', nav);
window.addEventListener('scroll', debounce(scrolled, 200));
document.querySelector('.nav__elements').addEventListener('click', navBtn);
document.addEventListener('DOMContentLoaded', startPosition);
