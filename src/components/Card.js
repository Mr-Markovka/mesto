export default class Card {
    constructor(data, handleCardClick, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._title = data.name;
        this._templateSelector = templateSelector;
        this._card = null;
        this._handleCardClick = handleCardClick;
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
        this._cardImage = this._card.querySelector('.cards__img');

        this._cardImage.alt = this._name;
        this._cardImage.src = this._link;
        this._card.querySelector('.cards__title').textContent = this._title;
        this._setEventListeners();
        return this._card;
    }

    _setEventListeners() {
        this._card.querySelector('.cards__like').addEventListener('click', () => {
            this._handleLikeClick();
        });

        this._card.querySelector('.cards__btn-remove').addEventListener('click', () => {
            this._deleteCard();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick({ name: this._name, link: this._link });
        });
    }

    _handleLikeClick() {
        this._card.querySelector('.cards__like').classList.toggle('cards__like_active');
    }

    _deleteCard = () => {
        this._card.remove();
        this._card = null;
    }

}