/*попап профайла*/ 
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

buttonOpen.addEventListener('click', handleButtonOpenClick);
popupForm.addEventListener('submit', handleFormSubmit);
buttonClose.addEventListener('click', handleButtonCloseClick);


/* попап добавления*/
const profileAddButton = document.querySelector('.profile__add-button');/* кнопка в профайле открывает попап*/
const popupAddCloseBtn = document.querySelector('.popup-add__close-btn');/*крестик закрытия попапа */
const popupAdd = document.querySelector('.popup-add');/*сам попап добавления карточек */
const popupAddForm = document.querySelector('.popup-add__form');/*форма попапа добавления карточек */
const inputTitle = document.querySelector('.input-title');
const inputLink = document.querySelector('.input-link');

function handleAddButtonOpenClick() { /*открытие формы */
    popupAdd.classList.add('popup-add_opened');
}

function handleAddCloseBtnClick() { /*закрытие формы */
    popupAdd.classList.remove('popup-add_opened');
}

function handleAddSubmit(event){ /*кнопка создать */
    event.preventDefault();
    handleAddCloseBtnClick();
}

profileAddButton.addEventListener('click', handleAddButtonOpenClick);
popupAddCloseBtn.addEventListener('click', handleAddCloseBtnClick);
popupAddForm.addEventListener('submit', handleAddSubmit);

/* like */
const cardsLike = document.querySelector('.cards__like');

/*function handleCardsLikeOnClick() {
    cardsLike.classList.add('cards__like_active');
}
cardsLike.addEventListener('click', handleCardsLikeOnClick);*/



const initialCards = [
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
];

/*const initialCards = [
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
];*/ 

 
const listContainerElement = document.querySelector('.cards');


const template = document.querySelector('.template');

function renderList() {
    let newCards = '';

    newCards = initialCards.map(composeItem);
    
    listContainerElement.append(...newCards);
}

function composeItem(item){
    const newItem = template.content.cloneNode(true);
    newItem.querySelector('.cards__title').textContent = item.name;
    newItem.querySelector('.cards__img').src = item.link;
    const cardsBtnRemove = newItem.querySelector('.cards__btn-remove');
    cardsBtnRemove.addEventListener('click', removeItem);
    return newItem;
}

function bindAddItemListener() {
    const popupAddBtn = document.querySelector('.popup-add__btn');
    popupAddBtn.addEventListener('click', addNewItem);
}

function addNewItem() {
        let inputText = inputTitle.value;
        let inputRef = inputLink.value; 
        let newItemCards = composeItem({name: inputText, link: inputRef});
        inputTitle.value = '';
        inputLink.value = '';
        listContainerElement.prepend(newItemCards);
}

function removeItem(event){
    const targetElement = event.target;
    const targetItem = targetElement.closest('.cards__item');
    targetItem.remove();
}

renderList();
bindAddItemListener();