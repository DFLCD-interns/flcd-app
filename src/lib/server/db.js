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

export async function getUserByIDDB(id) {
  const result = await query(`SELECT * FROM users WHERE id = ${id};`);
  return result;
}

export async function createUserDB(first_name, last_name, email, pw_hash, phone, student_number, course, department, superior_id, access_level) {
  const qText = `INSERT INTO users (first_name, last_name, email, pw_hash, phone, student_number, course, department, superior_id, workgroup) VALUES ('${first_name}', '${last_name}', '${email}', '${pw_hash}', '${phone}', '${student_number}', '${course}', '${department}', ${superior_id}, ${access_level})`;
  console.log(qText);
  console.log("If you see this in Developer Tools, something is very wrong.");
  const result = await query(qText);
  return result;
}

export async function authUserDB(email, password) {
  console.log(`Called authUserDB with ${email} and ${password}`);
  const qText = `SELECT * FROM users WHERE email = '${email}';`;
  console.log(qText);
  const result = await query(qText);

  if (result.length > 0) { // We find a matching user
    const user = result[0];
    if (user.pw_hash === password) { // Username and password match
      return {success: true, user: user, message: "Auth succesful."};
    } else {
      return {success: false, user: user, message: "Auth failed. Wrong password."};
    }
  } else { // no user with matching email was found
    return {success: false, message: "User not found."}
  }
}

export async function createSessionDB(SessionID, userId) {
  const qText = `INSERT INTO sessions (session_id, user_id) VALUES ('${SessionID}', ${userId})`;
  console.log(`db.js - createSessionDB: ${qText}`);
  const result = await query(qText);
  return result;
}