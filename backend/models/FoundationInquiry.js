'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class FoundationInquiry extends Model {
    static associate(models) {
      FoundationInquiry.belongsTo(models.CrmContact, {
        foreignKey: 'contactId',
        as: 'contact',
      });
    }
  }

  FoundationInquiry.init(
    {
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      inquiryType: {
        type: DataTypes.ENUM('partnership', 'volunteer', 'media', 'general'),
        allowNull: false,
        defaultValue: 'general',
        field: 'inquiry_type',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      organization: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      sourcePage: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'source_page',
      },
      status: {
        type: DataTypes.ENUM('new', 'in_review', 'responded', 'archived'),
        allowNull: false,
        defaultValue: 'new',
      },
      adminNotes: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'admin_notes',
      },
      contactId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        field: 'contact_id',
      },
    },
    {
      sequelize,
      modelName: 'FoundationInquiry',
      tableName: 'foundation_inquiries',
      timestamps: true,
      underscored: true,
    }
  );

  return FoundationInquiry;
};
