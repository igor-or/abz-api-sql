const tinify = require('tinify');

const config = require('../config');

const userDao = require('../dao/user');

const entity_name = 'users';

const getAll = async (offset, limit) => {
    return userDao.getAll(offset, limit);
};

const count = async () => {
    return userDao.count();
};

const getById = async id => {
    return userDao.getById(id);
};

const getByEmail = async email => {
    return userDao.getByEmail(email);
};

const getByPhone = async phone => {
    return userDao.getByPhone(phone);
};

const create = async newUserData => {
    tinify.key = config.TINIFY_API_KEY;

    const { buffer, path, url } = newUserData.photo;

    await cropPhotoAndSave(buffer, path);

    const user = await userDao.create({
        ...newUserData,
        photo: url,
    });
    return user;
};

const cropPhotoAndSave = async (buffer, path) => {
    const source = tinify.fromBuffer(buffer);

    const resized = source.resize({
        method: 'cover',
        width: 70,
        height: 70,
    });

    await resized.toFile(path);
};

module.exports = {
    entity_name,
    count,
    getAll,
    getById,
    getByEmail,
    getByPhone,
    create,
};
