const express = require('express');

const { isAuthorized, notExistingUser } = require('../middleware/auth');
const { imageUploader } = require('../middleware/upload');
const { validate } = require('../middleware/validation/handler');
const {
    paginatedRequestSchema,
    getUserSchema,
    postUserSchema,
} = require('../middleware/validation/schemas');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', validate(paginatedRequestSchema), userController.getAllUsers);

router.get('/:id', validate(getUserSchema), userController.getUserById);

router.post(
    '/',
    isAuthorized,
    imageUploader,
    validate(postUserSchema),
    notExistingUser,
    userController.createNewUser
);

module.exports = router;
