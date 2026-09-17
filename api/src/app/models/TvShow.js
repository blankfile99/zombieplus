const Sequelize = require('sequelize');
const crypto = require('crypto');
const connection = require('../../database');
const Company = require('./Company');

const TvShow = connection.define('TvShow', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  overview: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  featured: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  release_year: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  company_id: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: Company,
      key: 'id',
    },
  },
  seasons: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  cover: {
    type: Sequelize.STRING,
    allowNull: true,
  },
}, {
  tableName: 'tvshows',
  hooks: {
    beforeValidate(show) {
      if (!show.id) {
        show.id = crypto.randomUUID();
      }
    },
  },
});

TvShow.belongsTo(Company, {
  foreignKey: 'company_id',
  as: 'company',
});

module.exports = TvShow;
