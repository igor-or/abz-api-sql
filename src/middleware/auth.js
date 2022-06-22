const Token = require('../services/token');
const {
    getByEmail: getUserByEmail,
    getByPhone: getUserByPhone,
} = require('../services/user');

exports.isAuthorized = function (req, res, next) {
    // const authHeader = req.get('Authorization');
    const authHeader = req.get('Token');
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        next(error);
    }

    // const encodedToken = authHeader.split(' ')[1];
    const encodedToken = authHeader;
    const token = new Token(encodedToken);

    if (!token.isValid) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        next(error);
    }

    req.token = token;
    next();
};

exports.notExistingUser = async (req, res, next) => {
    const { email, phone } = req.body;

    try {
        let user = await getUserByEmail(email);
        if (!user) user = await getUserByPhone(phone);

        if (user) {
            const error = new Error(
                'User with this phone or email already exist.'
            );
            error.statusCode = 409;
            next(error);
        }

        next();
    } catch (error) {
        // error.message = 'Internal server error';
        error.statusCode = 500;
        next(error);
    }
};
