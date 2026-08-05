'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class MediaLibrary extends Model {
    static associate() {
      // uploadedBy stored as string id; no FK to avoid dialect/type mismatches
    }
  }

  MediaLibrary.init(
    {
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      name: { type: DataTypes.STRING, allowNull: false },
      url: { type: DataTypes.STRING, allowNull: false },
      altText: { type: DataTypes.STRING, allowNull: true, field: 'alt_text' },
      fileType: { type: DataTypes.STRING, allowNull: true, field: 'file_type' },
      fileSize: { type: DataTypes.INTEGER, allowNull: true, field: 'file_size' },
      uploadedBy: { type: DataTypes.STRING(36), allowNull: true, field: 'uploaded_by' },
    },
    {
      sequelize,
      modelName: 'MediaLibrary',
      tableName: 'media_library',
      timestamps: true,
      updatedAt: false,
      underscored: true,
    }
  );

  return MediaLibrary;
};
