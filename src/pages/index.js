import '../pages/index.css';

import Card from '../components/Card.js';  //7
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import FormValidator from '../components/FormValidator.js';

const profileAvatarButton = document.querySelector('.profile__avatar-container'); /* кнопка открывает попап-аватар*/

const profileOpenButton = document.querySelector('.profile__open-button');  /* кнопка открывает попап-профайл*/
const profileAddButton = document.querySelector('.profile__add-button');    /* кнопка в профайле открывает попап для карточек*/

const popupProfileForm = document.querySelector('.popup-profile__form');    /* форма попап-профайл*/
const popupAddForm = document.querySelector('.popup-add__form');             /* форма попапа-карточки**/
const popupAvatarForm = document.querySelector('.popup-avatar__form');   /* форма попап-аватар*/

/*пользователь */
const profileInfoName = document.querySelector('.profile__info-name');
const profileInfoAbout = document.querySelector('.profile__info-about');
const profileAvatar = document.querySelector('.profile__avatar');
const inputName = document.querySelector('.input-name');    /*попап-профайл */
const inputAbout = document.querySelector('.input-about');  /*попап-профайл */
const inputAvatar = document.querySelector('.input-avatar');  /*попап-avatar */

const validationConfig = {
    submitButtonSelector: '.popup__btn-submit',
    inactiveButtonClass: 'popup__btn-submit_invalid',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__error_visible',
    error: '.error',
    popupInput: '.popup__input'
};
/*пользователь */
const userInfo = new UserInfo({
    name: profileInfoName,
    about: profileInfoAbout,
    avatar: profileAvatar
});

let userId = null;
const cardsSection = new Section({ renderer: renderCards }, '.cards');

/*валидация форм */
const validationFormProfile = new FormValidator(validationConfig, popupProfileForm);
const validationFormAdd = new FormValidator(validationConfig, popupAddForm);
const validationFormAvatar = new FormValidator(validationConfig, popupAvatarForm);

/*попап-картинка */
const popupImage = new PopupWithImage('.popup-img');

const popupConfirm = new PopupWithSubmit({ popupSelector: '.popup-confirm' });

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
    headers: {
        authorization: '055ca1f8-ffbd-428a-83a3-651882dda942',
        'Content-Type': 'application/json'
    }
});

api.getAllInfo()
    .then(([dataUser, cardsData]) => {
        userInfo.setUserInfo(dataUser);
        userInfo.updateUserInfo();
        userId = userInfo.getMyId();

        cardsSection.renderItems(cardsData);
    })
    .catch(err => console.log(err))

/*попап-профайл-форма */
const popupEditForm = new PopupWithForm({
    popupSelector: '.popup-profile',
    handleFormSubmit: (data) => {
        api.changeUserInfo(data)
            .then((resData) => {
                userInfo.setUserInfo(resData);
                userInfo.updateUserInfo();
            })
            .catch(err => console.log(err))
    }
});

/*попап-карточкa-форма */
const popupCardForm = new PopupWithForm({
    popupSelector: '.popup-add',
    handleFormSubmit: (data) => {
        api.addCard(data)
            .then((resData) => {
                const card = createCard(resData);
                cardsSection.addItem(card, 'begin');
            })
            .catch(err => console.log(err))

    }
});
/*попап-аватар */
const popupAvatarWithForm = new PopupWithForm({
    popupSelector: '.popup-avatar',
    handleFormSubmit: (data) => {
        api.changeAvatar(data)
            .then((resAvatar) => {
                console.log('res-changeAvatar', resAvatar);
                userInfo.setUserInfo(resAvatar);
                userInfo.updateUserInfo();
            })
            .catch(err => console.log(err))
    }
});

function renderCards(itemCard) {
    const newCard = createCard(itemCard);
    cardsSection.addItem(newCard);
}

function createCard(dataCard) {
    const cardInstance = new Card({ data: { ...dataCard, currentId: userId } }, handleCardClick, '.template',
        (func) => {
            popupConfirm.open(() => {
                api.removeCard(dataCard._id)
                    .then(() => {
                        func();
                        popupConfirm.close();
                    })
                    .catch(err => console.log(err))
            });
        }
        , () => {
            if (cardInstance.isCardLiked()) {
                api.deleteLike(dataCard._id)
                    .then(res => {
                        cardInstance.setCardLiked(res);
                    })
                    .catch(err => console.log(err));
            } else {
                api.putLike(dataCard._id)
                    .then(res => {
                        cardInstance.setCardLiked(res);
                    })
                    .catch(err => console.log(err));
            }
        }
    )
    const card = cardInstance.generateCard();
    return card;
}

/*попап-картинка*/
function handleCardClick(data) {
    popupImage.open(data)
}

/* открытие попап-avatar*/
profileAvatarButton.addEventListener('click', () => {
    const getUserInfo = userInfo.getUserInfo();
    inputAvatar.value = getUserInfo.avatar;
    validationFormAvatar.setButtonState(true);
    validationFormAvatar.checkError();
    popupAvatarWithForm.open();
});


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

validationFormAdd.enableValidation();
validationFormProfile.enableValidation();
validationFormAvatar.enableValidation();

popupCardForm.setEventListeners();
popupEditForm.setEventListeners();
popupAvatarWithForm.setEventListeners();

popupImage.setEventListeners();
popupConfirm.setEventListeners();
