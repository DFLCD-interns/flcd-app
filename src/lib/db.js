import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ //store this in an env file!
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

async function query(sqlQuery) {
  try {
    const client = await connectToDB();
    const result = await client.query(sqlQuery);
    client.release();
    // console.log(result.rows)
    return result.rows;
  } catch (error) {
    console.error('Error executing query:', error.message);
    throw error;
  }
}

export async function getUsersDB() {
  const result = await query("SELECT * FROM users");
  return result;
}

export async function createUserDB(first_name, last_name, email, pw_hash, phone, student_number, course, department, superior_id, access_level) {
  const qText = `INSERT INTO users (first_name, last_name, email, pw_hash, phone, student_number, course, department, superior_id, workgroup) VALUES ('${first_name}', '${last_name}', '${email}', '${pw_hash}', '${phone}', '${student_number}', '${course}', '${department}', ${superior_id}, ${access_level})`;
  console.log(qText);
  const result = await query(qText);
  return result;
}

export async function getEquipmentDB() {
  const result = await query("SELECT * FROM equipments");
  return result;
}