const { User } = require('../models');

const userData = [
    {
        username: 'JHall',
        password: '1234'
    },
    {
        username: 'Sedona',
        password: '1234'
    },
    {
        username: 'JimH',
        password: '1234'
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;