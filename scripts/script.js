/*попап профайла*/ 
const profileOpenButton = document.querySelector('.profile__open-button');  /* кнопка открывает попап-профайл*/
const profileAddButton = document.querySelector('.profile__add-button');    /* кнопка в профайле открывает попап для карточек*/


const popup = document.querySelectorAll('.popup');                      /*затемнение на попап-общий */
const popupButtonClose = document.querySelector('.popup__btn-close');   /*крестик закрытия попап-общий*/

const popupProfile = document.querySelector('.popup-profile');                      /* попап-профайл*/
const popupProfileBtnClose = document.querySelector('.popup-profile__btn-close');   /*крестик закрытия попап-профайл */
const popupProfileBtnSubmit = document.querySelector('.popup-profile__btn-submit'); /* кнопка submit попапа-профайл*/
const popupProfileForm = document.querySelector('.popup-profile__form');            /* форма попап-профайл*/

const profileInfoName = document.querySelector('.profile__info-name');      /*профайл*/
const profileInfoAbout = document.querySelector('.profile__info-about');    /*профайл*/


const popupAdd = document.querySelector('.popup-add');                      /* попап добавления карточки*/
const popupAddBtnClose = document.querySelector('.popup-add__btn-close');   /*крестик закрытия попапа-карточки */  
const popupAddBtnSubmit = document.querySelector('.popup-add__btn-submit');     /* кнопка submit попапа-карточки*/
const popupAddForm = document.querySelector('.popup-add__form');             /* форма попапа-карточки**/

const popupImg = document.querySelector('.popup-img');                      /* попап-img*/
const popupImgBtnClose = document.querySelector('.popup-img__btn-close');   /*крестик закрытия попап-img*/


const listContainer = document.querySelector('.cards');
const template = document.querySelector('.template');

const inputName = document.querySelector('.input-name');    /*попап-профайл */
const inputAbout = document.querySelector('.input-about');  /*попап-профайл */

const inputTitle = document.querySelector('.input-title');  /*попап-карточки*/
const inputLink = document.querySelector('.input-link');    /*попап-карточки*/

const root = document.querySelector('.root'); /* общий для закрытия попапов */

const initialCards = [
    {
        name: 'Каир',
        link: 'https://source.unsplash.com/KUxBU4-T2cY'
    },
    {
        name: 'Гиза',
        link: 'https://source.unsplash.com/icn6l4iRwKA'
    },
    {
        name: 'Александрия',
        link: 'https://source.unsplash.com/zpmvpEXM_Qc'
    },
    {
        name: 'Эль-Файюм',
        link: 'https://source.unsplash.com/ZWP3r8rarN8'
    },
    {
        name: 'Люксор',
        link: 'https://source.unsplash.com/GNdp2Q4VZjw'
    },
    {
        name: 'Шарм Эль Шейх',
        link: 'https://source.unsplash.com/1kknM5mP50Y'
    }
]; 


function openPopup(arg){    /* общий открытие попапов*/
    arg.classList.add('popup_opened');
}

function closePopup(popup){   /*общий закрытие попапов*/
    popup.classList.remove('popup_opened');
}

function handleFormSubmit(event) {  /*попап-профайл отображение информации после подтверждения*/
    event.preventDefault();
    profileInfoName.textContent = inputName.value;
    profileInfoAbout.textContent = inputAbout.value;
    closePopup(popupProfile);
}

function bindAddItemListener() {    /*создание новой карточки */
    popupAddForm.addEventListener('submit', addNewItem);
}
 
function addNewItem(event) {     /*создание новой карточки */
    event.preventDefault();
    const inputText = inputTitle.value;
    const inputRef = inputLink.value; 
    const newItemCards = composeItem({name: inputText, link: inputRef});
    document.querySelector('.popup-add__form').reset();
    listContainer.prepend(newItemCards);
    closePopup(popupAdd);
}
 

function removeItem(event){     /*удаление карточки */
    const targetItem = event.target.closest('.cards__item');
    targetItem.remove();
}

function openImage(item){   /*открытие попап-img*/
    const popupPic = popupImg.querySelector('.popup__image');
    const popupAlt = popupImg.querySelector('.popup__alt');
    popupPic.src = item.link;
    popupPic.alt = item.name;
    popupAlt.textContent = item.name;
    openPopup(popupImg);
}

profileOpenButton.addEventListener('click', function(){  /*попап-профайл открытие и отображение информации*/
    inputName.value = profileInfoName.textContent;
    inputAbout.value = profileInfoAbout.textContent;
    openPopup(popupProfile);
});

popupProfileForm.addEventListener('submit', handleFormSubmit); /* сабмит попап-профайл */

popupProfileBtnClose.addEventListener('click', function (){  /* закрытие попап-профайл */
    closePopup(popupProfile);
});

profileAddButton.addEventListener('click', function(){  /* открытие попап-карточки*/
    openPopup(popupAdd);
});

popupAddBtnClose.addEventListener('click', function (){  /* закрытие попап-карточки*/
    closePopup(popupAdd);
});

popupImgBtnClose.addEventListener('click', function (){ /* закрытие попап-img*/
    closePopup(popupImg);
});



function renderList() {
   const listCards = initialCards.map(composeItem);
    
    listContainer.append(...listCards);
}

function composeItem(item){
    const newItem = template.content.querySelector('.card').cloneNode(true);
    const cardsImg = newItem.querySelector('.cards__img');
    const cardsTitle = newItem.querySelector('.cards__title')
    const cardsBtnRemove = newItem.querySelector('.cards__btn-remove');
    const cardsLike = newItem.querySelector('.cards__like');

    cardsImg.src = item.link;
    cardsImg.alt = item.name;
    cardsTitle.textContent = item.name;

    cardsBtnRemove.addEventListener('click', removeItem);

    cardsLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__like_active');
    });

    cardsImg.addEventListener('click', function(){
        openImage(item);
    });

    return newItem;
}


renderList();
bindAddItemListener();