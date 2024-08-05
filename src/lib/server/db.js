import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ //store this in an env file!
  user: 'postgres',
  host: 'localhost',
  database: 'flcdtest',
  password: 'password',
  port: 5432, // Default PostgreSQL port
});

const table_names = [
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
  'sessions',
  'transaction_log',
  'users',
  'user_types',
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

async function execQuery(client, sqlQuery, args) {
  return new Promise((resolve, reject) => {
    client.query(sqlQuery, args, (error, result) => {
      if (error) { 
        reject({
          success: false, 
          body: {
            result: error,
          }
        });
      }
      resolve({ 
        success: true,
        body:{
          result: result,
        }
      });  
    })
  });
}

async function query(sqlQuery, args) {
  let client;
  try {
    client = await connectToDB();
    const result = await execQuery(client, sqlQuery, args);
    if (result.success) return result;
    else throw result.body.result;
  } catch (error) {
    console.error('Error executing query:', error);
  } finally {
    client.release();
  }
}

export async function getUsersDB() {
  const result = await query("SELECT * FROM users");
  return result;
}

export async function getEquipmentDB() {
  const result = await query("SELECT * FROM equipments");
  // console.log(result.body.result.rows);
  return result.body.result.rows;
}

// export async function getEquipmentTypesDB() {
//   const result = await query("SELECT name, SUM(count) AS total_count FROM equipments GROUP BY name");
//   // console.log(result.body.result.rows);
//   return result.body.result.rows;
// }

export async function getLatestBaseRequestID(user_id) {
  const result = await query('SELECT id FROM base_requests WHERE requester_id = $1 ORDER BY created DESC LIMIT 1;', [user_id]);
  return result.body.result.rows[0].id;;
}

export async function createUserDB(first_name, last_name, email, pw_hash, phone, student_number, course, department, superior_id, access_level) {
  const qText = `INSERT INTO users (first_name, last_name, email, pw_hash, phone, student_number, course, department, superior_id, workgroup) VALUES ('${first_name}', '${last_name}', '${email}', '${pw_hash}', '${phone}', '${student_number}', '${course}', '${department}', ${superior_id}, ${access_level})`;
  // console.log(qText);
  const result = await query(qText);
  return result;
}

export async function insertIntoTableDB(table_name, formData) {
  // sanitize input; error detection
  if (!table_names.includes(table_name)) {
    throw new Error('Trying to insert to non-existent table (possibly misidentified/mispelled/malicious injection)', table_name);
  }

  const attributesText = [...formData.keys()].map((val) => val).join(', '); // not user input hence not vulnerable to SQL Injection
  const values = [...formData.values()].map((val) => val); // will be for parametrization
  const qText = `INSERT INTO ${table_name} (${attributesText}) VALUES (${[...values.map((_, index) => '$' + (index+1))]})`; 
  
  // console.log(qText, values);
  const res = await query(qText, values);
  return res;
}

// Finds the table entry where all values from searchFormData matches with the corresponding attribute values
export async function getFromTableDB(table_name, searchFormData, limit = 100) {
  // sanitize input; error detection
  if (!table_names.includes(table_name)) {
    throw new Error('Trying to get from non-existent table (possibly misidentified/mispelled/malicious injection)', table_name);
  }
  else if (limit < 0 || !Number.isInteger(limit)) {
    throw new Error('Trying to get negative or non-Integer number of rows (possibly mistyped/malicious injection)', limit);
  }
  let qText = ""
  const attributes = [...searchFormData.keys()].map((val) => val); // not user input hence not vulnerable to SQL Injection
  const values = [...searchFormData.values()].map((val) => val); // will be for parametrization

  const whereText = attributes.map((attributeName, index) => `(${attributeName} = \$${index+1})`).join(' AND ')
  if (table_name == 'user_types'){
    qText = `SELECT \* FROM ${table_name} WHERE ${whereText} ORDER BY (access_level) asc LIMIT \$${attributes.length+1}`;
  }
  else{ 
    console.log({table_name})
    qText = `SELECT \* FROM ${table_name} WHERE ${whereText} ORDER BY (id) asc LIMIT \$${attributes.length+1}`;
}
  // console.log(qText, values.concat(limit));
  const res = await query(qText, values.concat(limit));    
  return res;
}

// Provide updateFormData for all values that you want updating
// Provide searchFormData for to specify which row/s you want updating
export async function updateTableDB(table_name, searchFormData, updateFormData) { 
  if (!table_names.includes(table_name)) {
    throw new Error('Trying to update non-existent table (possibly misidentified/mispelled/malicious injection):', table_name);
  }

  const searchAttributes = [...searchFormData.keys()].map((val) => val); // not user input hence not vulnerable to SQL Injection
  const updateAttributes = [...updateFormData.keys()].map((val) => val); // not user input hence not vulnerable to SQL Injection
  const searchValues = [...searchFormData.values()].map((val) => val); // will be for parametrization
  const updateValues = [...updateFormData.values()].map((val) => val); // will be for parametrization

  const setText = updateAttributes.map((attributeName, index) => `${attributeName} = \$${index+1}`).join(', ')
  const whereText = searchAttributes.map((attributeName, index) => `(${attributeName} = \$${updateAttributes.length + index+1})`).join(' AND ')

  const qText = 
    `UPDATE ${table_name}
    SET ${setText}
    WHERE ${whereText}`

  // console.log(qText, updateValues.concat(searchValues));
  const res = await query(qText, updateValues.concat(searchValues));    
  return res;
}
