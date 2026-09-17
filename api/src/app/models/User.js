const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const connection = require('../../database');

const User = connection.define('User', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.VIRTUAL,
    allowNull: true,
  },
  password_hash: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  hooks: {
    beforeValidate(user) {
      if (!user.id) {
        user.id = crypto.randomUUID();
      }
    },
    beforeSave: async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    },
  },
  instanceMethods: {
    checkPassword(password) {
      return bcrypt.compare(password, this.password_hash);
    },
  },
});

module.exports = User;
