const Sequelize = require('sequelize');
const connection = require('../../database');

const Company = connection.define('Company', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  tableName: 'companies',
});

module.exports = Company;
