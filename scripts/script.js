
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
]; */

const listContainerElement = document.querySelector('.cards');

function renderList() {
    let newcards = '';

    newcards = initialCards.map(function(item) {
        return `<li class="cards__item">
                <a class="cards__image" target="_self" href="${item.link}"><img class="cards__image" alt="#" src="${item.link}?https://via.placeholder.com/280.png"></a>
                <div class="cards__bottom">
                <h3 class="cards__title">${item.name}</h3>
                <button class="cards__like cards__like_active" type="button"><img alt="#" src="./images/like.svg"></button>
                </div>
                </li>`

    }).join(' ');
    listContainerElement.insertAdjacentHTML('afterbegin', newcards);

}
renderList();