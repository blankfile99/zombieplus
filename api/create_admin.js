const bcrypt = require('bcryptjs');
const { Client } = require('pg');

async function createAdmin() {
    const password = 'admin123';
    const hash = await bcrypt.hash(password, 8);

    const client = new Client({
        host: 'database',
        user: 'postgres',
        password: 'pwd123',
        database: 'zombieplus',
        port: 5432,
    });

    try {
        await client.connect();
        const query = 'INSERT INTO users (id, name, email, password_hash) VALUES (gen_random_uuid(), $1, $2, $3) ON CONFLICT (email) DO NOTHING';
        await client.query(query, ['Admin', 'admin@qax.com', hash]);
        console.log('Admin user created successfully!');
    } catch (err) {
        console.error('Error creating admin:', err);
    } finally {
        await client.end();
    }
}

createAdmin();