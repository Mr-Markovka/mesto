export class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._button = this._form.querySelector(this._config.submitButtonSelector);
        this._inputs = this._form.querySelectorAll(this._config.popupInput);
        this._errors = this._form.querySelectorAll(this._config.error);
    }

    checkError() {     /* очистка от ошибок при открытии попап-карточки*/
        this._errors.forEach(e => {
            e.textContent = "";
        });

        this._inputs.forEach(e => {
            e.classList.remove(this._config.inputErrorClass);
        });
    }

    _showError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this._config.inputErrorClass);
    }

    _hideError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = "";
        input.classList.remove(this._config.inputErrorClass);
    }

    checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideError(input);
        } else {
            this._showError(input);
        }
    }

    setButtonState(isActive) {
        if (isActive) {
            this._button.classList.remove(this._config.inactiveButtonClass);
            this._button.disabled = false;
        } else {
            this._button.classList.add(this._config.inactiveButtonClass);
            this._button.disabled = true;
        }
    }

    _setEventListener() {
        this._inputs.forEach(input => {
            input.addEventListener('input', (evt) => {
                this.checkInputValidity(input);
                this.setButtonState(this._form.checkValidity());
            });
        });
    }

    enableValidation() {
        this._setEventListener();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this.setButtonState(this._form.checkValidity());

    }

}


