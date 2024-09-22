const body = document.querySelector('body');
const wrapNav = document.querySelector('.header__wrapNav');
const navIcon = document.querySelector('.nav__icon');
const navBoard = document.querySelector('.nav__elements');
const navText = document.querySelectorAll('.nav__text');
const elementBio = document.querySelector('.bio');
const section = document.querySelectorAll('.sectionNav');

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
    console.log(topElement);
    window.scrollTo({
      top: innerWidth < 1024 ? topElement : topElement - 100,
      // behavior: 'smooth', // Płynne przewijanie
    });
  }
};

//Nav Burger//
const nav = (flag) => {
  document.querySelector('.nav__icon').classList.toggle('nav__icon--active');
  if (flag && navBoard.style.display == '') {
    navBoard.style.display = 'flex';
    body.style.overflow = 'hidden';
  } else {
    navBoard.style.display = '';
    body.style.overflow = 'scroll';
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
    console.log(topElement);
    window.scrollTo({
      top: innerWidth < 1024 ? topElement : topElement - 100,
      behavior: 'smooth', // Płynne przewijanie
    });
  }, 50);
};

const bio = () => {
  elementBio.style.display = 'flex';
  body.style.overflow = 'hidden';
};
const bioClose = () => {
  elementBio.style.display = 'none';
  body.style.overflow = 'scroll';
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
document.querySelector('.closeSvg').addEventListener('click', bioClose);
navIcon.addEventListener('click', nav);
window.addEventListener('scroll', debounce(scrolled, 200));
document.querySelector('.nav__elements').addEventListener('click', navBtn);
document.addEventListener('DOMContentLoaded', startPosition);
