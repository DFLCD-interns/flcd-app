DROP TABLE IF EXISTS "admin_types" CASCADE;
DROP TABLE IF EXISTS "user_types" CASCADE;
DROP TABLE IF EXISTS "classes" CASCADE;
DROP TABLE IF EXISTS "venues" CASCADE;
DROP TABLE IF EXISTS "equipments" CASCADE;
DROP TABLE IF EXISTS "childs" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "batches" CASCADE;
DROP TABLE IF EXISTS "base_requests" CASCADE;
DROP TABLE IF EXISTS "child_requests" CASCADE;
DROP TABLE IF EXISTS "class_requests" CASCADE;
DROP TABLE IF EXISTS "venue_requests" CASCADE;
DROP TABLE IF EXISTS "venue_reservations" CASCADE;
DROP TABLE IF EXISTS "equipment_requests" CASCADE;
DROP TABLE IF EXISTS "preferred_times_class" CASCADE;
DROP TABLE IF EXISTS "preferred_times_child" CASCADE;
DROP TABLE IF EXISTS "approvals" CASCADE;
DROP TABLE IF EXISTS "sessions" CASCADE;
DROP TABLE IF EXISTS "transaction_log" CASCADE;
DROP TABLE IF EXISTS "unavailable_slots" CASCADE;

CREATE TABLE user_types (
    description VARCHAR(128),
    access_level INT PRIMARY KEY
);

-- MOSTLY REQUIRED; DO NOT MOVE ROWS 0 to 5
INSERT INTO user_types (description, access_level)
VALUES 
('Database Admin', 0),
('Chair', 1),
('Faculty-in-Charge', 2),
('Admin Staff', 3),
('Course Instructor', 4),
('FLCD Student', 5),
('UP Student', 6),
('Guest', 7);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(128),
    first_name VARCHAR(128),
    last_name VARCHAR(128),
    email VARCHAR(128),
    pw_hash VARCHAR(512),
    phone VARCHAR(32),
    student_number VARCHAR(12),
    course VARCHAR(128),
    department VARCHAR(128),
    access_level INT, 
    FOREIGN KEY (access_level) REFERENCES user_types(access_level),
    created TIMESTAMP DEFAULT NOW() NOT NULL
);

