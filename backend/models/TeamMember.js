'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class TeamMember extends Model {
    static associate() {}
  }

  TeamMember.init(
    {
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      name: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, allowNull: true },
      bio: { type: DataTypes.TEXT, allowNull: true },
      imageUrl: { type: DataTypes.STRING, allowNull: true, field: 'image_url' },
      linkedinUrl: { type: DataTypes.STRING, allowNull: true, field: 'linkedin_url' },
      twitterUrl: { type: DataTypes.STRING, allowNull: true, field: 'twitter_url' },
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
      modelName: 'TeamMember',
      tableName: 'team_members',
      timestamps: true,
      underscored: true,
    }
  );

  return TeamMember;
};
