const { faker } = require('@faker-js/faker');

const Position = require('../models/position');

exports.generateRandomUsers = async usersCount => {
    const randomUsers = [];

    const numberOfPositions = await Position.count();

    const currentYear = new Date().getFullYear();

    for (let i = 1; i <= usersCount; i++) {
        const firstName = faker.name.findName();

        const newRandomUser = {
            _id: i,
            name: firstName,
            email: faker.internet.email(firstName).toLowerCase(),
            phone: faker.phone.phoneNumber('+380#########'),
            positionId: Math.floor(Math.random() * numberOfPositions + 1), //position.id, // position.id,
            registration_timestamp: faker.date
                .between(
                    new Date(currentYear - 60, 0, 1),
                    new Date(currentYear - 18, 0, 1)
                )
                .getTime(),
            photo: faker.image.avatar(),
        };

        randomUsers.push(newRandomUser);
    }

    return randomUsers;
};
