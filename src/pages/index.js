import '../pages/index.css';

import Card from '../components/Card.js';  //7
import Popup from '../components/Popup.js';
import { initialCards } from '../components/initial-cards.js';
import Section from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';

const profileOpenButton = document.querySelector('.profile__open-button');  /* кнопка открывает попап-профайл*/
const profileAddButton = document.querySelector('.profile__add-button');    /* кнопка в профайле открывает попап для карточек*/
const popupProfileForm = document.querySelector('.popup-profile__form');    /* форма попап-профайл*/
const popupAddForm = document.querySelector('.popup-add__form');             /* форма попапа-карточки**/
const profileInfoName = document.querySelector('.profile__info-name');
const profileInfoAbout = document.querySelector('.profile__info-about');
const inputName = document.querySelector('.input-name');    /*попап-профайл */
const inputAbout = document.querySelector('.input-about');  /*попап-профайл */

const validationConfig = {
    submitButtonSelector: '.popup__btn-submit',
    inactiveButtonClass: 'popup__btn-submit_invalid',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__error_visible',
    error: '.error',
    popupInput: '.popup__input'
};


/*6 карточек */
const cardsSection = new Section({
    items: initialCards,
    renderer: renderCards
}, '.cards');

/*валидация форм */
const validationFormProfile = new FormValidator(validationConfig, popupProfileForm);
const validationFormAdd = new FormValidator(validationConfig, popupAddForm);

/*пользователь */
const userInfo = new UserInfo({ name: profileInfoName, about: profileInfoAbout });


/*попап-картинка */
const popupImage = new PopupWithImage('.popup-img');

/*попап-карточкa-форма */
const popupCardForm = new PopupWithForm({
    popupSelector: '.popup-add',
    handleFormSubmit: (data) => {
        const card = createCard(data);
        cardsSection.addItem(card, 'begin')
    }
});

/*попап-профайл-форма */
const popupEditForm = new PopupWithForm({
    popupSelector: '.popup-profile',
    handleFormSubmit: (data) => {
        userInfo.setUserInfo(data.name, data.about);
        userInfo.updateUserInfo();
    }
});

/*попап-картинка*/
function handleCardClick(data) {
    popupImage.open(data)
}

function createCard(item) {
    const cardInstance = new Card(item, handleCardClick, '.template');
    const card = cardInstance.generateCard();
    return card;
}

/*6 карточек */
function renderCards(itemCard) {
    const newCard = createCard(itemCard);
    cardsSection.addItem(newCard);
}

/*попап-профайл открытие и отображение информации*/
profileOpenButton.addEventListener('click', () => {
    const getUserInfo = userInfo.getUserInfo();
    inputName.value = getUserInfo.name;
    inputAbout.value = getUserInfo.about;
    validationFormProfile.setButtonState(true);
    validationFormProfile.checkError();
    popupEditForm.open();
});

/* открытие попап-карточки*/
profileAddButton.addEventListener('click', function () {
    popupAddForm.reset();
    validationFormAdd.setButtonState(false);
    validationFormAdd.checkError();
    popupCardForm.open();
});

cardsSection.renderItems();

validationFormAdd.enableValidation();
validationFormProfile.enableValidation();

popupCardForm.setEventListeners();
popupEditForm.setEventListeners();
popupImage.setEventListeners();


userInfo.setUserInfo('Анастасия Шилинa', 'По родным просторам');
userInfo.updateUserInfo();

