/* кнопки открытия и закрытия*/
const buttonOpen = document.querySelector('.button-open');
const buttonClose = document.querySelector('.button-close');
const popup = document.querySelector('.popup');
/*конец-кнопки открытия и закрытия*/

/*замена текста*/
let profileInfoName = document.querySelector('.profile__info-name');
let profileInfoAbout = document.querySelector('.profile__info-about');

let popupForm = document.querySelector('.popup__form');
let inputName = document.querySelector('.input-name');
let inputAbout = document.querySelector('.input-about');
/*конец*/

/*отображение текста с сайта*/
let popupBtnAdd = document.querySelector('.popup__btn-add');
/*конец-отображение текста с сайта*/

/* кнопки открытия и закрытия*/
buttonOpen.addEventListener('click', handleButtonOpenClick);
buttonClose.addEventListener('click', handleButtonCloseClick);

function handleButtonOpenClick() {
    popup.classList.add('popup_opened');
    inputName.value = profileInfoName.textContent;
    inputAbout.value = profileInfoAbout.textContent;
}

function handleButtonCloseClick() {
    popup.classList.remove('popup_opened');
}
/*конец-кнопки открытия и закрытия*/

/*отображение текста с сайта*/

// popupForm.addEventListener('click', handleFormOpen);
// function handleFormOpen() {
//     inputName.value = profileInfoName.textContent;
//     inputAbout.value = profileInfoAbout.textContent;
// }

/*конец-отображение текста с сайта*/

/*замена текста*/
 popupForm.addEventListener('submit', handleFormSubmit);
 popupBtnAdd.addEventListener('click', handleButtonCloseClick);

 function handleFormSubmit(event) {
     event.preventDefault();
     profileInfoName.textContent = inputName.value;
     profileInfoAbout.textContent = inputAbout.value;
 }


/*конец-замена текста*/

//
// let popupForm = document.querySelector('.popup__form');

// function formSubmitHandler (evt) {
//     evt.preventDefault(); 

//     let inputName = document.querySelector('.input-name'); 
//     let inputAbout = document.querySelector('.input-about'); 

//     inputName.value = profileInfoName.textContent;
//     inputAbout.value = profileInfoAbout.textContent;

// }

// popupForm.addEventListener('submit', handleFormSubmit);



    
