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
DROP TABLE IF EXISTS "equipment_requests" CASCADE;
DROP TABLE IF EXISTS "preferred_times_class" CASCADE;
DROP TABLE IF EXISTS "preferred_times_child" CASCADE;
DROP TABLE IF EXISTS "approvals" CASCADE;
DROP TABLE IF EXISTS "sessions" CASCADE;
DROP TABLE IF EXISTS "transaction_log" CASCADE;

CREATE TABLE user_types (
    description VARCHAR(128),
    access_level INT PRIMARY KEY
);

INSERT INTO user_types (description, access_level)
VALUES 
('Database Admin', 0),
('Chair', 1),
('Faculty-in-Charge', 2),
('Faculty', 3),
('FLCD Instructor', 4),
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
    min_approval_layer INT,
    FOREIGN KEY (min_approval_layer) REFERENCES users(id),
    access_level INT, 
    FOREIGN KEY (access_level) REFERENCES user_types(access_level),
    created TIMESTAMP DEFAULT NOW() NOT NULL
);

INSERT INTO users (uuid, first_name, last_name, email, pw_hash, phone, student_number, course, department, min_approval_layer, access_level) 
VALUES 
('ec9e1401-f6d8-49b0-9778-f0818f92dee2', 'Database', 'Admin', 'admin@up.edu.ph', '9ff8cf4d917ad5f8d606b5b03c5123f28c04aecc9edd4126a7403d5c4aec0b45b263e0dcf223bf49bb3a14c13aaeefa746190c798fa4e72ca42884e7fc2af62e7735f5a1105cf8af6ec8f08d67b428deacb0cc8c314cc45f0caaf8bfeb34b89539ccb9673af4f5f20e24504223fbb210c1f1ffd00fafbc01e03659d6201daf84', '09173170302', NULL, NULL, 'DFLCD', 2, 0),
('dce56866-baaf-4d19-88e0-04d3ab47f4d2', 'Erickson', 'Maclid', 'chair@up.edu.ph', '31e9479f4cd9a8ca95278acdcc8888a9f758628b1840d9c7cdc02753db4c6d5a093994604bb3df83e8fb8e30b404521de74a278db4c64b3068a0496742e390ab99434dc445064f54380a08c21afa8d8eca4c68b58397bbbcf4707b885d2cb78b6a73d2419c5d6ce649a3c2318d34e2dea797a0515d55b72cc0e9ea2f8cf8e624', '09173170302', NULL, NULL, 'DFLCD', 2, 1),
('66a71f7a-4181-46f0-888f-8aa003e9cc20', 'Jennifer Roxanne', 'Daez', 'fic@up.edu.ph', '4d16cbf4586069e61936a894cc9c51eaf0e59d0c8838b2ebe814df7ce8d4e4aad97dd2ce5b4b0d188c0f7c5290b94cf7329798e0ae958aff8601f943442312feeb5bf16054fd7b366c66d2cbdf37c148cdb1e753f8e59606520a481e32b5e1c995e688bfd4de77f164aa66918b4506077e5bce3c0829baefbe43d50617f1aed7', '09173170302', NULL, NULL, 'DFLCD', 2, 2),
('68d32dce-25d2-4f5a-8d36-c8c73731d9c0', 'Staff', 'Santiez', 'staff@up.edu.ph', 'd09c75e512d81e8c1472514e10cff4a8899b67b0d749420bce6470f3895b24377ad4dec3878c393f3432e2e0a843f899289434f7a34def06ab17330c746ae6814f93da9f282df159ff27f3b042262bca2747ac9378b4e406fa6e378d58ecd7a99829ba6eee8e911fba765cc7702cbfb47d0cce7d12754d7d20b0527cbeae8c3c', '09173170302', NULL, NULL, 'DFLCD', 2, 3),
('b2c7845e-1ea3-425c-8422-312064fbf12f', 'Instructor', 'Ibarra', 'instructor@up.edu.ph', '94f1b9ddde6e019092fa9e22e3cf1312fe5f848a4afc383dba517bba9c4676efd76401643ab5d34e0934be4067424a222fe88565220a47c6575ff33adcf0d7833a179acb65c9b5a8707d23d68e2382433b01685db32dc4010060e29f210bea1854a7cb90ed601c3dae5bec11c3b81151efa049911cd89f433293c3771e5a1efb', '09173170302', NULL, NULL, 'DFLCD', 2, 4);
('9124846e-dc77-4079-8fda-e345dfe8662c', 'Carlos', 'Yulo', 'flcdstudent@up.edu.ph', '06a379811c7d4ef38325e3810643a71af45c4a98f0da000b92cb7c1c351393180c00f340f58f6ad95d9e61b3cd8b9ae4762518388e16f25981a0ec38d8f179f136f02c913faeee025bb47afcb14e388b5adfef9099c205c6f779feffcaa00abc1f6669c997edc3c0b412fa5ed7e2fe0b3dfd44cc070378a7fe3047e366f75835', '09173170302', '202008925', 'BS FLCD', 'DFLCD', 1, 5);
('fb54a56f-5a21-4b95-aa2d-3efedc9d5552', 'Karl', 'Yulo', 'upstudent@up.edu.ph', '1a181fe2f8af9d4ff4adb808100d92f701b0f0932a62d316e758765c931a5167775e08b564d9c22a5fe6bee80b06c3b5014589f92764365c2a0bac0d15692c86c39eee42f31fa3bbbd58b217a30690821716deba9f2cef757dddd966b11047f3fbc5167bcee333a973492f89f37b9db0d5ad9b8cb57a12bd5341da1ffd0849ad', '09173170302', '202108117', 'BS Computer Science', 'other', 2, 6);
('ca5f0d67-e4d9-44d2-bfcb-8a57fce845e2', 'Angelica', 'Yulo', 'guest@up.edu.ph', 'fc62b9d26f88becc93bf5e5f0b0323685d45e3044eea457aba6bd3f2c59531eef53eb62ec7caed83e23906c635e5980ab864f97d12a464c4b96e035d7bdb19e26c0874a1cef1fd99a134805321708f8c784982022a8fe25bc6ac04a66f70e35ada92292099cf069b96b6d02d70a5073f570f834b122b49899106aa3cf5f44351', '09173170302', NULL, NULL, 'other', 2, 7);

