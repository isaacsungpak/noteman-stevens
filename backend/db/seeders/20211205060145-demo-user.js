'use strict';
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
        email: 'gyorgy.polya@aol.com',
        username: 'realgyorgypolya',
        hashedPassword: bcrypt.hashSync('problemsolvingidk')
      },
      {
        email: 'colaman@cocacola.co',
        username: 'slavojzizek',
        hashedPassword: bcrypt.hashSync('cocacola')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    // const Op = Sequelize.Op;
    // return queryInterface.bulkDelete('Users', {
    //   username: { [Op.in]: ['demo-user', 'realgyorgypolya', 'svetlanaQwQ'] }
    // }, {});
    return queryInterface.bulkDelete('Users', null, {});
  }
};
