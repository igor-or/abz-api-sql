const express = require('express');

const { isAuthorized, notExistingUser } = require('../middleware/auth');
const { imageUploader } = require('../middleware/upload');
const { validate } = require('../middleware/validation/handler');
const schemas = require('../middleware/validation/schemas');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', validate(schemas.getUsers), userController.getAllUsers);

router.get('/:id', validate(schemas.getUser), userController.getUserById);

router.post(
    '/',
    isAuthorized,
    imageUploader,
    validate(schemas.postUser),
    notExistingUser,
    userController.createNewUser
);

module.exports = router;
