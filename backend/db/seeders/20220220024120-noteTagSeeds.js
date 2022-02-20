'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('NoteTagRelations', [{
      noteId: 1,
      tagId: 1
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('NoteTagRelations', null, {});
  }
};
