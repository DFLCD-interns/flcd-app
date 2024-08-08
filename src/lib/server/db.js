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

async function query(sqlQuery, args) {
  try {
    const client = await connectToDB();
    const result = await client.query(sqlQuery, args);
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

export async function getUsersDB() {
  const result = await query("SELECT * FROM users");
  return result;
}

export async function createUserDB(uuid, first_name, last_name, email, pw_hash, phone, student_number, course, department, min_approval_layer, access_level) {
  // TODO: check if email is already in used if it is then throw an error
  const res = await query('INSERT INTO users (uuid, first_name, last_name, email, pw_hash, phone, student_number, course, department, min_approval_layer, access_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [uuid, first_name, last_name, email, pw_hash, phone, student_number, course, department, min_approval_layer, access_level]);
  //console.log("res:", res);
  return res;
}

export async function getUserPriv(sessionID) { // returns the admin type of the user associated with this session.
const res = await query('SELECT users.access_level FROM sessions JOIN users ON sessions.user_id = users.id WHERE sessions.session_id = $1', [sessionID]);
return res.body.result.rows[0].access_level;
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
  const res = await query(`SELECT base_requests.id AS br_id, equipment_requests.id AS eqr_id, equipments.name, base_requests.max_approval_layer, base_requests.created
    FROM base_requests
    JOIN equipment_requests ON base_requests.id = equipment_requests.request_id
    JOIN equipments ON equipment_requests.equipment_id = equipments.id
    WHERE base_requests.requester_id = $1`, [user]);
  return res.body.result.rows
}

export async function getEquipmentRequestsDB() {
  const res = await query('SELECT * FROM equipment_requests JOIN equipments ON equipment_requests.equipment_id = equipments.id JOIN base_requests ON equipment_requests.request_id = base_requests.id');
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


// missing fields: class, requests, staff, course, purpose
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
    t.promised_start_time AS dateneeded,
    faculty.first_name AS admin_firstname,
    faculty.last_name AS admin_lastname,
    requester.department AS dept,
    e.name AS material,
    t.location AS room,
    faculty.email AS adminemail,
    t.promised_end_time AS returndate
    FROM base_requests br 
    LEFT JOIN ${table} t ON br.id = t.request_id
	  LEFT JOIN ${type} e ON t.equipment_id = e.id 
    LEFT JOIN users AS faculty ON br.instructor_id = faculty.id
    LEFT JOIN users AS requester ON br.requester_id = requester.id
    WHERE br.id = ${reqid}`);
  // console.log(res);
  return res.body.result.rows;
}


export async function createBaseRequestDB(staff_assistant_id, purpose, max_approval_layer, requester_id) {
  const res = await query('INSERT INTO base_requests (staff_assistant_id, purpose, max_approval_layer, requester_id) VALUES ($1, $2, $3, $4)', [staff_assistant_id, purpose, max_approval_layer, requester_id]);
  return res;
}

export async function createClassRequestDB(class_id, request_id, timeslot, observe_date) {
  const res = await query('INSERT INTO class_requests (timeslot, class_id, request_id, observe_date) VALUES ($1, $2, $3, $4)', [timeslot, class_id, request_id, observe_date])

}

export async function getNewestBaseRequest(){
  const res = await query ('SELECT * FROM base_requests ORDER BY id DESC');
  return res.body.result.rows[0];
}

export async function getLatestBaseRequestID(user_id) {
  const result = await query('SELECT id FROM base_requests WHERE requester_id = $1 ORDER BY created DESC LIMIT 1;', [user_id]);
  return result.body.result.rows[0].id;
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

// Formdata should contain approver_id to search
export async function getApprovalsInfo(searchFormData) { 
  const formsQuery = await getFromTableDB("approvals", searchFormData); 

  const statuses = [];
  formsQuery.body.result.rows.map(async row => {
      statuses.push(row?.status);
  })

  const remarks = [];
  formsQuery.body.result.rows.map(async row => {
    remarks.push(row?.remarks);
  })

  const displayNames = [];
  searchFormData.delete('request_id');
  searchFormData.append('id', 0);
  const searchFormData2 = new FormData();
  searchFormData2.append('access_level', 5);
  for (const row of formsQuery.body.result.rows) {
      searchFormData.set('id', row.approver_id);
      const approverQuery = await getFromTableDB("users", searchFormData);
      if (!approverQuery?.body) throw new Error(`no appover matching the id ${searchFormData.get('id')}`);  
      const access_level = approverQuery?.body.result.rows[0]?.access_level;

      searchFormData2.set('access_level', access_level);
      const access_levelQuery = await getFromTableDB("user_types", searchFormData2);
      const displayName = access_levelQuery.body.result.rows[0]?.description;

      displayNames.push(displayName);
  }
  
  return { 
      statuses: statuses, 
      remarks: remarks,
      displayNames: displayNames
  };
}

// For requests
export function getTotalStatus(names, statuses) {
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

// For dashboard
export async function getRequestsInfo(user_id, user_access_level) {
	
	const equipment_requests = await getEquipmentRequestsDB();
	const venue_requests = await getVenueRequestsDB();
	const child_requests = await getChildRequestsDB();
	const class_requests = await getClassRequestsDB();

	const equipReqsGroupedDict = {};
	equipment_requests.forEach(row => {
		if (Object.keys(equipReqsGroupedDict).includes(row.request_id.toString())) 
			equipReqsGroupedDict[row.request_id].push(row); // add to existing key-value pair
		else equipReqsGroupedDict[row.request_id] = [row]; // new key-value pair
	});

	const allRequests = [];
	Object.values(equipReqsGroupedDict).forEach(function (groupedItem) {
		allRequests.push({
			type: 'Equipment Request',
			table:'equipment_requests',
			id: groupedItem[0]?.request_id,
			requester_id: groupedItem[0]?.requester_id,
			name: groupedItem.map(item => item.name).join(', '),
			date: groupedItem[0]?.promised_start_time,
			max_approval_layer: groupedItem[0]?.max_approval_layer,
			status: null,
      approvalsInfo: null,
		})
	});
	
	venue_requests.forEach(function (item) {
		allRequests.push({
			type: 'Venue Request',
			table:'venue_requests',
			id: item.request_id,
      requester_id: item?.requester_id,
			name: item.name,
			date: item.date_needed_start,
			max_approval_layer: item.max_approval_layer,
			status: null,
      approvalsInfo: null,
		})
	});
	
	child_requests.forEach(function (item) {
		allRequests.push({
			type: 'Child Observation Request',
			table:'child_requests',
			id: item.request_id,
      requester_id: item?.requester_id,
			name: item.name,
			date: item.observation_time,
			max_approval_layer: item.max_approval_layer,
			status: null,
      approvalsInfo: null,
		})
	});
	 
	class_requests.forEach(function (item) {
		allRequests.push({
			type: 'Class Observation Request',
			table:'class_requests',
			id: item.request_id,
      requester_id: item?.requester_id,
			name: item.name,
			date: item.schedule,
			max_approval_layer: item.max_approval_layer,
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
      valid = forms.find((form, i) =>	form.approver_id === user_id && 
                                            //form.status !== 'declined' && // TODO make this transfer forms to requestHistory instead of disappearing here. this disappearance causes sudden errors upon declining btw
                                            (i == 0 ? true : forms[i-1].status === 'approved'));
    else 
      valid = req.requester_id === user_id;
    
    if (valid) {
      req.status = getTotalStatus(approvalsInfo.displayNames, approvalsInfo.statuses);
      req.approvalsInfo = approvalsInfo;
      requestsInfo.push(req);
    }
	}

	return requestsInfo;
}