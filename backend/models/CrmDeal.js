'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class CrmDeal extends Model {
    static associate(models) {
      CrmDeal.belongsTo(models.CrmContact, { foreignKey: 'contactId', as: 'contact' });
      CrmDeal.belongsTo(models.CrmOrganization, {
        foreignKey: 'organizationId',
        as: 'organization',
      });
      CrmDeal.hasMany(models.CrmActivity, { foreignKey: 'dealId', as: 'activities' });
      CrmDeal.hasMany(models.CrmTask, { foreignKey: 'dealId', as: 'tasks' });
    }
  }

  CrmDeal.init(
    {
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      title: { type: DataTypes.STRING, allowNull: false },
      contactId: { type: DataTypes.STRING(36), allowNull: true, field: 'contact_id' },
      organizationId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        field: 'organization_id',
      },
      stage: {
        type: DataTypes.ENUM(
          'prospect',
          'engaged',
          'proposal',
          'agreement',
          'active',
          'declined'
        ),
        allowNull: false,
        defaultValue: 'prospect',
      },
      value: { type: DataTypes.DECIMAL(14, 2), allowNull: true },
      currency: { type: DataTypes.STRING, allowNull: false, defaultValue: 'USD' },
      ownerId: { type: DataTypes.STRING(36), allowNull: true, field: 'owner_id' },
      expectedCloseDate: { type: DataTypes.DATEONLY, allowNull: true, field: 'expected_close_date' },
      notes: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      sequelize,
      modelName: 'CrmDeal',
      tableName: 'crm_deals',
      timestamps: true,
      underscored: true,
    }
  );

  return CrmDeal;
};
