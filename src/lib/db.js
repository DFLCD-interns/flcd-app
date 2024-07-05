import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'flcdtest',
  password: 'password',
  port: 5432, // Default PostgreSQL port
});

export async function connectToDB() {
  try {
    const client = await pool.connect();
    return client;
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw error;
  }
}

export async function query(sqlQuery) {
  try {
    const client = await connectToDB();
    const result = await client.query(sqlQuery);
    client.release();
    console.log(result.rows)
    return result.rows;
  } catch (error) {
    console.error('Error executing query:', error.message);
    throw error;
  }
}