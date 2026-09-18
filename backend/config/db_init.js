const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

async function run() {
  const sqlFile = path.resolve(__dirname, 'schema.sql');
  if (!fs.existsSync(sqlFile)) {
    console.error('schema.sql not found in config folder');
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlFile, 'utf8');

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true
  });

  try {
    console.log('Running schema SQL...');
    await connection.query(sql);
    console.log('Database schema applied successfully.');
  } catch (err) {
    console.error('Failed to apply schema:', err.message);
  } finally {
    await connection.end();
  }
}

if (require.main === module) {
  run();
}

module.exports = { run };
