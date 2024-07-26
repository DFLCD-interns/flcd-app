import { json } from '@sveltejs/kit'
import pkg from 'pg';
const { Pool } = pkg;

// TODO: `$(variable)` substitutions must NOT be done on queries! (vulnerble to sql injects)

const pool = new Pool({ //store this in an env file!
  user: 'postgres',
  host: 'localhost',
  database: 'flcdtest',
  password: 'password',
  port: 5432, // Default PostgreSQL port
});

const table_names = [
  'admin_types',
  'approvals',
  'base_requests',
  'batches',
  'childs',
  'child_requests',
  'classes',
  'class_requests',
  'equipments',
  'equipment_requests',
  'preferred_times_child',
  'preferred_times_class',
  'users',
  'venues',
  'venue_requests'
]

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

export async function getEquipmentDB() {
  const result = await query("SELECT * FROM equipments");
  return result;
}

export async function createUserDB(first_name, last_name, email, pw_hash, phone, student_number, course, department, superior_id, access_level) {
  const qText = `INSERT INTO users (first_name, last_name, email, pw_hash, phone, student_number, course, department, superior_id, workgroup) VALUES ('${first_name}', '${last_name}', '${email}', '${pw_hash}', '${phone}', '${student_number}', '${course}', '${department}', ${superior_id}, ${access_level})`;
  console.log(qText);
  const result = await query(qText);
  return result;
}

export async function insertIntoTableDB(table_name, formData) {
  if (!table_names.includes(table_name)) {
    throw new Error('Trying to insert to non-existent table (possibly misidentified/mispelled)', table_name);
  }

  const attributesText = [...formData.keys()].map((val) => val).join(", ");
  const valuesText = [...formData.values()].map((val) => Number.isInteger(val) ? val : "\'" + val + "\'").join(", ");
  const qText = `INSERT INTO ${table_name} (${attributesText}) VALUES (${valuesText})`;
  console.log(qText);

  let status = 200;
  try {
    await query(qText);    
  }
  catch (err) {
    status = 400;
  }
  return json({}, {status: status}); // returns a response with OK:true
}

// Finds the table entry where all values from searchFormData matches with the corresponding attribute values
export async function getFromTableDB(table_name, searchFormData, limit = 100) {
  if (!table_names.includes(table_name)) {
    throw new Error('Trying to insert to non-existent table (possibly misidentified/mispelled):', table_name);
  }

  const whereText = [...searchFormData.entries()].map((pair) => {
    pair[1] = '\'' + pair[1] + '\'';
    return '(' + pair.join(' = ') + ')'
  }).join(' AND ')
  const qText = `SELECT \* FROM ${table_name} WHERE (${whereText}) ORDER BY (id) asc LIMIT ${limit} `;
  console.log(qText);

  let status = 200;
  let result;
  try {
    result = await query(qText);    
  }
  catch (err) {
    status = 400;
  }
  return json({result: result}, {status: status});
}

// Provide updateFormData for all values that you want updating
// Provide searchFormData for to specify which row/s you want updating
export async function updateTableDB(table_name, searchFormData, updateFormData) { 
  if (!table_names.includes(table_name)) {
    throw new Error('Trying to insert to non-existent table (possibly misidentified/mispelled):', table_name);
  }

  const setText = [...updateFormData.entries()].map((pair) => {
    pair[1] = '\'' + pair[1] + '\'';
    return pair.join(' = ')
  }).join(', ')
  const whereText = [...searchFormData.entries()].map((pair) => {
    pair[1] = '\'' + pair[1] + '\'';
    return '(' + pair.join(' = ') + ')'
  }).join(' AND ')

  const qText = 
    `UPDATE ${table_name}
    SET ${setText}
    WHERE ${whereText}`

  console.log(qText);

  let status = 200;
  try {
    await query(qText);    
  }
  catch (err) {
    status = 400;
  }
  return json({}, {status: status});

}
