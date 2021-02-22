import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._form = this._popup.querySelector('.popup__form');
        this._buttonSave = this._popup.querySelector('.popup__btn-submit');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._changeButtonText();
            this._handleFormSubmit(this._getInputValues());

            this._setTimeout();

        });
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        super.close();
    }
    _changeButtonText() {
        this._buttonSave.innerHTML = 'Сохранение...';
    }
    _setTimeout() {
        setTimeout(this.close.bind(this), 2000);
    }
}