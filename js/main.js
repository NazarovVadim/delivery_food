'use strict';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}


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
    if (!loginInput.value && !passwordInput.value){
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

checkAuth();


//generate restaraunt 


const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');


function createCardRestaraunt(){
    const card = `
    <a class="card card-restaurant">
    <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">Пицца плюс</h3>
        <span class="card-tag tag">50 мин</span>
      </div>
      <div class="card-info">
        <div class="rating">
          4.5
        </div>
        <div class="price">От 900 ₽</div>
        <div class="category">Пицца</div>
      </div>
    </div>
  </a>`;

  cardsRestaurants.insertAdjacentHTML('afterbegin', card);


}
createCardRestaraunt();

function createCardGood(){
  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML('afterbegin', `
      <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">Пицца Классика</h3>
        </div>
        <div class="card-info">
          <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями, грибы.</div>
        </div>
        <div class="card-buttons">
          <button class="button button-primary button-add-cart">
            <span class="button-card-text">В корзину</span>
            <span class="button-cart-svg"></span>
          </button>
          <strong class="card-price-bold">510 ₽</strong>
        </div>
      </div>
  `);

  cardsMenu.insertAdjacentElement('afterbegin',card);
}

function openGoods(e){
  const target = e.target;
  const restaurant = target.closest('.card-restaurant');

  if (restaurant && login){
    
    cardsMenu.textContent = '';

    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');

    createCardGood();
  }
  else{
    toggleModalAuth();
  }
  
}



cardsRestaurants.addEventListener('click', openGoods);
logo.addEventListener('click', function(){
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
})
