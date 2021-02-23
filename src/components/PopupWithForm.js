import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._form = this._popup.querySelector('.popup__form');
        this._buttonSave = this._popup.querySelector('.popup__btn-submit');
        this._text = this._buttonSave.textContent;
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
            this._renderLoading(true);
            this._handleFormSubmit(this._getInputValues());

            this._setTimeout();

        });
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        this._renderLoading(false);
        super.close();
    }

    _renderLoading(isLoading) {
        if (isLoading) {
            this._buttonSave.innerHTML = 'Сохранение...';
        } else {
            this._buttonSave.innerHTML = this._text;
        }

    }

    _setTimeout() {
        setTimeout(this.close.bind(this), 2000);
    }
}