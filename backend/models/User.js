'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile, {
        foreignKey: 'id',
        as: 'profile',
        onDelete: 'CASCADE',
      });
      User.hasMany(models.UserRole, {
        foreignKey: 'userId',
        as: 'roles',
        onDelete: 'CASCADE',
      });
    }

    async comparePassword(plainPassword) {
      return bcrypt.compare(plainPassword, this.passwordHash);
    }
  }

  User.init(
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
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password_hash',
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'display_name',
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      underscored: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.passwordHash) {
            const salt = await bcrypt.genSalt(10);
            user.passwordHash = await bcrypt.hash(user.passwordHash, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('passwordHash')) {
            const salt = await bcrypt.genSalt(10);
            user.passwordHash = await bcrypt.hash(user.passwordHash, salt);
          }
        },
      },
    }
  );

  return User;
};