-- ONLY DATABASE ADMIN IS REQUIRED HERE
INSERT INTO users (uuid, first_name, last_name, email, pw_hash, phone, student_number, course, department, access_level) 
VALUES 
('ec9e1401-f6d8-49b0-9778-f0818f92dee2', 'Database', 'Admin', 'upflcd.apps@gmail.com', 'a9c7aadd6f0fc434450abd93dc4e95ec1f5afa8794282694669f1ea3f918d02708bacdda018aec5ee3c5099d07dfcf6ea917a6f5ba30af8e89a6d4ee6c56e70bee28ae4128830a20f597adb97df3f47c1f11ffc4f09eda03cae115e279e11b5fdb34f9ff682faf34b9e5cff231df2668f4866da74a920d75a34ee3c71c709db0', '09173170302', NULL, NULL, 'DFLCD', 0),
('dce56866-baaf-4d19-88e0-04d3ab47f4d2', 'Erickson', 'Maclid', 'chair@up.edu.ph', '9fd31033a841e829b462f293bd4e15f27bf836568ba14fa1c2bb339bf6cb9873e0cb0f7a2026790e54ec983d7fc19a655c527c86465ed80d2baa05d5d0dd40fc3d22a3302ca962f35062b4cb4e7766c4e413e99dc177cb1f3d3cd2c7f30bcdb8e7063c8fbfa201a82bb92a2d86f9448f469c6eac9bb17c6f2484497ecb2ec810', '09173170302', NULL, NULL, 'DFLCD', 1),
('66a71f7a-4181-46f0-888f-8aa003e9cc20', 'Jennifer Roxanne', 'Daez', 'fic@up.edu.ph', '1e8948ba09589778f6f04a83ef5ccaa509ad8615cf0743f89493a5a38f750b327072439423bcda9ae2988a8a110561b1eddea39c6e56b7b16b64c0486cc57b4a9a7b969bc460d6ca9cb8100fca3fd1ea825d792add9381842acb8845631f3f4fa9e5f42b405f0c6f736305bf3c32573e2ccd7fde580fa8f7e9323032cfe66272', '09173170302', NULL, NULL, 'DFLCD', 2),
('4d71eb55-24a7-4167-b38c-188ed79fdbdd', 'Staff A', 'Santiago', 'staff@up.edu.ph', 'b585b65bb578e01bf03b5357ec24fae11ff793eb8cd23514f678d09c867f7d5b7fb1fda017aac627950124a3d6a0ce3f38d54eed45db3bfb03e7bf4cf6598bb4747ffca8643caee4f5de8000dccf665cac82361fd46e8b4507c039c39d2ecc52f782ee9b35f2dd73857760c34da8de5a9266d15aca68be6d3bad6ad04baefc43', '09173170302', NULL, NULL, 'DFLCD', 3),
('b6cb1a30-a3cf-4768-9e2a-3dcd525467ce', 'Staff B', 'Salazar', 'staff2@up.edu.ph', '1d9f513a0fca85424ddcc72bcc63a9113347749b0e7088e74da407f02428b8a7d00b71e5974c0070c1dcf5ab78a4c3fde3bbb2473688172b199e23a340f008f83e11e4ef9933252cf1f0b6709cc7adbeb7e49e56400be497160d6aa5e78bf5f837b347f52cd89ac4111354edfd7a184ef26c788564a118811c9cb997c5a1dbbd', '09173170302', NULL, NULL, 'DFLCD', 3),
('b2c7845e-1ea3-425c-8422-312064fbf12f', 'Instructor A', 'Ibarra', 'instructor@up.edu.ph', '7ef93fc897253c67a08b07ed13166e708bda8009bc5ccc2ee5b61e1441cf8fcbf5c4a904273ad3c0a059dd7cdfa662584d60340649d0202fcdfcb2d669ee39eb57eb5eb4782602ef00ade0a374a28a97deb2d8407450cb852c327e7cefd56ceea47bfe3bf7d2535e91fc85d2002dde471f77c8bde1dd0f9f14a139bb96438da2', '09173170302', NULL, NULL, 'DFLCD', 4),
('02b06b43-d1f7-4eaf-9f4d-d9dc717663c4', 'Instructor B', 'Ibarra', 'instructor2@up.edu.ph', 'aa85cf49ebed07c482ba4e34c7d312ca4a6916859d91f17bc4bb5a126e50dcc6b1a2c9ab050ba7b3b5cfde4bc76452b6ae979c48caf56ffb300629dc8d98029e90fea69ca119319abe6f9b8883a9e8d456b269aeff016fbcc43ff676142d48e73d2d7700a2f64863df3513b832a6e9a6a0ad051589c9da44bf992cfd635d200b', '09173170302', NULL, NULL, 'DFLCD', 4),
('9124846e-dc77-4079-8fda-e345dfe8662c', 'Carlos', 'Yulo', 'flcdstudent@up.edu.ph', '91f2797fb7a26d0cf3ed699374a8a28d17a35e55a1f2882826788a5e96d962b867b05587a2e59cf8e3e153ce2d8b49394d01b81529b9e157ea32c212e6a6462ba837e4518465fd6426f327ad1472cf21b39257e7ca8b87f56e42c1380c0e46e08c0df75308dab44d7e2d840643cd2cb0349f24b4f61688755461b50185a78b4e', '09173170302', '202008925', 'BS FLCD', 'DFLCD', 5),
('2df0500b-e82c-47d7-8bf1-962789b6c4a7', 'Karl', 'Yulo', 'flcdstudent2@up.edu.ph', 'b16ab3c288139306aa909809aa18bcc7c48ee6ceb7aa076202293700a57c02ca6826bab928b6d7488bac577ef75cedad4fa9e2f94ed8c3c22746ea0fd989a51e37b03ebcae5bfdd0c493787d1c3a653a3ec57f2ef4f51c06b466071e39c8fa607e48d9280b543b8a6913e50b4d9e826ada233fe072a6136eb4a187879364f083', '09173170302', '202008925', 'BS FLCD', 'DFLCD', 5),
('fb54a56f-5a21-4b95-aa2d-3efedc9d5552', 'Iza', 'Yulo', 'upstudent@up.edu.ph', 'eb4478264ab4ba06d6d3c8d08c16a7663311a3973f1239e45b122a780fb98d8c9b254b5c1cba1e22820575e448df40e9cd045ab9af401a2276d715ee3eb8be58dc5a1a7861bc7b945b4f5b6c568242932721e07c7893fca70881725093b132a65f26d5f0a99078f773ee5134e0c1306ebc05d44b2a33a17714d4c1b7cfb8d55e', '09173170302', '202108117', 'BS Computer Science', 'other', 6);

