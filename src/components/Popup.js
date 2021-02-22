export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._button = this._popup.querySelector('.popup__btn-close');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
    }

    _closeOnOverlay(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        };
    }

    setEventListeners() {
        this._button.addEventListener('click', () => {
            this.close();
        });

        this._popup.addEventListener('click', (evt) => {
            this._closeOnOverlay(evt);
        });
    }
}
