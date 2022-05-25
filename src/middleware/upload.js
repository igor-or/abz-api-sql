const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        req.file_errors = [];
        req.file_errors.push(
            'Attached file is not supported image type (jpg/jpeg)'
        );
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5000000 },
});

const uploadSingle = upload.single('image');

exports.imageUploader = (req, res, next) => {
    uploadSingle(req, res, multerErrorHandler.call(null, req, res, next));
};

const multerErrorHandler = (req, res, next) => error => {
    req.file_errors = [];

    if (error instanceof multer.MulterError) {
        if (error.message === 'File too large') {
            req.file_errors.push('The photo may not be greater than 5 Mbytes.');
        } else {
            req.file_errors.push(error.message);
        }
    } else if (error) {
        // error.message = 'Internal server error';
        error.statusCode = 500;
        next(error);
    }

    if (!req.file) {
        req.file_errors.push('Image not provided.');
    }

    next();
};