CREATE TABLE batches (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128),
    description VARCHAR(128),
    created TIMESTAMP DEFAULT NOW() NOT NULL
);

-- OPTIONAL
INSERT INTO batches (name, description)
VALUES ('2023-2024 1st', '1st semester, starting July');

CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128),
    handler_id INT,
    FOREIGN KEY (handler_id) REFERENCES users(id),
    batch_id INT,
    FOREIGN KEY (batch_id) REFERENCES batches(id),
    description VARCHAR(512),
    schedule VARCHAR(128), -- must be a string, separable by , (COMMA), with format START:TIME-END:TIME
    created TIMESTAMP DEFAULT NOW() NOT NULL
);

-- OPTIONAL
INSERT INTO classes (name, description, schedule, handler_id, batch_id)
VALUES ('Section A', 'Section A', 'AM', 5, 1);

CREATE TABLE venues (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128),
    description VARCHAR(512),
    date_registered TIMESTAMP DEFAULT NOW() NOT NULL
);

-- OPTIONAL
INSERT INTO venues (name) VALUES ('Room 302'), ('Room 303'), ('Room 304'); 

CREATE TABLE childs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128),
    birthdate DATE,
    tracking_id VARCHAR(128),
    class_id INT,
    FOREIGN KEY (class_id) REFERENCES classes(id),
    created TIMESTAMP DEFAULT NOW() NOT NULL
);

-- OPTIONAL
INSERT INTO childs (name, birthdate, tracking_id, class_id)
VALUES ('Anya Forger', '2019-03-03', 1, 1);

CREATE TABLE base_requests (
    id SERIAL PRIMARY KEY,
    requester_id INT,
    FOREIGN KEY (requester_id) REFERENCES users(id),
    instructor_id INT, -- for FLCD students
    FOREIGN KEY (instructor_id) REFERENCES users(id),
    staff_assistant_id INT,
    FOREIGN KEY (staff_assistant_id) REFERENCES users(id),
    purpose VARCHAR(1024), -- reason for borrowing
    affiliation VARCHAR(128), -- for Non-FLCD students & guests
    created TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE equipments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128), -- ideally includes model/brand; seen only by admins
    type VARCHAR(128), -- type/category of equipment, displayed to requesters
    location VARCHAR(128), -- current location of equipment
    status VARCHAR(10), -- in use, in repair, available
    notes VARCHAR(512),
    date_registered TIMESTAMP DEFAULT NOW() NOT NULL
);

