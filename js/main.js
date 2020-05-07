'use strict';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

const getData = async function(url){
  const response = await fetch(url);

  if(!response.ok){
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
  }

  return await response.json();
};


function toggleModal() {
  modal.classList.toggle("is-open");
}

const valide = (str) => {
  const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
  return nameReg.test(str);
}
valide();

//authorisation
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const buttonCloseAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

let login = localStorage.getItem('notOut');

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
  loginInput. style = '';
  passwordInput. style = '';
}

function autorized(){
  function logOut (){
    login = null;
    localStorage.removeItem('notOut');
    buttonAuth.style.display = "";
    userName.textContent = '';
    userName.style.display = "";
    buttonOut.style.display = "";
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
  }

  buttonAuth.style.display = "none";
  userName.textContent = login;
  userName.style.display = "inline";
  buttonOut.style.display = "block";

  buttonOut.addEventListener('click', logOut);
}

function notAutorized(){
  
  function logIn(event){
    event.preventDefault();
    if (!loginInput.value && !passwordInput.value  ){
      loginInput.style = "border: 2px solid red";
      passwordInput.style = "border: 2px solid red";
      return;
    } else if (!loginInput.value && passwordInput.value){
      loginInput.style = "border: 2px solid red";
      return;
    } else if(loginInput.value && !passwordInput.value){
      passwordInput.style = "border: 2px solid red";
      return;
    }
    if(valide(loginInput.value)){
      loginInput.style.border = '';
      passwordInput.style.border = '';
      login = loginInput.value;
      localStorage.setItem('notOut', login);
      toggleModalAuth();
      buttonAuth.removeEventListener('click', toggleModalAuth);
      buttonCloseAuth.removeEventListener('click', toggleModalAuth);
      loginForm.removeEventListener('submit', logIn);
      loginForm.reset();
      checkAuth();
    }else{
      alert('Значение не может быть больше 20и символов, при этом первый символ буква!');
    }
  }

    buttonAuth.addEventListener('click', toggleModalAuth);
    buttonCloseAuth.addEventListener('click', toggleModalAuth);
    loginForm.addEventListener('submit', logIn);
}

function checkAuth(){
  if (login){
    autorized();
  }else{
    notAutorized();
  }
}

//generate restaraunt 
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');


function createCardRestaraunt(rest){

  const { image, kitchen, name, price, products, stars, time_of_delivery: timeOfDelivery } = rest;
    const card = `
    <a class="card card-restaurant" data-products="${products}" data-name="${name}">
    <img src="${image}" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">${name}</h3>
        <span class="card-tag tag">${timeOfDelivery} мин</span>
      </div>
      <div class="card-info">
        <div class="rating">
          ${stars}
        </div>
        <div class="price">Oт ${price} ₽</div>
        <div class="category">${kitchen}</div>
      </div>
    </div>
  </a>`;

  cardsRestaurants.insertAdjacentHTML('afterbegin', card);
}
function createHeading(rest){
  const {  kitchen, name, price, stars } = rest;
    const heading = document.createElement('div');
    heading.className = 'section-heading headingRest';
    heading.insertAdjacentHTML('afterbegin',  `
            <div class="section-heading">
            <h2 class="section-title restaurant-title">${name}</h2>
            <div class="card-info">
              <div class="rating">
                ${stars}
              </div>
              <div class="price">От ${price} ₽</div>
              <div class="category">${kitchen}</div>
            </div>
          </div>
    `);
    menu.insertAdjacentElement('afterbegin', heading);
}

function createCardGood(goods){
    const { description, id, image, name, price } = goods;

  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML('afterbegin', `
      <img src="${image}" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">${name}</h3>
        </div>
        <div class="card-info">
          <div class="ingredients">${description}</div>
        </div>
        <div class="card-buttons">
          <button class="button button-primary button-add-cart">
            <span class="button-card-text">В корзину</span>
            <span class="button-cart-svg"></span>
          </button>
          <strong class="card-price-bold">${price} ₽</strong>
        </div>
      </div>
  `);

  cardsMenu.insertAdjacentElement('afterbegin',card);
}


function openGoods(e){
  const target = e.target;

  if(login){
    const restaurant = target.closest('.card-restaurant');

    if(restaurant){
      cardsMenu.textContent = '';
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');
      getData('./db/partners.json').then(function(data){
        for(let i=0; i<data.length; i++){
          if (data[i].name == `${restaurant.dataset.name}`){
            createHeading(data[i]);
          }
        }
      });
      getData(`./db/${restaurant.dataset.products}`).then(function(data){
        data.forEach(createCardGood);
      });
    }
    } else{
      toggleModalAuth();
    }
  
}

function init(){
  getData('./db/partners.json').then(function(data){
    data.forEach(createCardRestaraunt);
    
  });

  cartButton.addEventListener("click", toggleModal);
  close.addEventListener("click", toggleModal);
  cardsRestaurants.addEventListener('click', openGoods);
  logo.addEventListener('click', function(){
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
    menu.removeChild(document.querySelector('.headingRest'));
  })

  checkAuth();

  
  new Swiper('.swiper-container', {
    loop: true,
    speed: 1500,
    autoplay: {
      delay: 4000,
    },
    slidesPerView: 1,
    animate: true,
    spaceBetween: 30,

  })
}
init();