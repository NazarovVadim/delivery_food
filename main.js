const cartBtn = document.querySelector('#cart-btn');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');

cartBtn.addEventListener('click', toggleModal);
close.addEventListener('click', toggleModal);

function toggleModal(){
    modal.classList.toggle('is-open');
}