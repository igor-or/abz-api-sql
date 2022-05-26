const { validationResult } = require('express-validator');

exports.validate = schemas => async (req, res, next) => {
    if (!Array.isArray(schemas)) schemas = [schemas];
    await Promise.all(schemas.map(schema => schema.run(req)));

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
