const positionSeeder = require('./positions');
const userSeeder = require('./users');

exports.ensurePopulated = async () => {
    await positionSeeder.ensurePopulated();
    await userSeeder.ensurePopulated();
};
