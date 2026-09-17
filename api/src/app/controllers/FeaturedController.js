const { Pool } = require('pg');

const pool = new Pool({
  database: process.env.DB_NAME || 'zombieplus',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'pwd123',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
});

class FeaturedController {
  async index(req, res) {
    const movies = await pool.query(`
      SELECT id, title, overview, release_year, cover
      FROM movies
      WHERE featured = true
      ORDER BY created_at ASC
    `);
    const tvShows = await pool.query(`
      SELECT id, title, overview, release_year, cover
      FROM tvshows
      WHERE featured = true
      ORDER BY created_at ASC
    `);

    const data = [...movies.rows, ...tvShows.rows];
    return res.json({ data, total: data.length });
  }
}

module.exports = new FeaturedController();
