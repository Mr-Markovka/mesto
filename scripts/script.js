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
// const popupBtnAdd = document.querySelector('.popup__btn-submit');  
const popupAddBtnSubmit = document.querySelector('.popup-add__btn-submit');     /* кнопка submit попапа-карточки*/
const popupAddForm = document.querySelector('.popup-add__form');             /* форма попапа-карточки**/

const popupImg = document.querySelector('.popup-img');                      /* попап-img*/
const popupImgBtnClose = document.querySelector('.popup-img__btn-close');   /*крестик закрытия попап-img*/

const cardsImg = document.querySelector('.cards__img');
const listContainer = document.querySelector('.cards');
const template = document.querySelector('.template');

const inputName = document.querySelector('.input-name');    /*попап-профайл */
const inputAbout = document.querySelector('.input-about');  /*попап-профайл */

const inputTitle = document.querySelector('.input-title');  /*попап-карточки*/
const inputLink = document.querySelector('.input-link');    /*попап-карточки*/

/*закрытие попапов*/
function handleProfileCloseOnClick() {       /*попап-профайл */
    popupProfile.classList.remove('popup_opened');
}

function handleAddFormCloseOnClick() {      /*попап-карточки*/
    popupAdd.classList.remove('popup_opened');
}

function handlePopupImgCloseOnClick() {      /* попап-img*/
    popupImg.classList.remove('popup_opened');
}

/*открытие попапов*/
function openPopup(arg){
    arg.classList.add('popup_opened');
}

/*попап-профайл отображение информации после подтверждения*/
function handleFormSubmit(event) {
    event.preventDefault();
    profileInfoName.textContent = inputName.value;
    profileInfoAbout.textContent = inputAbout.value;
    handleProfileCloseOnClick();
}
/*попап-карточка  подтверждение*/
function handleAddFormSubmit(event) {
    event.preventDefault();
    handleAddFormCloseOnClick();
}    

profileAddButton.addEventListener('click', function(){  /*попап-карточки*/
    openPopup(popupAdd);
});

/*попап-профайл открытие и отображение информации*/
profileOpenButton.addEventListener('click', function(){
    inputName.value = profileInfoName.textContent;
    inputAbout.value = profileInfoAbout.textContent;
    openPopup(popupProfile);
});

popupProfileBtnClose.addEventListener("click", handleProfileCloseOnClick);   /*попап-профайл */
popupProfileForm.addEventListener('submit', handleFormSubmit);

popupAddBtnClose.addEventListener("click", handleAddFormCloseOnClick);/*попап-карточка*/
popupAddForm.addEventListener('submit', handleAddFormSubmit);

popupImgBtnClose.addEventListener("click", handlePopupImgCloseOnClick);       /* попап-img*/


/*const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];*/

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


function renderList() {
    let listCards = '';

    listCards = initialCards.map(composeItem);
    
    listContainer.append(...listCards);
}

function composeItem(item){
    const newItem = template.content.querySelector('.card').cloneNode(true);
    newItem.querySelector('.cards__title').textContent = item.name;
    newItem.querySelector('.cards__img').src = item.link;

    const cardsBtnRemove = newItem.querySelector('.cards__btn-remove');
    cardsBtnRemove.addEventListener('click', removeItem);

    newItem.querySelector('.cards__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__like_active');
    });

    newItem.querySelector('.cards__img').addEventListener('click', function(){
    openImage(item);
    });

    return newItem;
}

function openImage(item){
    const popupPic = popupImg.querySelector('.popup__image');
    const popupAlt = popupImg.querySelector('.popup__alt');
    popupPic.src = item.link;
    popupPic.alt = item.name;
    popupAlt.textContent = item.name;
    openPopup(popupImg);
}

/*создание новой карточки */
function bindAddItemListener() {
    const popupAddBtn = document.querySelector('.popup-add__btn-submit');
    popupAddBtn.addEventListener('click', addNewItem);
}

function addNewItem() {
    let inputText = inputTitle.value;
    let inputRef = inputLink.value; 
    let newItemCards = composeItem({name: inputText, link: inputRef});
    inputTitle.value = '';
    inputLink.value = '';
    listContainer.prepend(newItemCards);
}

/*удаление карточки */
function removeItem(event){
    const targetItem = event.target.closest('.cards__item');
    targetItem.remove();
}

renderList();
bindAddItemListener();