-- PLACEHOLDER
INSERT INTO equipments (name, type, location, status, notes)
VALUES 
('Laminating Machine 1', 'Laminating Machine', 'Room XXX', 'available', ''),
('Laminating Machine 2', 'Laminating Machine', 'Room XXX', 'available', ''),
('Epson LX100 Printer', 'Printer', 'Room XXX', 'available', ''),
('Paper Cutter Big', 'Paper Cutter', 'Room XXX', 'available', ''),
('Paper Cutter Small', 'Paper Cutter', 'Room XXX', 'available', ''),
('Extension Cord 1', 'Extension Cord', 'Room XXX', 'available', ''),
('Extension Cord 2', 'Extension Cord', 'Room XXX', 'available', ''),
('UPCDC Movable TV', 'Movable TV', 'Room XXX', 'available', ''),
('DFLCD Movable TV', 'Movable TV', 'Room XXX', 'available', ''),
('Portable Speaker Bldg 1', 'Portable Speaker', 'Room XXX', 'available', ''),
('Portable Speaker Bldg 2', 'Portable Speaker', 'Room XXX', 'available', ''),
('Sony Camera', 'Digital Camera', 'Room XXX', 'available', ''),
('RODE Lapel', 'Lapel Microphone', 'Room XXX', 'available', '');


CREATE TABLE class_requests (
    id SERIAL PRIMARY KEY,
    timeslot VARCHAR(128), -- timeslot of the class selected in this format: 13:00-14:00
    observe_date DATE,
    class_id INT,
    FOREIGN KEY (class_id) REFERENCES classes(id),
    request_id INT, -- the base request id so this can be associated with a base request
    FOREIGN KEY (request_id) REFERENCES base_requests(id),
    assigned_child_id INT,
    FOREIGN KEY (assigned_child_id) REFERENCES childs(id) -- assigned child for observation
);

CREATE TABLE venue_requests (
    id SERIAL PRIMARY KEY,
    date_needed DATE,
    start_time TIME,
    end_time TIME,
    venue_id INT,
    FOREIGN KEY (venue_id) REFERENCES venues(id),
    request_id INT,
    FOREIGN KEY (request_id) REFERENCES base_requests(id)
);

CREATE TABLE venue_reservations (
    id SERIAL PRIMARY KEY,
    venue_id INT,
    FOREIGN KEY (venue_id) REFERENCES venues(id),
    date DATE,
    timeslot VARCHAR(128), -- timeslot selected in this format: 13:00-14:00
    request_id INT, -- NULL if slot was blocked off by admin
    FOREIGN KEY (request_id) REFERENCES venue_requests(id),
    admin_id INT, -- NULL if reservation came from student request
    FOREIGN KEY (admin_id) REFERENCES users(id)
);

CREATE TABLE equipment_requests ( -- one entry for each equipment in a request
    id SERIAL PRIMARY KEY,
    promised_start_time TIMESTAMP, 
    promised_end_time TIMESTAMP, -- when the equipment should be returned
    actual_start_time TIMESTAMP,
    actual_end_time TIMESTAMP, -- when the request was completed (objects were returned verified and closed by lender)
    location VARCHAR(128), -- place where the equipment will be used
    equipment_type VARCHAR(128), -- equipment type
    equipment_id INT, -- specific equipment to be assigned by approvers
    FOREIGN KEY (equipment_id) REFERENCES equipments(id),
    request_id INT, -- same for all entries in the same request
    FOREIGN KEY (request_id) REFERENCES base_requests(id)
);


CREATE TABLE approvals (
    id SERIAL PRIMARY KEY,
    status VARCHAR(32),
    remarks VARCHAR(512),
    approver_id INT,
    FOREIGN KEY (approver_id) REFERENCES users(id),
    request_id INT,
    FOREIGN KEY (request_id) REFERENCES base_requests(id),
    created TIMESTAMP DEFAULT NOW()
);

CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    created TIMESTAMP DEFAULT NOW(),
    last_used TIMESTAMP,
    session_id VARCHAR(128) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE transaction_log (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    log_time TIMESTAMP DEFAULT NOW(),
    transaction_description VARCHAR(1024)
);

CREATE TABLE unavailable_slots (
    id SERIAL PRIMARY KEY,
    timeslot VARCHAR(128), -- timeslot of the class selected in this format: 13:00-14:00
    observe_date DATE,
    class_id INT,
    FOREIGN KEY (class_id) REFERENCES classes(id)
);