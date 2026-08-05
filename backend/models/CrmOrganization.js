'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class CrmOrganization extends Model {
    static associate(models) {
      CrmOrganization.hasMany(models.CrmContact, {
        foreignKey: 'organizationId',
        as: 'contacts',
      });
      CrmOrganization.hasMany(models.CrmDeal, {
        foreignKey: 'organizationId',
        as: 'deals',
      });
      CrmOrganization.hasMany(models.CrmDonation, {
        foreignKey: 'organizationId',
        as: 'donations',
      });
    }
  }

  CrmOrganization.init(
    {
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      name: { type: DataTypes.STRING, allowNull: false },
      website: { type: DataTypes.STRING, allowNull: true },
      orgType: { type: DataTypes.STRING, allowNull: true, field: 'org_type' },
      country: { type: DataTypes.STRING, allowNull: true },
      notes: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      sequelize,
      modelName: 'CrmOrganization',
      tableName: 'crm_organizations',
      timestamps: true,
      underscored: true,
    }
  );

  return CrmOrganization;
};
