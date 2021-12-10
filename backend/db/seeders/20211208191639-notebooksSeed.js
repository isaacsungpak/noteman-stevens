'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Notebooks', [
      {
        title: 'this is a notebook',
        userId: 1
      },
      {
        title: 'this is also a notebook',
        userId: 1
      },
      {
        title: 'wow, a third notebook?',
        userId: 1
      },
      {
        title: 'notebookman, notebookman, notebookman',
        userId: 1
      },
      {
        title: "'/' & logo x7",
        userId: 1
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notebooks', null, {});
  }
};
