const tinify = require('tinify');

const config = require('../config');

const User = require('../models/user');
const Position = require('../models/position');

const entity_name = 'users';

const getAll = async (offset, limit) => {
    try {
        const users = await User.findAll({
            include: {
                model: Position,
                // attributes: {
                //     exclude: ['id'],
                // },
                nested: false,
            },
            offset: offset,
            limit: limit,
            order: [['id', 'ASC']],
        });

        return users.map(user => {
            const fetchedUser = {
                ...user.toJSON(),
                position_id: user.position.id,
                position: user.position.name,
            };
            delete fetchedUser.positionId;
            return fetchedUser;
        });
    } catch (error) {
        throw error;
    }
};

const count = async () => {
    return User.count();
};

const getUserById = async id => {
    try {
        const user = await User.findByPk(id, {
            include: {
                model: Position,
                // attributes: {
                //     exclude: ['id'],
                // },
                nested: false,
            },
            attributes: {
                exclude: ['registration_timestamp'],
            },
        });
        const fetchedUser = {
            ...user.toJSON(),
            position_id: user.position.id,
            position: user.position.name,
        };
        delete fetchedUser.positionId;
        return fetchedUser;
    } catch (error) {
        throw error;
    }
};

const getUserByEmail = async email => {
    try {
        return User.findOne({ where: { email: email } });
    } catch (error) {
        throw error;
    }
};

const getUserByPhone = async phone => {
    try {
        return User.findOne({ where: { phone: phone } });
    } catch (error) {
        throw error;
    }
};

const createNewUser = async newUserData => {
    tinify.key = config.TINIFY_API_KEY;

    const { buffer, path, url } = newUserData.photo;

    try {
        await cropPhotoAndSave(buffer, path);

        const user = await User.create({
            ...newUserData,
            positionId: newUserData.position_id,
            photo: url,
        });
        return user;
    } catch (err) {
        console.log(err);
    }
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
    getUserById,
    getUserByEmail,
    getUserByPhone,
    createNewUser,
};
