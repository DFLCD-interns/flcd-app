import pkg from 'pg';
const { Pool } = pkg;
import { format } from 'date-fns';

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
  'venue_requests',
  'unavailable_slots',
  'venue_reservations'
]

const timeFormat = 'Month DD, YYYY at HH12:MI PM';

async function connectToDB() {
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
    const result = await client.query(sqlQuery, args);
    client.release();
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

export async function getUsersDB() {
  const result = await query("SELECT * FROM users");
  return result;
}

export async function createUserDB(uuid, first_name, last_name, email, pw_hash, phone, student_number, course, department, access_level) {
  // TODO: check if email is already in used if it is then throw an error
  const res = await query('INSERT INTO users (uuid, first_name, last_name, email, pw_hash, phone, student_number, course, department, access_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [uuid, first_name, last_name, email, pw_hash, phone, student_number, course, department, access_level]);
  return res;
}

export async function getUserPriv(sessionID) { // returns the admin type of the user associated with this session.
const res = await query('SELECT users.access_level FROM sessions JOIN users ON sessions.user_id = users.id WHERE sessions.session_id = $1', [sessionID]);
return res.body.result.rows[0]?.access_level;
}

export async function authUserDB(email) {
const res = await query('SELECT * FROM users WHERE email = $1', [email]);
// console.log(res, email);
return res.body.result.rows[0];
}

export async function createSessionDB(sessionid, userid){
// console.log("db.js - sessionid, userid", sessionid, userid);
const res = await query('INSERT INTO sessions (session_id, user_id, last_used) VALUES ($1, $2, NOW())', [sessionid, userid]);
return res;
}

export async function getUserFromSessionDB(sessionuuid) {
const res = await query('SELECT * FROM users JOIN sessions ON sessions.user_id = users.id WHERE sessions.session_id = $1', [sessionuuid]);
return res.body.result.rows[0];
}

export async function getUserWithMatchingEmail(email) {
  const res = await query('SELECT * FROM users WHERE email = $1', [email]);
  return res.body.result.rows;
}

export async function getUsersWithAccessLevel(access_level) {
  const res = await query('SELECT * FROM users WHERE access_level = $1', [access_level]);
  return res.body.result.rows;
}

export async function getEquipmentDB() {
  const result = await query("SELECT * FROM equipments");
  return result.body.result.rows;
}

export async function getUsersListDB() {
  const result = await query("SELECT * FROM users");
  return result.body.result.rows;
}

export async function getVenueDB() {
  const result = await query("SELECT * FROM venues");
  return result.body.result.rows;
}

export async function getEquipmentTypesDB() {
  const result = await query("SELECT type, COUNT(*) as count FROM equipments GROUP BY type");
  return result.body.result.rows;
}

export async function getUserBaseRequests(user){
  //console.log(`user ${user}`)
  const res = await query('SELECT * FROM base_requests WHERE base_requests.requester_id = $1', [user]);
  // console.log(`result from db: ${res.body.result.rows.length}`)
  return res.body.result.rows
}

export async function getUserEquipmentRequests(user){
  const res = await query(`SELECT base_requests.id AS br_id, equipment_requests.id AS eqr_id, equipments.name, base_requests.created
    FROM base_requests
    JOIN equipment_requests ON base_requests.id = equipment_requests.request_id
    JOIN equipments ON equipment_requests.equipment_id = equipments.id
    WHERE base_requests.requester_id = $1`, [user]);
  return res.body.result.rows
}

// missing fields: class, requests, staff, course, purpose
// TODO make compatible for class requests!!
// This is for a specific request; supposed to get extra details
export async function getRequestDetailsDB(table, reqid) {
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
    ${table === 'equipment_requests' ? 
      `, t.location AS location, 
         t.actual_start_time AS actual_start_time,
         t.promised_end_time AS promised_end_time`: ''}
    FROM base_requests br 
    LEFT JOIN ${table} t ON br.id = t.request_id
    LEFT JOIN users AS faculty ON br.instructor_id = faculty.id
    LEFT JOIN users AS requester ON br.requester_id = requester.id
    WHERE br.id = ${reqid}`
  const res = await query(qText);
  // console.log(res.body.result.rows)
  return res.body.result.rows;
}


export async function createBaseRequestDB(staff_assistant_id, purpose, requester_id) {
  const res = await query('INSERT INTO base_requests (staff_assistant_id, purpose, requester_id) VALUES ($1, $2, $3)', [staff_assistant_id, purpose, requester_id]);
  return res;
}

export async function createBaseRequestDB2(staff_assistant_id, purpose, requester_id, instructor_id) {
  const res = await query('INSERT INTO base_requests (staff_assistant_id, purpose, requester_id, instructor_id) VALUES ($1, $2, $3, $4)', [staff_assistant_id, purpose, requester_id, instructor_id]);
  return res;
}

export async function createClassRequestDB(class_id, request_id, timeslot, observe_date) {
  // console.log(class_id, request_id, timeslot, observe_date)
  const res = await query('INSERT INTO class_requests (timeslot, class_id, request_id, observe_date) VALUES ($1, $2, $3, $4)', [timeslot, class_id, request_id, observe_date])

}

export async function getNewestBaseRequest(){
  const res = await query ('SELECT * FROM base_requests ORDER BY id DESC');
  return res.body.result.rows[0];
}

export async function getLatestBaseRequestID(user_id) {
  const result = await query('SELECT id FROM base_requests WHERE requester_id = $1 ORDER BY created DESC LIMIT 1;', [user_id]);
  return result.body.result.rows[0]?.id;
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
  values.forEach((val, i) => !val || val == 'undefined' || val == 'null' ? values[i] = 0 : ''); // sanitize

  const whereText = attributes.map((attributeName, index) => `(${attributeName} = \$${index+1})`).join(' AND ')
  if (table_name == 'user_types'){
    qText = `SELECT \* FROM ${table_name} WHERE ${whereText} ORDER BY (access_level) asc LIMIT \$${attributes.length+1}`;
  }
  else{ 
    // console.log("Table name:", {table_name})
    qText = `SELECT \* FROM ${table_name} WHERE ${whereText} ORDER BY (id) asc LIMIT \$${attributes.length+1}`;
}
  // console.log(qText, values.concat(limit));
  const res = await query(qText, values.concat(limit));    
  // console.log(res);
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
  let searchValues = [...searchFormData.values()].map((val) => val === 'null' || val === 'undefined' ? null : val); // will be for parametrization
  const updateValues = [...updateFormData.values()].map((val) => val === 'null' || val === 'undefined' ? null : val); // will be for parametrization

  const setText = updateAttributes.map((attributeName, index) => `${attributeName} = \$${index+1}`).join(', ')
  const whereText = searchAttributes.map((attributeName, index) => `(${attributeName} ${searchValues[index] ? `= \$${updateAttributes.length + index+1}` : 'IS NULL'})`).join(' AND ')
  searchValues = searchValues.filter(val => val != null)

  const qText = 
    `UPDATE ${table_name}
    SET ${setText}
    WHERE ${whereText}`

  // console.log(qText, updateValues.concat(searchValues));
  const res = await query(qText, updateValues.concat(searchValues));    
  return res;
}

// Provide searchFormData for to specify which row/s you want deleting
export async function deleteFromTableDB(table_name, searchFormData) { 
  if (!table_names.includes(table_name)) {
    throw new Error('Trying to update non-existent table (possibly misidentified/mispelled/malicious injection):', table_name);
  }

  const searchAttributes = [...searchFormData.keys()].map((val) => val); // not user input hence not vulnerable to SQL Injection
  let searchValues = [...searchFormData.values()].map((val) => val === 'null' ? null : val); // will be for parametrization

  const whereText = searchAttributes.map((attributeName, index) => `(${attributeName} ${searchValues[index] ? `= \$${index+1}` : 'IS NULL'})`).join(' AND ')
  searchValues = searchValues.filter(val => val != null)

  const qText = 
    `DELETE FROM ${table_name}
    WHERE ${whereText}`

  const res = await query(qText, searchValues);    
  return res;
}

export async function deleteRequest(request_table_name, request_id) {
  const searchFormData = new FormData();
  searchFormData.append('request_id', request_id)
  
  // delete approval forms
  const result = await deleteFromTableDB("approvals", searchFormData);
  
  // delete particular request entries
  const result2 = await deleteFromTableDB(request_table_name, searchFormData);
  
  // delete base request
  searchFormData.delete('request_id')
  searchFormData.append('id', request_id)
  const result3 = await deleteFromTableDB("base_requests", searchFormData);

  return result?.success && result2?.success && result3?.success;
}

// Formdata should contain approver_id to search
export async function getApprovalsInfo(searchFormData) { 
  const formsQuery = await getFromTableDB("approvals", searchFormData); 

  const statuses = [], remarks = [], userIDs = [];
  formsQuery.body.result.rows.map(async row => {
    statuses.push(row?.status);
    remarks.push(row?.remarks);
    userIDs.push(row?.approver_id);
  })

  const displayNames = [];
  searchFormData.delete('request_id');
  const searchFormData2 = new FormData();
  for (const row of formsQuery?.body.result.rows) {
    let access_level = undefined;
    if (row.approver_id) {
      searchFormData.set('id', row.approver_id);
      const approverQuery = await getFromTableDB("users", searchFormData);
      if (!approverQuery?.body) throw new Error(`no appover matching the id ${searchFormData.get('id')}`);  
      access_level = approverQuery?.body.result.rows[0]?.access_level;
    }
    else access_level = 3; // if null, this must be for all the possbile Admin Staffs, which is user level 3

    searchFormData2.set('access_level', access_level);
    const access_levelQuery = await getFromTableDB("user_types", searchFormData2);
    const displayName = access_levelQuery.body.result.rows[0]?.description;

    displayNames.push(displayName);
  }
  
  return { 
    statuses: statuses, 
    remarks: remarks,
    displayNames: displayNames,
    userIDs: userIDs
  };
}

// For requests
function getTotalStatus(names, statuses) {
  if (statuses.includes("declined"))
      return "declined";
  else if (statuses.includes("pending"))
      return "pending with " + names[statuses.findIndex((status) => status === 'pending')];
  else if (statuses.every((elem) => elem === "approved"))
      return "approved";
  else {
      console.error("Total status of form cannot be determined.")
      return "cannot be determined";
  } 
}

async function getEquipmentRequestsDB() {
  const res = await query(`SELECT equipment_requests.id AS req_id, * FROM base_requests JOIN equipment_requests ON equipment_requests.request_id = base_requests.id ORDER BY equipment_requests.id ASC`);
  return res.body.result.rows;
}

async function getVenueRequestsDB() {
  const res = await query(`SELECT venue_requests.id AS req_id, * FROM base_requests JOIN venue_requests ON venue_requests.request_id = base_requests.id JOIN venues ON venue_requests.venue_id = venues.id ORDER BY venue_requests.id ASC`);
  // for those without venue_id:
  const res2 = await query(`SELECT venue_requests.id AS req_id, * FROM base_requests JOIN venue_requests ON venue_requests.request_id = base_requests.id ORDER BY venue_requests.id ASC`);
  const ret = res.body.result.rows?.concat(
    res2.body.result.rows?.filter(
      reqNoAssignedVenue => {
        if (reqNoAssignedVenue.venue_id) return false;
        if (res.body.result.rows?.length === 0) return true;
        return res.body.result.rows.some(reqWithAssignedVenue => reqWithAssignedVenue.request_id === reqNoAssignedVenue.request_id && reqWithAssignedVenue.req_id !== reqNoAssignedVenue.req_id)
      }))
  return ret;
}

async function getChildRequestsDB() {
  const res = await query(`SELECT child_requests.id AS req_id, * FROM base_requests JOIN child_requests ON child_requests.request_id = base_requests.id JOIN childs ON child_requests.child_id = childs.id ORDER BY child_requests.id ASC`);
  return res.body.result.rows;
}

async function getClassRequestsDB() {
  const res = await query(`SELECT class_requests.id AS req_id, * FROM base_requests JOIN class_requests ON class_requests.request_id = base_requests.id JOIN classes ON class_requests.class_id = classes.id ORDER BY class_requests.id ASC`);
  return res.body.result.rows;
}

// For dashboard, only supposed to get brief details
export async function getRequestsInfo(user_id, user_access_level) {
	
  // Get all requests
	const equipment_requests = await getEquipmentRequestsDB();
	const venue_requests = await getVenueRequestsDB();
	// const child_requests = await getChildRequestsDB();
	const class_requests = await getClassRequestsDB();

	const equipReqsGroupedDict = {};
	equipment_requests.forEach(row => {
		if (Object.keys(equipReqsGroupedDict).includes(row.request_id.toString())) 
			equipReqsGroupedDict[row.request_id].push(row); // add to existing key-value pair
		else equipReqsGroupedDict[row.request_id] = [row]; // new key-value pair
	});

	const allRequests = [];
	Object.values(equipReqsGroupedDict).forEach(function (groupedItem) {
    const desiredEquipments = groupedItem.reduce((equipTypeDict, item) => {
      if (Object.keys(equipTypeDict).includes(item?.equipment_type)) 
        equipTypeDict[item?.equipment_type]++; // increment total
      else equipTypeDict[item?.equipment_type] = 1; // else add to dict
      return equipTypeDict;
    }, {}) // key-value pair of each equip as key and the count as value
    const requestName = Object.entries(desiredEquipments).map(entry => entry.join(' (') + ')').join(', ');
    
		allRequests.push ({
			type: 'Equipment Request',
			table:'equipment_requests',
			id: groupedItem[0]?.request_id,
			requester_id: groupedItem[0]?.requester_id,
			name: requestName,
      created: groupedItem[0]?.created,
			date: groupedItem[0]?.promised_start_time,
      actual_date_end: groupedItem[0]?.actual_end_time,
			status: null,
      approvalsInfo: null,
      requestedItems: desiredEquipments, // these are equipment types
      requestRows: equipment_requests,
		})
  });
	
  const venueReqsGroupedDict = {};
	venue_requests.forEach(row => {
		if (Object.keys(venueReqsGroupedDict).includes(row.request_id.toString())) 
			venueReqsGroupedDict[row.request_id].push(row); // add to existing key-value pair
		else venueReqsGroupedDict[row.request_id] = [row]; // new key-value pair
	});

  Object.values(venueReqsGroupedDict).forEach(function (groupedItem) {
    const noAssignedCount = groupedItem.reduce((_noAssignedCount, item) => item.name ? _noAssignedCount : (++_noAssignedCount), 0);
    const requestName = groupedItem.map(item => item.name).join(', ') + noAssignedCount !== 0 ? `(${noAssignedCount} unavailable venues)` : '';

    const start_date = new Date(format(groupedItem[0].date_needed, 'yyyy-MM-dd') + 'T' + groupedItem[0].start_time)
    const end_date = new Date(format(groupedItem[0].date_needed, 'yyyy-MM-dd') + 'T' + groupedItem[0].end_time)
    const desiredVenues = groupedItem.reduce((venueDict, item) => {
      if (!Object.keys(venueDict).includes(item?.venue_id)) 
        venueDict[item?.venue_id] = item?.name; 
      return venueDict;
    }, {}) // key-value pair of each venue name as key and the id as value
		allRequests.push({
			type: 'Venue Request',
			table:'venue_requests',
			id: groupedItem[0].request_id,
      requester_id: groupedItem[0]?.requester_id,
			name: requestName,
      created: groupedItem[0].created,
			date: start_date,
			actual_date_end: end_date,
			status: null,
      approvalsInfo: null,
      requestedItems: desiredVenues, // these are the venues
      requestRows: venue_requests,
		})
	});
	
	// child_requests.forEach(function (item) {
	// 	allRequests.push({
	// 		type: 'Child Observation Request',
	// 		table:'child_requests',
	// 		id: item.request_id,
  //     created: item.created,
  //     requester_id: item?.requester_id,
	// 		name: item.name,
	// 		date: item.observation_time,
	// 		status: null,
  //     approvalsInfo: null,
	// 	})
	// });
  
	class_requests.forEach(function (item) {
		allRequests.push({
			type: 'Class Observation Request',
			table:'class_requests',
			id: item.request_id,
      created: item.created,
      requester_id: item?.requester_id,
			name: item.name,
      created: item.created,
			date: item.observe_date,
			status: null,
      approvalsInfo: null,
		})
	});
	
	const requestsInfo = [];
	for (const req of allRequests) {
		const formData = new FormData(); 
		formData.append('request_id', req.id);
		const approvalFormsQuery = await getFromTableDB('approvals', formData);
		const forms = approvalFormsQuery.body.result.rows;
		
		const approvalsInfo = await getApprovalsInfo(formData);
    
    let valid;
    if (user_access_level < 5) // if admin
      valid = forms.some((form, i) =>	{
        // valid if this user is the approver AND the previous approver has approved
        const validIfApprover = form.approver_id === user_id && (i == 0 ? true : forms[i-1].status === 'approved');
        // also valid if the approver is null AND the access level of this user is ADMIN STAFF (level 3) 
        const validIfAdminStaff = (!form.approver_id) && user_access_level === 3;
        return validIfApprover || validIfAdminStaff; 
      });
    else valid = req.requester_id === user_id;
    
    if (valid) {
      req.status = getTotalStatus(approvalsInfo.displayNames, approvalsInfo.statuses);
      req.approvalsInfo = approvalsInfo;
      requestsInfo.push(req);
    }
	}

	return requestsInfo;
}

export async function getAllClassesDB() {
  const res = await query(`SELECT 
    batches.name AS batch_name,
    batches.description AS batch_description,
    batches.created AS batch_created,
    classes."name" AS class_name,
    users.first_name AS handler_firstname,
    users.last_name AS handler_lastname,
    classes.description AS class_description,
    classes."schedule",
    classes.created AS classes_created,
    childs.name AS child_name,
    childs.birthdate AS child_birthdate,
    childs.tracking_id AS child_trackingid,
    childs.created AS child_created
    FROM batches JOIN classes ON batches.id = classes.batch_id 
    JOIN childs ON classes.id = childs.class_id 
    JOIN users ON classes.handler_id = users.id`);
  // console.log(res);
  return res.body.result.rows;
}

export async function getBatchesDB() {
  const res = await query(`SELECT * FROM batches`);
  // console.log(res);
  return res.body.result.rows;
}

export async function getClassesDB() {
  const res = await query(`SELECT * FROM classes`);
  // console.log(res);
  return res.body.result.rows;
}

export async function getSections(sched){
  const result = await query('SELECT * FROM classes WHERE schedule = $1', [sched]);
  return result.body.result.rows;
}

export async function getUnavailable(){
  const result = await query(`SELECT class_id, timeslot, TO_CHAR(observe_date, 'YYYY-MM-DD') AS observe_date FROM unavailable_slots`)
  return result.body.result.rows;
}

export async function getUnavailableWSection(){
  const result = await query(`SELECT unavailable_slots.id, class_id, timeslot, TO_CHAR(observe_date, 'YYYY-MM-DD') AS observe_date,
    classes.name AS name, classes.schedule AS schedule
    FROM unavailable_slots
    JOIN classes ON unavailable_slots.class_id = classes.id
    ORDER BY observe_date, schedule, timeslot, name`)
  return result.body.result.rows;
}

export async function addUnavailableSlot(class_id, observe_date, timeslot){
  const res = await query('INSERT INTO unavailable_slots (timeslot, observe_date, class_id) VALUES ($1, $2, $3)', [timeslot, observe_date, class_id])
}

export async function deleteUnavailableSlot(id){
  const res = await query('DELETE FROM unavailable_slots WHERE id = $1', [id])
}