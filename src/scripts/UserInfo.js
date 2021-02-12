export default class UserInfo {
    constructor({ name, about }) {
        this._nameElem = name;
        this._aboutElem = about;
        this._name = '';
        this._about = '';
    }
    getUserInfo() {
        return {
            name: this._name,
            about: this._about,
        };
    }

    setUserInfo(newName, newAbout) {
        this._name = newName;
        this._about = newAbout;
    }

    updateUserInfo() {
        this._nameElem.textContent = this._name;
        this._aboutElem.textContent = this._about;
    }
}
