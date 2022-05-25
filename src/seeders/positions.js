const Position = require('../models/position');

const positions = [
    {
        _id: 1,
        name: 'Lawyer',
    },
    {
        _id: 2,
        name: 'Content manager',
    },
    {
        _id: 3,
        name: 'Security',
    },
    {
        _id: 4,
        name: 'Designer',
    },
];

(async function () {
    try {
        await Position.sync(); //{ force: true }
        await Position.bulkCreate(positions).then(result =>
            console.log(result)
        );
        console.log('Added positions to database');
    } catch (err) {
        console.log(err);
    }
    process.exit();
})();
