const multer = require('multer');

const storage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
    if (!(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg')) {
        req.file_errors = [];
        req.file_errors.push(
            'Attached file is not supported image type (jpg/jpeg)'
        );
        return cb(null, false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: { fileSize: 5242880 },
});

const uploadSingle = upload.single('photo');

exports.imageUploader = (req, res, next) => {
    uploadSingle(req, res, multerErrorHandler.call(null, req, res, next));
};

const multerErrorHandler = (req, res, next) => error => {
    if (!req.file_errors) req.file_errors = [];

    if (error instanceof multer.MulterError) {
        if (error.message === 'File too large') {
            req.file_errors.push('The photo may not be greater than 5 Mbytes.');
        } else {
            req.file_errors.push(error.message);
        }
    } else if (error) {
        error.message = 'Internal server error';
        error.statusCode = 500;
        next(error);
    }

    if (req.file) {
        let dimensions = sizeOf(req.file.buffer);
        if (dimensions.width < 70 || dimensions.height < 70) {
            req.file_errors.push(
                'The photo must be at least 70px width and height.'
            );
        }
    }

    if (!req.file && !req.file_errors.length) {
        req.file_errors.push('Image not provided.');
    }

    next();
};
