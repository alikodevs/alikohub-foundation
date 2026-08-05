'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class CrmDonation extends Model {
    static associate(models) {
      CrmDonation.belongsTo(models.CrmContact, { foreignKey: 'contactId', as: 'contact' });
      CrmDonation.belongsTo(models.CrmOrganization, {
        foreignKey: 'organizationId',
        as: 'organization',
      });
    }
  }

  CrmDonation.init(
    {
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      contactId: { type: DataTypes.STRING(36), allowNull: true, field: 'contact_id' },
      organizationId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        field: 'organization_id',
      },
      amount: { type: DataTypes.DECIMAL(14, 2), allowNull: false },
      currency: { type: DataTypes.STRING, allowNull: false, defaultValue: 'USD' },
      donatedAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'donated_at',
      },
      method: { type: DataTypes.STRING, allowNull: true },
      campaign: { type: DataTypes.STRING, allowNull: true },
      isRecurring: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_recurring',
      },
      receiptSent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'receipt_sent',
      },
      notes: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      sequelize,
      modelName: 'CrmDonation',
      tableName: 'crm_donations',
      timestamps: true,
      underscored: true,
    }
  );

  return CrmDonation;
};
