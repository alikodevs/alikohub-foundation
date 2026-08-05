'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class HeroContent extends Model {
    static associate() {}
  }

  HeroContent.init(
    {
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      title: { type: DataTypes.STRING, allowNull: false },
      subtitle: { type: DataTypes.TEXT, allowNull: true },
      ctaPrimaryText: { type: DataTypes.STRING, allowNull: true, field: 'cta_primary_text' },
      ctaPrimaryLink: { type: DataTypes.STRING, allowNull: true, field: 'cta_primary_link' },
      ctaSecondaryText: { type: DataTypes.STRING, allowNull: true, field: 'cta_secondary_text' },
      ctaSecondaryLink: { type: DataTypes.STRING, allowNull: true, field: 'cta_secondary_link' },
      backgroundImageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'background_image_url',
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
      modelName: 'HeroContent',
      tableName: 'hero_content',
      timestamps: true,
      underscored: true,
    }
  );

  return HeroContent;
};
