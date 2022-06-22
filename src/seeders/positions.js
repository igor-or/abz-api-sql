const Position = require('../models/position');


class PositionSeeder {
    #positions;

    constructor() {
        this.#positions = [
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
    }

    async ensurePopulated() {
        const positionsCount = await Position.count();
        if (!positionsCount) {
            await Position.bulkCreate(this.#positions);
            console.log('Positions seeded to database');
        }
    }
}

module.exports = new PositionSeeder();
