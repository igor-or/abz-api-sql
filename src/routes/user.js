const express = require('express');

const { isAuthorized, notExistingUser } = require('../middleware/auth');
const { imageUploader } = require('../middleware/upload');
const {
    paginatedRequestSchema,
    getUserSchema,
    postUserSchema,
    validate,
} = require('../middleware/validation');
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
