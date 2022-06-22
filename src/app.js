const path = require('path');

const express = require('express');

const Token = require('./services/token');
const userRouter = require('./routes/user');
const positionRouter = require('./routes/position');

const app = express();

const imagesPath = path.join(__dirname, '..', 'data', 'images');
// .replaceAll('\\', '/');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Token'
    );
    next();
});

app.use('/images', express.static(imagesPath));

app.use('/api/token', (req, res, next) => {
    const token = new Token();
    res.status(200).json({ success: true, token: token.value });
});

app.use('/api/users', userRouter);
app.use('/api/positions', positionRouter);

app.use((req, res, next) => {
    const error = new Error('Page not found');
    error.statusCode = 404;
    next(error);
});

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    const status = error.statusCode || 500;
    const message = error.message;
    // const message =
    //     error.statusCode === 500 ? 'Internal server error' : error.message;
    const data = error.data;

    res.status(status).json({ success: false, message: message, fails: data });
});

module.exports = app;
