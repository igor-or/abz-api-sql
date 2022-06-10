const tinify = require('tinify');

const config = require('../config');

const userDao = require('../dao/user');

class UserService {
    constructor() {
        this.entityName = 'users';
    }

    async getAll(offset, limit) {
        return userDao.getAll(offset, limit);
    }

    async count() {
        return userDao.count();
    }

    async getById(id) {
        return userDao.getById(id);
    }

    async getByEmail(email) {
        return userDao.getByEmail(email);
    }

    async getByPhone(phone) {
        return userDao.getByPhone(phone);
    }

    async create(newUserData) {
        tinify.key = config.TINIFY_API_KEY;

        const { buffer, path, url } = newUserData.photo;

        await this.#cropPhotoAndSave(buffer, path);

        const user = await userDao.create({
            ...newUserData,
            photo: url,
        });
        return user;
    }

    async #cropPhotoAndSave(buffer, path) {
        const source = tinify.fromBuffer(buffer);

        const resized = source.resize({
            method: 'cover',
            width: 70,
            height: 70,
        });

        await resized.toFile(path);
    }
}

module.exports = new UserService();