CREATE TABLE batches (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128),
    description VARCHAR(128),
    created TIMESTAMP DEFAULT NOW() NOT NULL
);

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

INSERT INTO classes (name, description, handler_id, batch_id)
VALUES ('Section A', 'Section A', 2, 1);

CREATE TABLE venues (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128),
    description VARCHAR(512),
    created TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE childs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128),
    birthdate TIMESTAMP,
    tracking_id VARCHAR(128),
    class_id INT,
    FOREIGN KEY (class_id) REFERENCES classes(id),
    created TIMESTAMP DEFAULT NOW() NOT NULL
);

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
    max_approval_layer INT,
    FOREIGN KEY (max_approval_layer) REFERENCES user_types(access_level),
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

INSERT INTO equipments (name, type, location, status)
VALUES 
('Laminating Machine 1', 'Laminating Machine', 'Room XXX', 'available'),
('Laminating Machine 2', 'Laminating Machine', 'Room XXX', 'available'),
('Epson LX100 Printer', 'Printer', 'Room XXX', 'available'),
('Paper Cutter Big', 'Paper Cutter', 'Room XXX', 'available'),
('Paper Cutter Small', 'Paper Cutter', 'Room XXX', 'available'),
('Extension Cord 1', 'Extension Cord', 'Room XXX', 'available'),
('Extension Cord 2', 'Extension Cord', 'Room XXX', 'available'),
('UPCDC Movable TV', 'Movable TV', 'Room XXX', 'available'),
('DFLCD Movable TV', 'Movable TV', 'Room XXX', 'available'),
('Portable Speaker Bldg 1', 'Portable Speaker', 'Room XXX', 'available'),
('Portable Speaker Bldg 2', 'Portable Speaker', 'Room XXX', 'available'),
('Sony Camera', 'Digital Camera', 'Room XXX', 'available'),
('RODE Lapel', 'Lapel Microphone', 'Room XXX', 'available'),
(NULL, 'For Printing Only', NULL, 'available');

CREATE TABLE child_requests (
    id SERIAL PRIMARY KEY,
    observation_time VARCHAR(128),
    child_id INT,
    FOREIGN KEY (child_id) REFERENCES childs(id),
    request_id INT,
    FOREIGN KEY (request_id) REFERENCES base_requests(id)
);

CREATE TABLE class_requests (
    id SERIAL PRIMARY KEY,
    timeslot VARCHAR(128), -- timeslot of the class selected in this format: 13:00-14:00
    observe_date DATE,
    class_id INT,
    FOREIGN KEY (class_id) REFERENCES classes(id),
    request_id INT, -- the base request id so this can be associated with a base request
    FOREIGN KEY (request_id) REFERENCES base_requests(id)
);

CREATE TABLE venue_requests (
    id SERIAL PRIMARY KEY,
    date_needed_start TIMESTAMP, -- date needed start
    date_needed_end TIMESTAMP, -- date needed end/expected return date
    venue_id INT,
    FOREIGN KEY (venue_id) REFERENCES venues(id),
    request_id INT,
    FOREIGN KEY (request_id) REFERENCES base_requests(id)
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

CREATE TABLE preferred_times_child (
    id SERIAL PRIMARY KEY,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    request_id INT,
    FOREIGN KEY (request_id) REFERENCES child_requests(id)
);

CREATE TABLE preferred_times_class (
    id SERIAL PRIMARY KEY,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    request_id INT,
    FOREIGN KEY (request_id) REFERENCES class_requests(id)
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
