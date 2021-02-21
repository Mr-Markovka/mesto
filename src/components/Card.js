
export default class Card {
    constructor({ name, link, likes, owner, _id, currentId }, handleCardClick, templateSelector, handleTrashClick, handleCardLike) {
        this._name = name;
        this._link = link;
        this._title = name;
        this._likes = likes;
        this._likesNum = data._likesNum;
        this._cardId = _id;
        this._currentId = currentId;
        this._idOwner = owner._id;
        this._templateSelector = templateSelector;
        this._card = null;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._handleCardLike = handleCardLike;
        // this._removeLike = removeLike;
        // this._addLike = addLike;
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

        // this._likesNum.textContent = this._likes.length;
        // this.likes.forEach((item) => {
        //     if (item._id === this._currentId) {
        //         this._cardLike.classList.add('cards__like_active');
        //     }
        // })

        this._checkId();
        this.setCardLiked(this._num);
        this._setEventListeners();
        return this._card;
    }

    _setEventListeners() {
        this._cardLike.addEventListener('click', () => {
            this._handleCardLike(_toggleLike());
        });

        this._cardsBtnRemove.addEventListener('click', () => {
            this._handleTrashClick(this._deleteCard.bind(this));
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick({ name: this._name, link: this._link, likes: this._likes });
        });

    }

    _toggleLike() {
        this._cardLike.classList.toggle('cards__like_active');
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

    // isCardLiked() {
    //     const isLiked = this._cardLike.classList.contains('cards__like_active');
    //     return isLiked;
    // }

    // setCardLiked(num) {
    //     console.log(num);
    //     this._num = num;


    //     if (this.isCardLiked()) {
    //         this._cardLike.classList.add('cards__like_active');
    //     } else {
    //         this._cardLike.classList.remove('cards__like_active');
    //     }
    // }
    // /************************************************** */
    // likesCounter(counter) {
    //     this._likesNum.textContent = counter;
    // }
    // _likesButton(evt) {
    //     this._addLike();
    //     if (!evt.target.classList.contains('cards__like_active')) {
    //         this._cardLike.classList.add('cards__like_active');
    //         this._addLike();
    //     } else {
    //         this._cardLike.classList.remove('cards__like_active');
    //         this._removeLike();
    //     }

    // }





}



