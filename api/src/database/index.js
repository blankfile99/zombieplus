const Sequelize = require('sequelize');

const connection = new Sequelize(process.env.DB_NAME || 'zombieplus', process.env.DB_USER || 'postgres', process.env.DB_PASS || 'pwd123', {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  dialect: process.env.DB_DIALECT || 'postgres',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
});

module.exports = connection;
