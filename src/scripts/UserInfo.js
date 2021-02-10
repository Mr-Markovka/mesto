export default class UserInfo {
    constructor({ name, about }) { /*делаем выборку из DOM именно эти элементы мы и передаем в конструктор класса */
        this._nameElem = name;  /*В конструкторе эти ссылки на DOM сохраняем в поля объекта this, так же задаем еще два поля, где в будущем будут хранится имя и профессия. this._job и this._name пока делаем их пустыми. */
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
