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
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
    Note.belongsTo(models.Notebook, { foreignKey: 'notebookId', onDelete: 'cascade', hooks: true });
  };
  return Note;
};
