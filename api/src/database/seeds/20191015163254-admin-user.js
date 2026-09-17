'use strict';
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [{
            id: crypto.randomUUID(),
            name: 'Admin',
            email: 'admin@qax.com',
            password_hash: bcrypt.hashSync('pwd123', 8)
        }], {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};