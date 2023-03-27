// Hamburger Button
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('hideMenu');

hamburgerBtn.addEventListener('click', function() {
  hamburgerBtn.style.display = 'none';
  closeMenu.classList.remove('header__hamburger--hidden');
  mobileMenu.classList.remove('header__menu--hidden');
});

closeMenu.addEventListener('click', function() {
  hamburgerBtn.style.display = '';
  closeMenu.classList.add('header__hamburger--hidden');
  mobileMenu.classList.add('header__menu--hidden');
});

// Percentage Scroller
const percentageScroller = document.getElementById('percentageScroller');

function scrollerWidth() {
  let percentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  percentageScroller.style.width = percentage+'%';
}

// Return to the top
const returnTop = document.getElementById('returnTop');
returnTop.addEventListener('click', function() {
  setTimeout(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, 200);
});

// Validate form
const submitBtn = document.getElementById('formValidate');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const checkboxInput = document.getElementById('checkbox');
const labelForCheckbox = document.getElementById('labelForCheckbox');
const errorName = document.getElementById('errorName');
const errorEmail = document.getElementById('errorEmail');
const errorCheckbox = document.getElementById('errorCheckbox');

submitBtn.addEventListener('click', function() {
  let errors = false;

  if (nameInput.value.length < 2 || nameInput.value.length > 100) {
    nameInput.style.borderBottom = '1px solid red';
    errorName.style.display = 'block';
    errors = true;
  } else {
    nameInput.style.borderBottom = '';
    errorName.style.display = 'none';
  }

  if (! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    emailInput.style.borderBottom = '1px solid red';
    errorEmail.style.display = 'block';
    errors = true;
  } else {
    emailInput.style.borderBottom = '1px solid #95989A';
    errorEmail.style.display = 'none';
  }

  if (!checkboxInput.checked) {
    labelForCheckbox.style.cssText = 'border: 1px solid red; margin-right: 8px; height: 28px; width: 28px; border-radius: 4px; transform-style: preserve-3d;';
    errorCheckbox.style.display = 'block';
    errors = true;
  } else {
    labelForCheckbox.style.cssText = '';
    errorCheckbox.style.display = 'none';
  }

  if (! errors) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  } else {
    return;
  }
});

// Popup
function checkScrollModal() {
  let newsletterShowed = localStorage.getItem('newsletterShowed');
  let percentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  if (percentage >= 25 && !newsletterShowed) {
    showNewsletter();
    localStorage.setItem('newsletterShowed', 'true');
  }
}
setTimeout(() => {
  if (!localStorage.getItem('newsletterShowed')) {
    showNewsletter();
  }
  localStorage.setItem('newsletterShowed', 'true');
}, 5000)

const modal = document.getElementById('modal');
function showNewsletter() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

const closeModalBtn = document.getElementById('closeModalBtn');
closeModalBtn.addEventListener('click', closeModal);

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

function clickOutsideModal(event) {
  if (!modal.contains(event.target)) {
    closeModal();
  }
}

// Change currency
const selectedCurrency = document.getElementById('selectCurrency');
const prices = document.getElementsByClassName('currency-price');
let fromCurrency = 'usd';

async function changeCurrency() {
  let data = {}
  await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}.json`)
  .then(resp => resp.json())
  .then((json) => {
    data = json;
  });

  let symbol = '';
  if (selectedCurrency.value === 'eur') {
    symbol = '€';
  } else if (selectedCurrency.value === 'usd') {
    symbol = '$';
  } else if (selectedCurrency.value === 'gbp') {
    symbol = '\u00a3'
  }

  for (let i = 0; i < prices.length; i++) {
    let price = prices[i].textContent.substring(1);
    
    price = Math.round(price * data[fromCurrency][selectedCurrency.value]);

    prices[i].textContent = symbol + price;
  }

  fromCurrency = selectedCurrency.value;
}

selectedCurrency.addEventListener('change', changeCurrency);

// Slider
class Slider {
  constructor(sliderId) {
    this.element = document.getElementById(sliderId);
    this.images = document.querySelectorAll('.slider__image');
    this.index = 0;
    this.points = document.querySelectorAll('.slider__pointbox__point');
  }
  
  moveRight() {
    let prevIdx = this.index;
    this.index++;
    if (this.index > this.images.length - 1) {
      this.index = 0;
    }
    this._changeCurrentImage(prevIdx);
  }
  
  moveLeft() {
    let prevIdx = this.index;
    this.index--;
    if (this.index < 0) {
      this.index = this.images.length - 1;
    }
    this._changeCurrentImage(prevIdx);
  }

  changeImageByIdx(idx) {
    if (idx > this.images.length-1 || idx < 0) return;
    let prevIdx = this.index;
    this.index = idx;
    this._changeCurrentImage(prevIdx);
  }

  _changeCurrentImage(prevIdx) {
    this.images[prevIdx].classList.add('slider__image--hidden');
    this.images[this.index].classList.remove('slider__image--hidden');
    this.images[this.index].style.opacity = '0.1';
    setTimeout(() => {
      this.images[this.index].style.opacity = '1';
    }, 10);

    // Change selected point
    this.points[prevIdx].classList.remove('slider__pointbox__point--selected');
    this.points[this.index].classList.add('slider__pointbox__point--selected');
  }
}

let slider = new Slider('slider');
const sliderNext = document.getElementById('sliderNext');
const sliderPrev = document.getElementById('sliderPrev');
const sliderPoints = document.getElementById('sliderPoints');

sliderNext.addEventListener('click', function() {
  slider.moveRight();
  restartInterval();
});
sliderPrev.addEventListener('click', function() {
  slider.moveLeft();
  restartInterval();
});

sliderPoints.addEventListener('click', function(e) {
  if (e.target === sliderPoints) {
    return;
  } else {
    slider.changeImageByIdx(e.target.id.substring(e.target.id.length-1));
    restartInterval();
  }
});

let sliderInterval = setInterval(() => slider.moveRight(), 3000);

function restartInterval() {
  clearInterval(sliderInterval);
  sliderInterval = setInterval(() => slider.moveRight(), 3000);
}

// Window or document event listeners 
document.addEventListener('click', (e) => {
  clickOutsideModal(e);
});

window.addEventListener('scroll', () => {
  scrollerWidth();
  checkScrollModal();
});