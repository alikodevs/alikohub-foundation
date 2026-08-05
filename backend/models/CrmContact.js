'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class CrmContact extends Model {
    static associate(models) {
      CrmContact.belongsTo(models.CrmOrganization, {
        foreignKey: 'organizationId',
        as: 'organization',
      });
      CrmContact.hasMany(models.FoundationInquiry, {
        foreignKey: 'contactId',
        as: 'inquiries',
      });
      CrmContact.hasMany(models.CrmActivity, {
        foreignKey: 'contactId',
        as: 'activities',
      });
      CrmContact.hasMany(models.CrmDeal, {
        foreignKey: 'contactId',
        as: 'deals',
      });
      CrmContact.hasMany(models.CrmTask, {
        foreignKey: 'contactId',
        as: 'tasks',
      });
      CrmContact.hasMany(models.CrmDonation, {
        foreignKey: 'contactId',
        as: 'donations',
      });
    }
  }

  CrmContact.init(
    {
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organizationId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        field: 'organization_id',
      },
      organizationName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'organization_name',
      },
      contactType: {
        type: DataTypes.ENUM(
          'donor',
          'partner',
          'volunteer',
          'media',
          'beneficiary',
          'staff',
          'other'
        ),
        allowNull: false,
        defaultValue: 'other',
        field: 'contact_type',
      },
      lifecycleStage: {
        type: DataTypes.ENUM('lead', 'engaged', 'active', 'lapsed', 'archived'),
        allowNull: false,
        defaultValue: 'lead',
        field: 'lifecycle_stage',
      },
      tags: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
      source: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'CrmContact',
      tableName: 'crm_contacts',
      timestamps: true,
      underscored: true,
    }
  );

  return CrmContact;
};
