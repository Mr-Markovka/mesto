import '../pages/index.css';

import { initialCards } from '../components/initial-cards.js';
import Card from '../components/Card.js';  //7
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import Popup from '../components/Popup.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import FormValidator from '../components/FormValidator.js';

const profileAvatarButton = document.querySelector('.profile__avatar-button'); /* кнопка открывает попап-аватар*/

const profileOpenButton = document.querySelector('.profile__open-button');  /* кнопка открывает попап-профайл*/
const profileAddButton = document.querySelector('.profile__add-button');    /* кнопка в профайле открывает попап для карточек*/
const cardsBtnRemove = document.querySelector('.cards__btn-remove');

const popupProfileForm = document.querySelector('.popup-profile__form');    /* форма попап-профайл*/
const popupAddForm = document.querySelector('.popup-add__form');             /* форма попапа-карточки**/
const popupAvatarForm = document.querySelector('.popup-avatar__form');   /* форма попап-аватар*/

/*пользователь */
const profileInfoName = document.querySelector('.profile__info-name');
const profileInfoAbout = document.querySelector('.profile__info-about');
const profileAvatar = document.querySelector('.profile__avatar');
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
/*пользователь */
const userInfo = new UserInfo({
    name: profileInfoName,
    about: profileInfoAbout,
    avatar: profileAvatar
});
// console.log(userInfo);
let userId = null;
const cardsSection = new Section({ renderer: renderCards }, '.cards');

/*валидация форм */
const validationFormProfile = new FormValidator(validationConfig, popupProfileForm);
const validationFormAdd = new FormValidator(validationConfig, popupAddForm);

/*попап-картинка */
const popupImage = new PopupWithImage('.popup-img');


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
    headers: {
        authorization: '055ca1f8-ffbd-428a-83a3-651882dda942',
        'Content-Type': 'application/json'
    }
});

api.getAllInfo()
    .then(([dataUser, cardsData]) => {
        cardsSection.renderItems(cardsData);

        userInfo.setUserInfo(dataUser);
        userInfo.updateUserInfo();
        userId = userInfo.getMyId();
        console.log(userId);
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
            .catch((err) => {
                console.log(err);
            })
    }
});

/*попап-карточкa-форма */
const popupCardForm = new PopupWithForm({
    popupSelector: '.popup-add',
    handleFormSubmit: (data) => {
        api.addCard(data)
            .then((resData) => {
                // console.log(resData);
                const card = createCard(resData);
                cardsSection.addItem(card, 'begin');
            })
            .catch((err) => {
                console.log(err);
            })

    }
});

const popupConfirm = new PopupWithSubmit({ popupSelector: '.popup-confirm' });

function renderCards(itemCard) {
    const newCard = createCard(itemCard);
    cardsSection.addItem(newCard);
}

function createCard(dataCard) {
    // console.log(dataCard);
    const cardInstance = new Card({ data: { ...dataCard, currentId: userId } }, handleCardClick, '.template',
        (func) => {
            popupConfirm.open(() => {
                api.removeCard(dataCard._id)
                    .then(() => {
                        func();
                        popupConfirm.close();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            });
        }
        , () => {
            console.log('что ты есть ', card);
            if (card.isCardLiked()) {
                console.log('что ты  ', dataCard._id);
                api.deleteLike(dataCard._id)
                    .then(res => {
                        card.setCardLiked(res);
                    })
                    .catch(err => console.log(err));
            } else {
                api.putLike(dataCard._id)
                    .then(res => {
                        console.log(res);
                        card.setCardLiked(res);
                    })
                    .catch(err => console.log(err));
            }


        }
    )
    const card = cardInstance.generateCard();
    return card;
}

// function handleCardLike(data) {
//     console.log(data);
//     if (card.isCardLiked()) {
//         api.deleteLike(data)
//             .then(res => {
//                 console.log(res);
//                 card.setCardLiked(res);
//             })
//             .catch(err => console.log(err));
//     } else {
//         api.putLike(data)
//             .then(res => {
//                 console.log(res);
//                 card.setCardLiked(res);
//             })
//             .catch(err => console.log(err));
//     }

// }
/*попап-картинка*/
function handleCardClick(data) {
    popupImage.open(data)
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

/* открытие попап-удаления*/
// cardsBtnRemove.addEventListener('click', () => {
//     popupConfirm.open();
// });


validationFormAdd.enableValidation();
validationFormProfile.enableValidation();

popupCardForm.setEventListeners();
popupEditForm.setEventListeners();
popupImage.setEventListeners();
popupConfirm.setEventListeners();

userInfo.setUserInfo('Верблюд', 'Корабль пустыни');
userInfo.updateUserInfo();

/************************************************************* */
/*попап-аватар */
// const popupAvatarForm = new PopupWithForm({
//     popupSelector: '.popup-avatar',
//     handleFormSubmit: (data) => {
//         api.changeUserInfo(data)
//             .then((formData) => {
//                 userInfo.setUserInfo(formData);
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     }
// });

// popupAvatarForm.setEventListeners();

/************************************************************* */

// /*-----------------------------------------------------------------------*/


// function showButton() {
//     profileAvatarButton.classList.add('profile__avatar-button_opened');
//     // console.log('mouse');
// }

// function hideButton() {
//     profileAvatarButton.classList.remove('profile__avatar-button_opened');
//     // console.log('mouse out');
// }

// profileAvatar.addEventListener('mouseover', showButton);
// profileAvatar.addEventListener('mouseout', hideButton);
// profileAvatarButton.addEventListener('mouseover', showButton);
// // profileAvatarButton.addEventListener('mouseout', hideButton);


// profileAvatarButton.addEventListener('click', () => {
//     document.querySelector('.popup-avatar').classList.add('popup_opened');
// });

// const x = document.querySelector('.popup-avatar__btn-close');
// x.addEventListener('click', () => {
//     document.querySelector('.popup-avatar').classList.remove('popup_opened');
// });

// /*-----------------------------------------------------------------------*/



// /*попап-профайл-форма */                                 удалить
// const popupEditForm = new PopupWithForm({
//     popupSelector: '.popup-profile',
//     handleFormSubmit: (data) => {
//         userInfo.setUserInfo(data.name, data.about);
//         userInfo.updateUserInfo();
//     }
// });
