'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: {
      type: DataTypes.STRING(50),
    },
    content: DataTypes.TEXT,
    notebookId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Note.associate = function(models) {
    Note.belongsTo(models.Notebook, { foreignKey: 'notebookId' });
    Note.hasMany(models.NoteTagRelation, { foreignKey: 'noteId', onDelete: 'cascade', hooks: true });
  };
  return Note;
};
