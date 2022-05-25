const app = require('./app');
const config = require('./config');
const User = require('./models/user');
const Position = require('./models/position');

const { generateRandomUsers } = require('./seeders/users');

const sequelize = require('./db');

User.belongsTo(Position);
Position.hasMany(User);

sequelize
    .sync() //{ force: true }
    .then(result => {
        return User.count();
    })
    .then(count => {
        if (!count) {
            return generateRandomUsers(45);
        }
    })
    .then(users => {
        if (users) {
            return User.bulkCreate(users);
        }
    })
    .then(result => {
        app.listen(config.PORT, () => {
            console.log(`API is listening on port ${config.PORT}`);
        });
    })
    .catch(err => console.log(err));
