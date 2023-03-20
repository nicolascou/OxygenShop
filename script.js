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

submitBtn.addEventListener('click', function() {
  let errors = false;

  if (nameInput.value.length < 2 || nameInput.value.length > 100) {
    nameInput.style.borderBottom = '1px solid red';
    errors = true;
  }
  if (! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    emailInput.style.borderBottom = '1px solid red';
    errors = true;
  }
  if (!checkboxInput.checked) {
    labelForCheckbox.style.cssText = 'border: 1px solid red; margin-right: 8px; width: 28px;';
    errors = true;
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


// Window or document event listeners 
document.addEventListener('click', (e) => {
  clickOutsideModal(e);
});

window.addEventListener('scroll', () => {
  scrollerWidth();
  checkScrollModal();
});