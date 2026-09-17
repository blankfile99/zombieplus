const Sequelize = require('sequelize');
const crypto = require('crypto');
const connection = require('../../database');

const Lead = connection.define('Lead', {
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
  },
}, {
  tableName: 'leads',
  hooks: {
    beforeValidate(lead) {
      if (!lead.id) {
        lead.id = crypto.randomUUID();
      }
    },
  },
});

module.exports = Lead;
