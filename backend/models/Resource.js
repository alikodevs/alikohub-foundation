'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

module.exports = (sequelize, DataTypes) => {
  class Resource extends Model {
    static associate() {}
  }

  Resource.init(
    {
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      title: { type: DataTypes.STRING, allowNull: false },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      category: {
        type: DataTypes.ENUM('briefs', 'evidence', 'curricula', 'policies'),
        allowNull: false,
        defaultValue: 'briefs',
      },
      tag: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      fileUrl: { type: DataTypes.STRING, allowNull: true, field: 'file_url' },
      externalUrl: { type: DataTypes.STRING, allowNull: true, field: 'external_url' },
      accent: { type: DataTypes.STRING, allowNull: true },
      displayOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'display_order',
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_active',
      },
    },
    {
      sequelize,
      modelName: 'Resource',
      tableName: 'resources',
      timestamps: true,
      underscored: true,
      hooks: {
        beforeValidate: (row) => {
          if (!row.slug && row.title) {
            row.slug = slugify(row.title);
          } else if (row.slug) {
            row.slug = slugify(row.slug);
          }
          if (!row.tag && row.category) {
            const tagMap = {
              briefs: 'Briefs',
              evidence: 'Evidence',
              curricula: 'Curricula',
              policies: 'Policies',
            };
            row.tag = tagMap[row.category] || row.category;
          }
        },
      },
    }
  );

  return Resource;
};
