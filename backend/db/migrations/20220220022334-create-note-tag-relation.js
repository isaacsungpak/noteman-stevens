'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('NoteTagRelations', {
      noteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: { model : "Notes" }
      },
      tagId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: { model : "Tags" }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('NoteTagRelations');
  }
};
