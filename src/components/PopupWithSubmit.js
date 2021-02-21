import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._confirmButton = this._popup.querySelector('.popup-confirm__btn-submit');
        this._form = this._popup.querySelector('.popup__form');
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
        });
        super.setEventListeners();
    }

    open(func) {
        this._handleFormSubmit = func;
        super.open();
    }
}