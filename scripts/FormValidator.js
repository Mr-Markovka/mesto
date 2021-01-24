export const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-submit',
    inactiveButtonClass: 'popup__btn-submit_invalid',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__error_visible',
    error: '.error',
    popupInput: '.popup__input'
};


export class FormValidator {
    constructor(config, formSelector) {
        this._config = config;
        this._formSelector = formSelector;
        this._button = this._formSelector.querySelector('.popup__btn-submit');
    }

    checkError() {     /* очистка от ошибок при открытии попап-карточки*/
        const errors = this._formSelector.querySelectorAll(this._config.error);
        const popupInput = this._formSelector.querySelectorAll(this._config.popupInput);
        errors.forEach(e => {
            e.textContent = "";
        });

        popupInput.forEach(e => {
            e.classList.remove(this._config.inputErrorClass);
        });
    }

    _showError(form, input) {
        const error = this._formSelector.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this._config.inputErrorClass);
    }

    _hideError(form, input) {
        const error = this._formSelector.querySelector(`#${input.id}-error`);
        error.textContent = "";
        input.classList.remove(this._config.inputErrorClass);
    }

    checkInputValidity(form, input, config) {
        if (input.validity.valid) {
            this._hideError(form, input, this._config);
        } else {
            this._showError(form, input, this._config);
        }
    }

    setButtonState(button, isActive) {
        if (isActive) {
            this._button.classList.remove(this._config.inactiveButtonClass);
            this._button.disabled = false;
        } else {
            this._button.classList.add(this._config.inactiveButtonClass);
            this._button.disabled = true;
        }
    }

    _setEventListener(form) {
        const popupBtnSubmit = this._formSelector.querySelector(this._config.submitButtonSelector); /* кнопка submit попапа*/
        const inputList = this._formSelector.querySelectorAll(this._config.inputSelector);

        inputList.forEach(input => {
            input.addEventListener('input', (evt) => {
                this.checkInputValidity(form, input, this._config);
                this.setButtonState(popupBtnSubmit, form.checkValidity());
            });
        });
    }

    enableValidation() {
        this._setEventListener(this._formSelector, this._config);

        this._formSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        const popupBtnSubmit = this._formSelector.querySelector(this._config.submitButtonSelector); /* кнопка submit попапа*/
        this.setButtonState(popupBtnSubmit, this._formSelector.checkValidity());

    }

}


