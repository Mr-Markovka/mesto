export default class Card {
    constructor(data, templateSelector, openImage) {
        this._name = data.name;
        this._link = data.link;
        this._title = data.name;
        this._templateSelector = templateSelector;
        this.openImage = openImage;
        this._card = null;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._card = this._getTemplate();
        this._setEventListeners();

        this._card.querySelector('.cards__img').alt = this._name;
        this._card.querySelector('.cards__img').src = this._link;
        this._card.querySelector('.cards__title').textContent = this._title;

        return this._card;
    }

    _setEventListeners() {
        this._card.querySelector('.cards__like').addEventListener('click', () => {
            this._handleLikeClick();
        });

        this._card.querySelector('.cards__btn-remove').addEventListener('click', () => {
            this._deleteClickHandler()
        });

        this._card.querySelector('.cards__img').addEventListener('click', () => {
            this.openImage({ name: this._name, link: this._link });
        });
    }

    _handleLikeClick() {
        this._card.querySelector('.cards__like').classList.toggle('cards__like_active');
    }

    _deleteClickHandler = () => {
        this._card.remove();
    }

}