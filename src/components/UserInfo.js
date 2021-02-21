export default class UserInfo {
    constructor({ name, about, avatar }) {
        this._nameElem = name;
        this._aboutElem = about;
        this._avatarElem = avatar;
        this._name = '';
        this._about = '';
        this._avatar = '';
        this._id = "";
    }
    getUserInfo() {
        return {
            name: this._name,
            about: this._about,
            // avatar: this._avatar
        };
    }
    updateUserInfo() {
        this._nameElem.textContent = this._name;
        this._aboutElem.textContent = this._about;
        // this._avatarElem.src = this._avatar;
    }
    getMyId() {
        return this._id;
    }

    setUserInfo({ name, about, avatar, _id }) {
        this._name = name;
        this._about = about;
        this._avatar = avatar;
        this._id = _id;
    }
}
