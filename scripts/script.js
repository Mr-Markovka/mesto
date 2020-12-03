
const buttonOpen = document.querySelector('.profile__open-button');
const buttonClose = document.querySelector('.popup__close-btn');
const popup = document.querySelector('.popup');

let profileInfoName = document.querySelector('.profile__info-name');
let profileInfoAbout = document.querySelector('.profile__info-about');

let popupForm = document.querySelector('.popup__form');
let inputName = document.querySelector('.input-name');
let inputAbout = document.querySelector('.input-about');

let popupBtnAdd = document.querySelector('.popup__btn-add');

function handleButtonOpenClick() {
    inputName.value = profileInfoName.textContent;
    inputAbout.value = profileInfoAbout.textContent;
    popup.classList.add('popup_opened');
}

function handleButtonCloseClick() {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit(event) {
    event.preventDefault();
    profileInfoName.textContent = inputName.value;
    profileInfoAbout.textContent = inputAbout.value;
    handleButtonCloseClick();
}
buttonClose.addEventListener('click', handleButtonCloseClick);

buttonOpen.addEventListener('click', handleButtonOpenClick);
popupForm.addEventListener('submit', handleFormSubmit);




    
