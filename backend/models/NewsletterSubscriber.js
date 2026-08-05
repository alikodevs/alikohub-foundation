'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class NewsletterSubscriber extends Model {
    static associate(models) {
      // no relations required for Phase 6
    }
  }

  NewsletterSubscriber.init(
    {
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sourcePage: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'source_page',
      },
      status: {
        type: DataTypes.ENUM('subscribed', 'unsubscribed', 'bounced'),
        allowNull: false,
        defaultValue: 'subscribed',
      },
    },
    {
      sequelize,
      modelName: 'NewsletterSubscriber',
      tableName: 'newsletter_subscribers',
      timestamps: true,
      underscored: true,
    }
  );

  return NewsletterSubscriber;
};
