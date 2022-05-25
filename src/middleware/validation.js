const { validationResult } = require('express-validator');

exports.validationChecker = (req, res, next) => {
    let isValid = true;
    const errorData = {};

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            if (!errorData[error.param]) {
                errorData[error.param] = [];
            }
            errorData[error.param].push(error.msg);
        });
        isValid = false;
    }

    if (req.file_errors?.length) {
        errorData.photo = req.file_errors;
        isValid = false;
    }

    if (!isValid) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errorData;
        next(error);
    }

    next();
};
