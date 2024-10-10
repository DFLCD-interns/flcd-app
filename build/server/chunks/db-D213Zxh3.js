import pkg from 'pg';

const { Pool } = pkg;
const pool = new Pool({
  //store this in an env file!
  user: "postgres",
  host: "localhost",
  database: "flcdtest",
  password: "password",
  port: 5432
  // Default PostgreSQL port
});
const table_names = [
  "approvals",
  "base_requests",
  "batches",
  "childs",
  "classes",
  "class_requests",
  "equipments",
  "equipment_requests",
  "sessions",
  "transaction_log",
  "users",
  "user_types",
  "venues",
  "venue_requests",
  "unavailable_slots",
  "venue_reservations"
];
async function connectToDB() {
  try {
    const client = await pool.connect();
    return client;
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    throw error;
  }
}
async function query(sqlQuery, args) {
  try {
    const client = await connectToDB();
    const result = await client.query(sqlQuery, args);
    client.release();
    return {
      success: true,
      body: {
        result
      }
    };
  } catch (error) {
    console.error("Error executing query:", error.message);
    throw error;
  }
}
async function getUsersDB() {
  const result = await query("SELECT * FROM users");
  return result.body.result.rows;
}
async function createUserDB(uuid, first_name, last_name, email, pw_hash, phone, student_number, course, department, access_level) {
  const res = await query("INSERT INTO users (uuid, first_name, last_name, email, pw_hash, phone, student_number, course, department, access_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [uuid, first_name, last_name, email, pw_hash, phone, student_number, course, department, access_level]);
  return res;
}
async function getUserPriv(sessionID) {
  const res = await query("SELECT users.access_level FROM sessions JOIN users ON sessions.user_id = users.id WHERE sessions.session_id = $1", [sessionID]);
  return res.body.result.rows[0]?.access_level;
}
async function authUserDB(email) {
  const res = await query("SELECT * FROM users WHERE email = $1", [email]);
  return res.body.result.rows;
}
async function createSessionDB(sessionid, userid) {
  const res = await query("INSERT INTO sessions (session_id, user_id, last_used) VALUES ($1, $2, NOW())", [sessionid, userid]);
  return res;
}
async function getUserFromSessionDB(sessionuuid) {
  const res = await query("SELECT * FROM users JOIN sessions ON sessions.user_id = users.id WHERE sessions.session_id = $1", [sessionuuid]);
  return res.body.result.rows[0];
}
async function getUserWithMatchingEmail(email) {
  const res = await query("SELECT * FROM users WHERE email = $1", [email]);
  return res.body.result.rows;
}
async function getUserWithMatchingSN(sn) {
  const res = await query("SELECT * FROM users WHERE student_number = $1", [sn]);
  return res.body.result.rows;
}
async function getUsersWithAccessLevel(access_level) {
  const res = await query("SELECT * FROM users WHERE access_level = $1", [access_level]);
  return res.body.result.rows;
}
async function getEquipmentDB() {
  const result = await query("SELECT * FROM equipments");
  return result.body.result.rows;
}
async function getEquipmentsStatusesDB() {
  const result = await query(`
    SELECT 
      equipments.id AS equip_id,
      equipment_requests.id AS subreq_id,
      equipment_requests.request_id AS req_id,
      equipment_requests.promised_start_time AS promised_start_time,
      equipment_requests.promised_end_time AS promised_end_time
    FROM equipments 
    JOIN equipment_requests ON equipments.id = equipment_requests.equipment_id
    GROUP BY promised_start_time, equip_id, subreq_id`);
  return result.body.result.rows;
}
async function getVenuesStatusesDB() {
  const result = await query(`
    SELECT 
      venues.id AS venue_id,
      venue_requests.id AS subreq_id,
      venue_requests.request_id AS req_id,
      venue_requests.date_needed AS date,
      venue_requests.start_time AS start,
      venue_requests.end_time AS end
    FROM venues 
    JOIN venue_requests ON venues.id = venue_requests.venue_id
    GROUP BY date, start, venue_requests.end_time, venues.id, subreq_id`);
  return result.body.result.rows;
}
async function getChildsStatusesDB() {
  const result = await query(`
    SELECT 
      childs.id AS child_id,
      class_requests.id AS subreq_id,
      class_requests.request_id AS req_id,
      class_requests.observe_date AS date,
      class_requests.timeslot AS timeslot
    FROM childs 
    JOIN class_requests ON childs.id = class_requests.assigned_child_id
    GROUP BY date, timeslot, childs.id, subreq_id`);
  return result.body.result.rows;
}
async function getUsersListDB() {
  const result = await query(`SELECT 
    id,
    first_name,
    last_name,
    email,
    phone,
    student_number,
    course,
    department,
    users.access_level,
    user_types.description,
    created
    FROM users JOIN user_types on users.access_level = user_types.access_level`);
  return result.body.result.rows;
}
async function getUserTypesDB() {
  const result = await query("SELECT * FROM user_types");
  return result.body.result.rows;
}
async function getVenueDB() {
  const result = await query("SELECT * FROM venues");
  return result.body.result.rows;
}
async function getEquipmentTypesDB() {
  const result = await query("SELECT type, COUNT(*) as count FROM equipments GROUP BY type");
  return result.body.result.rows;
}
async function getUserBaseRequests(user) {
  const res = await query("SELECT * FROM base_requests WHERE base_requests.requester_id = $1", [user]);
  return res.body.result.rows;
}
async function getRequestDetailsDB(table, reqid) {
  const qText = `SELECT 
    requester.first_name AS requester_firstname,
    requester.last_name AS requester_lastname,
    requester.email,
    requester.student_number AS studentno,
    requester.phone AS contactno,
    requester.department AS dept,
    faculty.first_name AS admin_firstname,
    faculty.last_name AS admin_lastname,
    faculty.email AS adminemail
    ${table === "equipment_requests" ? `, t.location AS location, 
         t.actual_start_time AS actual_start_time,
         t.promised_end_time AS promised_end_time,
         e.name as equipment_name,
         e.location as equipment_location` : ""}
    ${table === "class_requests" ? `, t.timeslot AS timeslot,
         c.name as child_name` : ""} 
    FROM base_requests br 
    LEFT JOIN ${table} t ON br.id = t.request_id
    LEFT JOIN users AS faculty ON br.instructor_id = faculty.id
    LEFT JOIN users AS requester ON br.requester_id = requester.id
    ${table === "class_requests" ? "LEFT JOIN childs c ON t.assigned_child_id = c.id" : ""}
    ${table === "equipment_requests" ? "LEFT JOIN equipments e ON t.equipment_id = e.id" : ""}
    WHERE br.id = ${reqid}`;
  const res = await query(qText);
  return res.body.result.rows;
}
async function createBaseRequestDB2(purpose, requester_id, instructor_id) {
  const res = await query("INSERT INTO base_requests (purpose, requester_id, instructor_id) VALUES ($1, $2, $3)", [purpose, requester_id, instructor_id]);
  return res;
}
async function createClassRequestDB(class_id, request_id, timeslot, observe_date) {
  await query("INSERT INTO class_requests (timeslot, class_id, request_id, observe_date) VALUES ($1, $2, $3, $4)", [timeslot, class_id, request_id, observe_date]);
}
async function getLatestBaseRequestID(user_id) {
  const result = await query("SELECT id FROM base_requests WHERE requester_id = $1 ORDER BY created DESC LIMIT 1;", [user_id]);
  return result.body.result.rows[0]?.id;
}
async function insertIntoTableDB(table_name, formData) {
  if (!table_names.includes(table_name)) {
    throw new Error("Trying to insert to non-existent table (possibly misidentified/mispelled/malicious injection)", table_name);
  }
  const attributesText = [...formData.keys()].map((val) => val).join(", ");
  const values = [...formData.values()].map((val) => val);
  const qText = `INSERT INTO ${table_name} (${attributesText}) VALUES (${[...values.map((_, index) => "$" + (index + 1))]})`;
  const res = await query(qText, values);
  return res;
}
async function getFromTableDB(table_name, searchFormData, limit = 100) {
  if (!table_names.includes(table_name)) {
    throw new Error("Trying to get from non-existent table (possibly misidentified/mispelled/malicious injection)", table_name);
  } else if (limit < 0 || !Number.isInteger(limit)) {
    throw new Error("Trying to get negative or non-Integer number of rows (possibly mistyped/malicious injection)", limit);
  }
  const isFormData = Object.getPrototypeOf(searchFormData).append != void 0;
  let qText = "";
  const attributes = (isFormData ? [...searchFormData.keys()] : Object.keys(searchFormData)).map((val) => val);
  const values = (isFormData ? [...searchFormData.values()] : Object.values(searchFormData)).map((val) => val);
  values.forEach((val, i) => !val || val == "undefined" || val == "null" ? values[i] = 0 : "");
  const whereText = attributes.map((attributeName, index) => `(${attributeName} = $${index + 1})`).join(" AND ") || "";
  if (table_name == "user_types") {
    qText = `SELECT * FROM ${table_name} WHERE (1 = 1) ${whereText ? "AND " + whereText : ""} ORDER BY (access_level) asc LIMIT $${attributes.length + 1}`;
  } else {
    qText = `SELECT * FROM ${table_name} WHERE (1 = 1) ${whereText ? "AND " + whereText : ""} ORDER BY (id) asc LIMIT $${attributes.length + 1}`;
  }
  const res = await query(qText, values.concat(limit));
  return res;
}
async function updateTableDB(table_name, searchFormData, updateFormData) {
  if (!table_names.includes(table_name)) {
    throw new Error("Trying to update non-existent table (possibly misidentified/mispelled/malicious injection):", table_name);
  }
  const searchAttributes = [...searchFormData.keys()].map((val) => val);
  const updateAttributes = [...updateFormData.keys()].map((val) => val);
  let searchValues = [...searchFormData.values()].map((val) => val === "null" || val === "undefined" ? null : val);
  const updateValues = [...updateFormData.values()].map((val) => val === "null" || val === "undefined" ? null : val);
  const setText = updateAttributes.map((attributeName, index) => `${attributeName} = $${index + 1}`).join(", ");
  const whereText = searchAttributes.map((attributeName, index) => `(${attributeName} ${searchValues[index] ? `= $${updateAttributes.length + index + 1}` : "IS NULL"})`).join(" AND ");
  searchValues = searchValues.filter((val) => val != null);
  const qText = `UPDATE ${table_name}
    SET ${setText}
    WHERE ${whereText}`;
  const res = await query(qText, updateValues.concat(searchValues));
  return res;
}
async function deleteFromTableDB(table_name, searchFormData) {
  if (!table_names.includes(table_name)) {
    throw new Error("Trying to update non-existent table (possibly misidentified/mispelled/malicious injection):", table_name);
  }
  const searchAttributes = [...searchFormData.keys()].map((val) => val);
  let searchValues = [...searchFormData.values()].map((val) => val === "null" ? null : val);
  const whereText = searchAttributes.map((attributeName, index) => `(${attributeName} ${searchValues[index] ? `= $${index + 1}` : "IS NULL"})`).join(" AND ");
  searchValues = searchValues.filter((val) => val != null);
  const qText = `DELETE FROM ${table_name}
    WHERE ${whereText}`;
  const res = await query(qText, searchValues);
  return res;
}
async function deleteRequest(request_table_name, request_id) {
  const searchFormData = new FormData();
  searchFormData.append("request_id", request_id);
  const result = await deleteFromTableDB("approvals", searchFormData);
  const result2 = await deleteFromTableDB(request_table_name, searchFormData);
  searchFormData.delete("request_id");
  searchFormData.append("id", request_id);
  const result3 = await deleteFromTableDB("base_requests", searchFormData);
  return result?.success && result2?.success && result3?.success;
}
async function getEquipmentRequestsDB() {
  const res = await query(`SELECT equipment_requests.id AS req_id, * FROM base_requests JOIN equipment_requests ON equipment_requests.request_id = base_requests.id ORDER BY equipment_requests.id ASC`);
  return res.body.result.rows;
}
async function getVenueRequestsDB() {
  const res = await query(`SELECT venue_requests.id AS req_id, * FROM base_requests JOIN venue_requests ON venue_requests.request_id = base_requests.id JOIN venues ON venue_requests.venue_id = venues.id ORDER BY venue_requests.id ASC`);
  const res2 = await query(`SELECT venue_requests.id AS req_id, * FROM base_requests JOIN venue_requests ON venue_requests.request_id = base_requests.id ORDER BY venue_requests.id ASC`);
  const ret = res.body.result.rows?.concat(
    res2.body.result.rows?.filter(
      (reqNoAssignedVenue) => {
        if (reqNoAssignedVenue.venue_id) return false;
        if (res.body.result.rows?.length === 0) return true;
        return res.body.result.rows.some((reqWithAssignedVenue) => reqWithAssignedVenue.request_id === reqNoAssignedVenue.request_id && reqWithAssignedVenue.req_id !== reqNoAssignedVenue.req_id);
      }
    )
  );
  return ret;
}
async function getClassRequestsDB() {
  const res = await query(`SELECT class_requests.id AS req_id, * FROM base_requests JOIN class_requests ON class_requests.request_id = base_requests.id JOIN classes ON class_requests.class_id = classes.id ORDER BY class_requests.id ASC`);
  return res.body.result.rows;
}
async function getAllClassesDB() {
  const res = await query(`SELECT
    batches.id AS batch_id,
    batches.name AS batch_name,
    classes.id AS class_id,
    classes.name AS class_name,
    users.first_name AS handler_firstname,
    users.last_name AS handler_lastname,
    classes.schedule,
    childs.name AS child_name,
    childs.birthdate AS child_birthdate,
    childs.tracking_id AS child_trackingid,
    childs.created AS child_created
    FROM batches JOIN classes ON batches.id = classes.batch_id 
    JOIN childs ON classes.id = childs.class_id 
    JOIN users ON classes.handler_id = users.id`);
  return res.body.result.rows;
}
async function getBatchesDB() {
  const res = await query(`SELECT * FROM batches`);
  return res.body.result.rows;
}
async function getClassesDB() {
  const res = await query(`SELECT * FROM classes`);
  return res.body.result.rows;
}
async function getBatchesAndClassesDB() {
  const res = await query(`SELECT 
    classes.id AS class_id,
    classes.name AS class_name,
    classes.batch_id,
    batches.name AS batch,
    classes.handler_id AS handler_id,
    users.first_name as handler_firstname,
    users.last_name as handler_lastname,
    classes.description,
    classes.schedule,
    classes.created
    FROM classes 
    JOIN batches 
    ON classes.batch_id = batches.id
    JOIN users
    ON classes.handler_id = users.id
    ORDER BY classes.id ASC`);
  return res.body.result.rows;
}
async function getSections(sched) {
  const result = await query("SELECT * FROM classes WHERE schedule = $1", [sched]);
  return result.body.result.rows;
}
async function getUnavailable() {
  const result = await query(`SELECT class_id, timeslot, TO_CHAR(observe_date, 'YYYY-MM-DD') AS observe_date FROM unavailable_slots`);
  return result.body.result.rows;
}
async function getUnavailableWSection() {
  const result = await query(`SELECT unavailable_slots.id, class_id, timeslot, TO_CHAR(observe_date, 'YYYY-MM-DD') AS observe_date,
    classes.name AS name, classes.schedule AS schedule
    FROM unavailable_slots
    JOIN classes ON unavailable_slots.class_id = classes.id
    ORDER BY observe_date, schedule, timeslot, name`);
  return result.body.result.rows;
}
async function addUnavailableSlot(class_id, observe_date, timeslot) {
  await query("INSERT INTO unavailable_slots (timeslot, observe_date, class_id) VALUES ($1, $2, $3)", [timeslot, observe_date, class_id]);
}
async function deleteUnavailableSlot(id) {
  await query("DELETE FROM unavailable_slots WHERE id = $1", [id]);
}

export { getUnavailableWSection as A, getUsersListDB as B, getUserTypesDB as C, getUserWithMatchingEmail as D, createBaseRequestDB2 as E, getLatestBaseRequestID as F, createClassRequestDB as G, getUsersWithAccessLevel as H, getRequestDetailsDB as I, getUserWithMatchingSN as J, createUserDB as K, authUserDB as L, createSessionDB as M, getUserPriv as a, getFromTableDB as b, getEquipmentDB as c, getEquipmentTypesDB as d, getEquipmentsStatusesDB as e, getVenueDB as f, getUserFromSessionDB as g, getVenuesStatusesDB as h, getChildsStatusesDB as i, getEquipmentRequestsDB as j, getVenueRequestsDB as k, getClassRequestsDB as l, getUserBaseRequests as m, deleteRequest as n, insertIntoTableDB as o, getAllClassesDB as p, getBatchesDB as q, getClassesDB as r, getBatchesAndClassesDB as s, getUsersDB as t, deleteFromTableDB as u, updateTableDB as v, addUnavailableSlot as w, deleteUnavailableSlot as x, getSections as y, getUnavailable as z };
//# sourceMappingURL=db-D213Zxh3.js.map
