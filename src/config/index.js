const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    DATABASE_URL:
        'mongodb+srv://' +
        process.env.MONGO_USER +
        ':' +
        process.env.MONGO_PASSWORD +
        '@' +
        process.env.MONGO_SERVER +
        '/' +
        process.env.MONGO_DATABASE +
        '?retryWrites=true&w=majority',
    TINIFY_API_KEY: process.env.TINIFY_API_KEY,
};
