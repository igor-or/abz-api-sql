const path = require('path');

const userService = require('../services/user');

const { paginate } = require('../middleware/pagination');

const getAllUsers = async (req, res, next) => {
    try {
        const paginatedUsers = await paginate(userService).call(
            null,
            req,
            res,
            next
        );
        res.status(200).json(paginatedUsers);
    } catch (error) {
        error.statusCode = 500;
        // error.message = 'Internal server error';
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    const {
        params: { id },
    } = req;
    
    try {
        const user = await userService.getUserById(id);

        if (!user) {
            errorData = { userId: 'User not found' };
            const error = new Error(
                'The user with the requested identifier does not exist.'
            );
            error.statusCode = 404;
            error.data = errorData;
            next(error);
        }

        res.json({ success: true, user });
    } catch (error) {
        error.statusCode = 500;
        // error.message = 'Internal server error';
        next(error);
    }
};

const createNewUser = async (req, res, next) => {
    const { name, email, phone, position_id } = req.body;
    const { buffer, originalname } = req.file;

    const storagePath = path.join(__dirname, '..', '..', 'data', 'images');
    const newImageName = new Date().getTime() + '-' + originalname;
    const newImagePath = storagePath + '/' + newImageName;

    const photoUrl =
        req.protocol + '://' + req.get('host') + '/images/' + newImageName;

    const newUserData = {
        name,
        email,
        phone,
        position_id,
        photo: { buffer, path: newImagePath, url: photoUrl },
    };

    try {
        const createdUser = await userService.createNewUser(newUserData);

        req.token.invalidate();

        res.status(201).json({
            success: true,
            user_id: createdUser.id,
            message: 'New user successfully registered',
        });
    } catch (error) {
        error.statusCode = 500;
        // error.message = 'Internal server error';
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
};