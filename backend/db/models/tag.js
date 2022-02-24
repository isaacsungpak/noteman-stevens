'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Tag.associate = function(models) {
    Tag.belongsTo(models.User, { foreignKey: 'userId' });
    Tag.hasMany(models.NoteTagRelation, { foreignKey: 'tagId', onDelete: 'cascade', hooks: true });
  };
  return Tag;
};
