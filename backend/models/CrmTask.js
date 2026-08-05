'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class CrmTask extends Model {
    static associate(models) {
      CrmTask.belongsTo(models.CrmContact, { foreignKey: 'contactId', as: 'contact' });
      CrmTask.belongsTo(models.CrmDeal, { foreignKey: 'dealId', as: 'deal' });
    }
  }

  CrmTask.init(
    {
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      title: { type: DataTypes.STRING, allowNull: false },
      details: { type: DataTypes.TEXT, allowNull: true },
      contactId: { type: DataTypes.STRING(36), allowNull: true, field: 'contact_id' },
      dealId: { type: DataTypes.STRING(36), allowNull: true, field: 'deal_id' },
      dueDate: { type: DataTypes.DATEONLY, allowNull: true, field: 'due_date' },
      status: {
        type: DataTypes.ENUM('open', 'in_progress', 'done', 'cancelled'),
        allowNull: false,
        defaultValue: 'open',
      },
      priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: false,
        defaultValue: 'medium',
      },
      assignedTo: { type: DataTypes.STRING(36), allowNull: true, field: 'assigned_to' },
      createdBy: { type: DataTypes.STRING(36), allowNull: true, field: 'created_by' },
    },
    {
      sequelize,
      modelName: 'CrmTask',
      tableName: 'crm_tasks',
      timestamps: true,
      underscored: true,
    }
  );

  return CrmTask;
};
