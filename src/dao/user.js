const User = require('../models/user');
const Position = require('../models/position');

class UserDao {
    async count() {
        return User.count();
    }

    async getAll(offset, limit) {
        const fetchedUsers = await User.findAll({
            include: {
                model: Position,
                nested: false,
            },
            offset: offset,
            limit: limit,
            order: [['id', 'ASC']],
        });

        if (!fetchedUsers) {
            return [];
        }

        return fetchedUsers.map(fetchedUser => {
            const user = {
                ...fetchedUser.toJSON(),
                position_id: fetchedUser.position.id,
                position: fetchedUser.position.name,
            };
            delete user.positionId;
            return user;
        });
    }

    async getById(id) {
        const fetchedUser = await User.findByPk(id, {
            include: {
                model: Position,
                nested: false,
            },
            attributes: {
                exclude: ['registration_timestamp'],
            },
        });

        if (!fetchedUser) {
            errorData = { userId: 'User not found' };
            const error = new Error(
                'The user with the requested identifier does not exist.'
            );
            error.statusCode = 404;
            error.data = errorData;
            throw error;
        }

        const user = {
            ...fetchedUser.toJSON(),
            position_id: fetchedUser.position.id,
            position: fetchedUser.position.name,
        };
        delete user.positionId;
        return user;
    }

    async getByEmail(email) {
        return User.findOne({ where: { email: email } });
    }

    async getByPhone(phone) {
        return User.findOne({ where: { phone: phone } });
    }

    async create(userData) {
        return await User.create({
            ...userData,
            positionId: userData.position_id,
        });
    }
}

module.exports = new UserDao();
