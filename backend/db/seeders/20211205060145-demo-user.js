'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo-user@important.gov',
        username: 'demo-user',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: faker.internet.email(),
        username: 'realgyorgypolya',
        hashedPassword: bcrypt.hashSync(faker.internet.password())
      },
      {
        email: faker.internet.email(),
        username: 'svetlanaQwQ',
        hashedPassword: bcrypt.hashSync(faker.internet.password())
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['demo-user', 'realgyorgypolya', 'svetlanaQwQ'] }
    }, {});
  }
};