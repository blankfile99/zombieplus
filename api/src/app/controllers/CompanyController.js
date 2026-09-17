'use strict';

const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'zombieplus',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'pwd123',
    connectionTimeoutMillis: 5000,
});

class CompanyController {
    async index(req, res) {
        const name = req.query.name || '';
        const result = await pool.query(
            'SELECT id, name FROM companies WHERE name ILIKE $1 ORDER BY id',
            [`%${name}%`],
        );

        return res.json({
            data: result.rows,
            total: result.rowCount,
        });
    }
}

module.exports = new CompanyController();
