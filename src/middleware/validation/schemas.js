const { body, param, query } = require('express-validator');
const { numberInRange } = require('../../util/validators');

const paginatedRequest = [
    query('count')
        .optional()
        .isInt() //.isInt({ min: 1, max: 100 })
        .withMessage('The count must be an integer.')
        .custom(numberInRange('count', { min: 1, max: 100 })),
    query('page')
        .optional()
        .isInt() //.isInt({ min: 1 })
        .withMessage('The page must be an integer.')
        .custom(numberInRange('page', { min: 1 })),
    query('offset')
        .optional()
        .isInt() //.isInt({ min: 0 })
        .withMessage('The offset must be an integer.')
        .custom(numberInRange('offset', { min: 0 })),
];

const getUsers = paginatedRequest;

const getUser = param('id', 'The user_id must be an integer.').isInt();

const postUser = [
    body(
        'name',
        'The name must be at least 2 characters and not greater than 60.'
    )
        .trim()
        .isLength({ min: 2, max: 60 }),
    body('email')
        .isEmail()
        // OR .matches(/^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/),
        .withMessage('The email must be a valid email address.')
        .normalizeEmail({ all_lowercase: true, gmail_remove_dots: false }),
    body('phone')
        .isMobilePhone('uk-UA')
        // OR .matches(/^[\+]{0,1}380([0-9]{9})$/)
        .withMessage(
            'The phone number starts with +380 and must be a valid phone number '
        ),
    body('position_id')
        .isInt()
        .withMessage('The position id must be an integer.')
        .custom(numberInRange('position_id', { min: 1 })),
];

module.exports = { getUsers, getUser, postUser };
