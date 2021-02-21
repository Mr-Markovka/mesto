export default class Api {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl;
        this.headers = headers;
    }

    getAllInfo() {
        return Promise.all([this.getInfoUser(), this.getInitialCards()]);
    }
    getInfoUser() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });

    }

    changeUserInfo(resData) {
        // console.log(resData);
        // console.log(resData.name, resData.about);
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: resData.name,
                about: resData.about
            })


        })

            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });


    }
    // changeAvatar() {
    //     return fetch(`${this._url}me/avatar`, {
    //         method: 'PATCH',
    //         headers: this.headers,
    //         body: JSON.stringify({
    //             avatar: ''
    //         })
    //     })
    //         .then(res => {
    //             if (res.ok) {
    //                 return res.json();
    //             }

    //             // если ошибка, отклоняем промис
    //             return Promise.reject(`Ошибка: ${res.status}`);
    //         });

    // }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });

    }

    removeCard(id) {
        console.log(id);
        console.log(`${this._url}/cards/${id}`);
        return fetch(`${this._url}/cards/${id}`, {

            method: 'DELETE',
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });

    }

    putLike(cardId) {
        console.log('putLike - ', cardId);
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });

    }

    deleteLike(cardId) {
        console.log('deleteLike - ', cardId);
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });

    }
}
