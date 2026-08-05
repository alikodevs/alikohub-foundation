'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class CrmActivity extends Model {
    static associate(models) {
      CrmActivity.belongsTo(models.CrmContact, {
        foreignKey: 'contactId',
        as: 'contact',
      });
      CrmActivity.belongsTo(models.CrmDeal, {
        foreignKey: 'dealId',
        as: 'deal',
      });
    }
  }

  CrmActivity.init(
    {
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      contactId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        field: 'contact_id',
      },
      dealId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        field: 'deal_id',
      },
      activityType: {
        type: DataTypes.ENUM(
          'note',
          'call',
          'email',
          'meeting',
          'event',
          'form_submission'
        ),
        allowNull: false,
        defaultValue: 'note',
        field: 'activity_type',
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      occurredAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        field: 'occurred_at',
      },
      createdBy: {
        type: DataTypes.STRING(36),
        allowNull: true,
        field: 'created_by',
      },
    },
    {
      sequelize,
      modelName: 'CrmActivity',
      tableName: 'crm_activities',
      timestamps: true,
      updatedAt: false,
      underscored: true,
    }
  );

  return CrmActivity;
};
