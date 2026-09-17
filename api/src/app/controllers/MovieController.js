'use strict';

const crypto = require('crypto');
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'zombieplus',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'pwd123',
    connectionTimeoutMillis: 5000,
});

class MovieController {
    async index(req, res) {
        const title = req.query.title || '';
        const result = await pool.query(
            `SELECT m.id, m.title, m.overview, m.featured, m.release_year, m.company_id, m.cover,
                    json_build_object('id', c.id, 'name', c.name) AS company
                 FROM movies m
                 JOIN companies c ON c.id = m.company_id
                 WHERE m.title ILIKE $1
                 ORDER BY m.created_at ASC`,
            [`%${title}%`],
        );

        return res.json({ data: result.rows, total: result.rowCount });
    }

    async store(req, res) {
        const { title, overview, featured, release_year: releaseYear, company_id: companyId } = req.body;
        const company = await pool.query('SELECT id FROM companies WHERE id = $1', [companyId]);

        if (!company.rowCount) {
            return res.status(400).json({ error: 'Company not found.' });
        }

        const id = crypto.randomUUID();
        const cover = req.file ? req.file.filename : null;
        const result = await pool.query(
            `INSERT INTO movies
                (id, title, overview, featured, release_year, company_id, cover, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
             RETURNING id, title, overview, featured, release_year, company_id, cover`,
            [id, title, overview, featured, releaseYear, companyId, cover],
        );

        const created = await pool.query(
            `SELECT m.id, m.title, m.overview, m.featured, m.release_year, m.company_id, m.cover,
                    json_build_object('id', c.id, 'name', c.name) AS company
             FROM movies m
             JOIN companies c ON c.id = m.company_id
             WHERE m.id = $1`,
            [result.rows[0].id],
        );

        return res.status(201).json(created.rows[0]);
    }

    async show(req, res) {
        const result = await pool.query(
            `SELECT m.id, m.title, m.overview, m.featured, m.release_year, m.company_id, m.cover,
                    json_build_object('id', c.id, 'name', c.name) AS company
                 FROM movies m
                 JOIN companies c ON c.id = m.company_id
                 WHERE m.id = $1`,
            [req.params.id],
        );

        if (!result.rowCount) {
            return res.status(404).json({ error: 'Movie not found.' });
        }

        return res.json(result.rows[0]);
    }

    async delete(req, res) {
        const result = await pool.query('DELETE FROM movies WHERE id = $1 RETURNING id', [req.params.id]);

        if (!result.rowCount) {
            return res.status(404).json({ error: 'Movie not found.' });
        }

        return res.status(204).end();
    }
}

module.exports = new MovieController();
