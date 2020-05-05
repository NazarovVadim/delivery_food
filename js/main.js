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
    } else{
      
    }
    loginInput.style.border = '';
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


