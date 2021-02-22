
export default class Card {
    constructor({ data }, handleCardClick, templateSelector, handleTrashClick, handleCardLike) {
        this._name = data.name;
        this._link = data.link;
        this._title = data.name;
        this._likes = data.likes;
        this._userId = data.userId;
        this._cardId = data._id;
        this._currentId = data.currentId;
        this._idOwner = data.owner._id;
        this._templateSelector = templateSelector;
        this._card = null;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._handleCardLike = handleCardLike;

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
        this._cardsBtnRemove = this._card.querySelector('.cards__btn-remove');
        this._cardLike = this._card.querySelector('.cards__like');
        this._likesNum = this._card.querySelector('.cards__number');

        this._cardImage.alt = this._name;
        this._cardImage.src = this._link;
        this._card.querySelector('.cards__title').textContent = this._title;

        this._likesNum.textContent = this._likes.length;

        this._updateCardLiked();
        this._checkId();
        this._setEventListeners();
        return this._card;
    }

    _setEventListeners() {
        this._cardLike.addEventListener('click', () => {
            this._handleCardLike(this._num);
        });

        this._cardsBtnRemove.addEventListener('click', () => {
            this._handleTrashClick(this._deleteCard.bind(this));
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick({ name: this._name, link: this._link, likes: this._likes });
        });
    }

    _deleteCard() {
        this._card.remove();
        this._card = null;
    }

    _checkId() {
        if (this._currentId !== this._idOwner) {
            this._cardsBtnRemove.remove();
        }
    }

    isCardLiked() {
        return Boolean(this._likes.find(item => item._id === this._currentId));
    }

    _updateCardLiked() {
        this._likesNum.textContent = this._likes.length;

        if (this.isCardLiked()) {
            this._cardLike.classList.add('cards__like_active');
        } else {
            this._cardLike.classList.remove('cards__like_active');
        }
    }

    setCardLiked(dataCard) {
        this._likes = dataCard.likes;
        this._updateCardLiked();
    }
}



