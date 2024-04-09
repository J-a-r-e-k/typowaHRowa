const navBtn = document.querySelector('.nav__icon');
const navBoard = document.querySelector('.nav__elements');
const body = document.querySelector('body');

// const insta = () => {
//   // iii.style.maxWidth = '100px';
//   document.getElementById('instagram-embed-0').style.minWidth = '0';
// };

//Nav Burger//
const nav = () => {
  navBoard.style.display = navBoard.style.display == 'flex' ? '' : 'flex';
  body.style.overflow = body.style.overflow == 'hidden' ? 'scroll' : 'hidden';
};
navBtn.addEventListener('click', nav);

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
//Petla uruchamiająca interwał na każdym elemecie
partnerCompany.forEach((e, index) => {
  showPartner(index);
});

setTimeout(() => {
  // document.getElementById('instagram-embed-0').style.minWidth = '0';
  document
    .querySelectorAll('.instagram-media')
    .forEach((e) => (e.style.minWidth = '0'));
  console.log(document.querySelectorAll('.instagram-media'));
}, 100);
