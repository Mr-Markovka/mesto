export class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._button = this._form.querySelector('.popup__btn-submit');
        this._input = this._form.querySelectorAll(this._config.popupInput);
        this._errors = this._form.querySelectorAll(this._config.error);
    }

    checkError() {     /* очистка от ошибок при открытии попап-карточки*/
        this._errors.forEach(e => {
            e.textContent = "";
        });

        this._input.forEach(e => {
            e.classList.remove(this._config.inputErrorClass);
        });
    }

    _showError(form, input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this._config.inputErrorClass);
    }

    _hideError(form, input) {
        const error = this._form.querySelector(`#${input.id}-error`);
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

    setButtonState(isActive) {
        if (isActive) {
            this._button.classList.remove(this._config.inactiveButtonClass);
            this._button.disabled = false;
        } else {
            this._button.classList.add(this._config.inactiveButtonClass);
            this._button.disabled = true;
        }
    }

    _setEventListener(form) {
        const inputList = this._form.querySelectorAll(this._config.inputSelector);

        inputList.forEach(input => {
            input.addEventListener('input', (evt) => {
                this.checkInputValidity(form, input, this._config);
                this.setButtonState(form.checkValidity());
            });
        });
    }

    enableValidation() {
        this._setEventListener(this._form, this._config);

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this.setButtonState(this._form.checkValidity());

    }

}


