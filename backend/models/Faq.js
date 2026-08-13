'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Faq extends Model {
    static associate() {}
  }

  Faq.init(
    {
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      category: {
        type: DataTypes.ENUM('About', 'Support', 'Accountability', 'Contact'),
        allowNull: false,
        defaultValue: 'About',
      },
      question: { type: DataTypes.STRING, allowNull: false },
      answer: { type: DataTypes.TEXT, allowNull: false },
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
      modelName: 'Faq',
      tableName: 'faqs',
      timestamps: true,
      underscored: true,
    }
  );

  return Faq;
};
