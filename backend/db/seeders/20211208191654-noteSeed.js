'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Notes', [
      {
        title: 'note 1',
        content: 'look, mom! i wrote my first note!',
        notebookId: 1,
        userId: 1
      },
      {
        title: 'note 2',
        content: 'look, dad! i wrote my second note!',
        notebookId: 1,
        userId: 1
      },
      {
        title: 'note 3',
        content: 'look, grandma! i wrote my third note!',
        notebookId: 1,
        userId: 1
      },
      {
        title: 'note 4',
        content: 'look, grandpa! i wrote my fourth note!',
        notebookId: 1,
        userId: 1
      },
      {
        title: '',
        content: 'test: untitled',
        notebookId: 2,
        userId: 1
      },
      {
        title: 'test: no content',
        content: '',
        notebookId: 3,
        userId: 1
      },
      {
        title: '',
        content: '',
        notebookId: 4,
        userId: 1
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Notes', null, {});
  }
};
