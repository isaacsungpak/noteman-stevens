'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Notebook.associate = function(models) {
    // associations can be defined here
    Notebook.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'cascade', hooks: true });
    Notebook.hasMany(models.Note, { foreignKey: 'notebookId' });
  };
  return Notebook;
};
