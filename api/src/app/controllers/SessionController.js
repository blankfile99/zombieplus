'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const authConfig = require('../../config/auth');
const config = authConfig.default || authConfig;

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'zombieplus',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'pwd123',
    connectionTimeoutMillis: 5000,
});

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;
        const result = await pool.query(
            'SELECT id, name, email, password_hash FROM users WHERE email = $1 LIMIT 1',
            [email],
        );
        const user = result.rows[0];

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({
                error: 'Invalid access credentials. Please check your login information.',
            });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.expiresIn,
        });

        return res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    }
}

module.exports = new SessionController();
