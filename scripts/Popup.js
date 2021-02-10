export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._button = this._popup.querySelector('.popup__btn-close');
    }

    open() {
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this._popup.classList.remove('popup_opened');
        };
    }

    _closeOnOverlay(evt) {
        if (evt.target.classList.contains('popup')) {
            evt.target.classList.remove('popup_opened');
        };
    }

    setEventListeners() {
        this._button.addEventListener('click', () => {
            this.close();
        });

        this._popup.addEventListener('click', (evt) => {
            this._closeOnOverlay(evt);
        });

        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
    }

}
