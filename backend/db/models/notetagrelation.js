'use strict';
module.exports = (sequelize, DataTypes) => {
  const NoteTagRelation = sequelize.define('NoteTagRelation', {
    noteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ["noteId", "tagId"]
      }
    ]
  });
  NoteTagRelation.associate = function(models) {
    NoteTagRelation.belongsTo(models.Note, { foreignKey: 'noteId' });
    NoteTagRelation.belongsTo(models.Tag, { foreignKey: 'tagId' });
  };
  return NoteTagRelation;
};
