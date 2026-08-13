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
  class Story extends Model {
    static associate() {}
  }

  Story.init(
    {
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      type: {
        type: DataTypes.ENUM('story', 'insight'),
        allowNull: false,
        defaultValue: 'story',
      },
      title: { type: DataTypes.STRING, allowNull: false },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      excerpt: { type: DataTypes.TEXT, allowNull: true },
      body: { type: DataTypes.TEXT, allowNull: true },
      theme: { type: DataTypes.STRING, allowNull: true },
      imageUrl: { type: DataTypes.STRING, allowNull: true, field: 'image_url' },
      authorName: { type: DataTypes.STRING, allowNull: true, field: 'author_name' },
      publishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'published_at',
      },
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
      modelName: 'Story',
      tableName: 'stories',
      timestamps: true,
      underscored: true,
      hooks: {
        beforeValidate: (row) => {
          if (!row.slug && row.title) {
            row.slug = slugify(row.title);
          } else if (row.slug) {
            row.slug = slugify(row.slug);
          }
          if (!row.publishedAt && row.isActive !== false) {
            row.publishedAt = new Date();
          }
        },
      },
    }
  );

  return Story;
};
