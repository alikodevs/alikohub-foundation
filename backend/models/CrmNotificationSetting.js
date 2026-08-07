'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class CrmNotificationSetting extends Model {
    static associate() {}
  }

  CrmNotificationSetting.init(
    {
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      singleton: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      notificationsEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'notifications_enabled',
      },
      recipients: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
      notifyOnInquiry: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'notify_on_inquiry',
      },
      notifyOnTask: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'notify_on_task',
      },
      notifyOnDonation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'notify_on_donation',
      },
      notifyOnNewsletter: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'notify_on_newsletter',
      },
      digestFrequency: {
        type: DataTypes.ENUM('instant', 'daily', 'weekly'),
        allowNull: false,
        defaultValue: 'instant',
        field: 'digest_frequency',
      },
    },
    {
      sequelize,
      modelName: 'CrmNotificationSetting',
      tableName: 'crm_notification_settings',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['singleton'],
        },
      ],
    }
  );

  return CrmNotificationSetting;
};
