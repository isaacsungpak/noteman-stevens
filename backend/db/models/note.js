'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    content: DataTypes.TEXT,
    notebookId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
  };
  return Note;
};
