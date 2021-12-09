'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Notes', [
      {
        title: 'noteman stevens',
        content: 'noteman, noteman, noteman, that boi up to somethin',
        notebookId: 1,
        userId: 1
      },
      {
        title: '',
        content: 'test: untitled',
        notebookId: 1,
        userId: 1
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Notes', null, {});
  }
};
