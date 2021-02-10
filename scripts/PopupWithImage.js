import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imgEl = this._popup.querySelector('.popup__image');
        this._textEl = this._popup.querySelector('.popup__alt')
    }

    open({ name, link }) {
        this._imgEl.src = link;
        this._textEl.textContent = name;
        this._imgEl.alt = name;
        super.open();
    }
}


