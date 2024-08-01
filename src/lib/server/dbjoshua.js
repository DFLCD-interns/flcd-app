import pkg from 'pg';
const { Pool } = pkg;
import { json } from '@sveltejs/kit';

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

async function query(sqlQuery, args) {
  try {
    const client = await connectToDB();
    const result = await client.query(sqlQuery, args
    //   , (err, res) => {
    //     // console.log("db.js - query - Callback was invoked.", sqlQuery);
    //     // console.log("err: ", err);
    //     // console.log("res:", res);
    //     // client.end();

    //     if (err) {
    //         // we can either send a success message ehre but client wont be released so im gonna send it in result and hope that catch will indeed catch any error that occurs.
    //     }
    //     // console.log("res?",res);
    //     return res;
    // }
  );
    client.release();
    // console.log("db.js result", result);
    return { success: true,
      body:{
        result: result,
      }
     };
  } catch (error) {
    console.error('Error executing query:', error.message);
    throw error;
    // return {success: false, error: error}
  }
}

// pool.query('SELECT * FROM table where username=$1 and password=$2', [username, password], (error, results) => {});

export async function createUserDB(uuid, first_name, last_name, email, pw_hash, phone, student_number, course, department, superior_id, workgroup) {
    // TODO: check if email is already in used if it is then throw an error
    console.log('hi')
    const res = await query('INSERT INTO users (uuid, first_name, last_name, email, pw_hash, phone, student_number, course, department, superior_id, workgroup) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [uuid, first_name, last_name, email, pw_hash, phone, student_number, course, department, superior_id, workgroup]);
    console.log("res:", res);
    return res;
}

export async function getUserPriv(sessionID) { // returns the admin type of the user associated with this session.
  const res = await query('SELECT users.workgroup FROM sessions JOIN users ON sessions.user_id = users.id WHERE sessions.uuid == $1', [sessionID]);
  return res;
}

export async function authUserDB(email) {
  const res = await query('SELECT * FROM users WHERE email = $1', [email]);
  // console.log(res);
  return res.body.result.rows[0];
}

export async function createSessionDB(sessionid, userid){
  // console.log("db.js - sessionid, userid", sessionid, userid);
  const res = await query('INSERT INTO sessions (session_id, user_id, last_used) VALUES ($1, $2, NOW())', [sessionid, userid]);
  return res;
}

export async function getUserFromSessionDB(sessionuuid) {
  const res = await query('SELECT * FROM users JOIN sessions ON sessions.user_id = users.id WHERE sessions.session_id = $1', [sessionuuid]);
  // console.log(res);
  return res.body.result.rows[0];
}

export async function getUsersWithMatchingEmail(email) {
  const res = await query('SELECT * FROM users WHERE email = $1', [email]);
  // console.log(res);
  return res.body.result.rows;
}

export async function getEquipmentRequestsDB() {
  const res = await query('SELECT * FROM equipment_requests JOIN equipments ON equipment_requests.equipment_id = equipments.id JOIN base_requests ON equipment_requests.request_id = base_requests.id');
  // console.log(res);
  return res.body.result.rows;
}

export async function getVenueRequestsDB() {
  const res = await query('SELECT * FROM venue_requests JOIN venues ON venue_requests.venue_id = venues.id JOIN base_requests ON venue_requests.request_id = base_requests.id');
  // console.log(res);
  return res.body.result.rows;
}

export async function getChildRequestsDB() {
  const res = await query('SELECT * FROM child_requests JOIN childs ON child_requests.child_id = childs.id JOIN base_requests ON child_requests.request_id = base_requests.id');
  // console.log(res);
  return res.body.result.rows;
}

export async function getClassRequestsDB() {
  const res = await query('SELECT * FROM class_requests JOIN classes ON class_requests.class_id = classes.id JOIN base_requests ON class_requests.request_id = base_requests.id');
  // console.log(res);
  return res.body.result.rows;
}


// missing fields: class, requests, staff
export async function getRequestDetailsDB(table, reqid) {
  var type = ""
  if (table = "equipment_requests"){
    type = "equipments";
  }
  const res = await query(`SELECT 
    br.id AS reqid,
    requester.first_name AS requester_firstname,
    requester.last_name AS requester_lastname,
    requester.email,
    requester.student_number AS studentno,
    requester.phone AS contactno,
    t.date_needed_start AS dateneeded,
    faculty.first_name AS admin_firstname,
    faculty.last_name AS admin_lastname,
    requester.department AS dept,
    e.name AS material,
    t.count AS number,
    t.venue AS room,
    faculty.email AS adminemail,
    t.date_needed_end AS returndate
    FROM base_requests br 
    LEFT JOIN ${table} t ON br.id = t.request_id
	  LEFT JOIN ${type} e ON t.equipment_id = e.id 
    LEFT JOIN users AS faculty ON br.faculty_id = faculty.id
    LEFT JOIN users AS requester ON br.requester_id = requester.id
    WHERE br.id = ${reqid}`);
  // console.log(res);
  return res.body.result.rows;
}