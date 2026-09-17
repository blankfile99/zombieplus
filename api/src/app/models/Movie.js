const Sequelize = require('sequelize');
const crypto = require('crypto');
const connection = require('../../database');
const Company = require('./Company');

const Movie = connection.define('Movie', {
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
  cover: {
    type: Sequelize.STRING,
    allowNull: true,
  },
}, {
  tableName: 'movies',
  hooks: {
    beforeValidate(movie) {
      if (!movie.id) {
        movie.id = crypto.randomUUID();
      }
    },
  },
});

Movie.belongsTo(Company, {
  foreignKey: 'company_id',
  as: 'company',
});

module.exports = Movie;
