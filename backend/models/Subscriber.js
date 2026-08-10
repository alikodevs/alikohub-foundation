'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Subscriber extends Model {
    static associate(models) {
      // no relations needed
    }
  }

  Subscriber.init(
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
        validate: {
          isEmail: true,
        },
      },
      status: {
        type: DataTypes.ENUM('active', 'unsubscribed'),
        defaultValue: 'active',
      },
      source: {
        type: DataTypes.STRING,
        defaultValue: 'website',
      },
    },
    {
      sequelize,
      modelName: 'Subscriber',
      tableName: 'subscribers',
      timestamps: true,
      underscored: true,
    }
  );

  return Subscriber;
};
