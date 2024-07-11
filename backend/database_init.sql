DROP TABLE IF EXISTS "admin_types" CASCADE;
DROP TABLE IF EXISTS "classes" CASCADE;
DROP TABLE IF EXISTS "venues" CASCADE;
DROP TABLE IF EXISTS "equipments" CASCADE;
DROP TABLE IF EXISTS "childs" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "base_requests" CASCADE;
DROP TABLE IF EXISTS "child_requests" CASCADE;
DROP TABLE IF EXISTS "class_requests" CASCADE;
DROP TABLE IF EXISTS "venue_requests" CASCADE;
DROP TABLE IF EXISTS "equipment_requests" CASCADE;
DROP TABLE IF EXISTS "preferred_times_class" CASCADE;
DROP TABLE IF EXISTS "preferred_times_child" CASCADE;
DROP TABLE IF EXISTS "approvals" CASCADE;


CREATE TABLE admin_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128), 
    description VARCHAR(512)  
);

INSERT INTO admin_types (name, description)
VALUES ('admin 0', 'DA'),
('admin 1', 'chair'),
('admin 2', 'FIC'),
('admin 3', 'staff'),
('admin 4', 'student'),
('admin 5', 'guests');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(128),
    last_name VARCHAR(128),
    email VARCHAR(128),
    pw_hash VARCHAR(512),
    phone VARCHAR(32),
    student_number VARCHAR(9),
    course VARCHAR(128),
    department VARCHAR(128),
    superior_id INT,
    FOREIGN KEY (superior_id) REFERENCES users(id)
    access_level INT,
    FOREIGN KEY (access_level) REFERENCES admin_types(id)
);

INSERT INTO users (first_name, last_name, email, pw_hash, phone, student_number, course, department, superior_id, access_level)
VALUES ('Joshua', 'Tester', 'testerjoshua@gmail.com', '5E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D8', '+631234567890', NULL, 'BS Computer Science', NULL, 0),
('Joshua2', 'Tester2', 'testerjoshua2@gmail.com', '5E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D8', '+631234567890', '201900002', 'BS Computer Science', NULL, 1);

CREATE TABLE batch (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128),
    description VARCHAR(128),
);

CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128),
    handler_id INT,
    FOREIGN KEY (handler_id) REFERENCES users(id)
    description VARCHAR(512),
);

INSERT INTO classes (name, description)
VALUES ('Section A', 'Section A')

CREATE TABLE venues (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128),
    description VARCHAR(512),
);

CREATE TABLE equipments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128),
    description VARCHAR(512),
    count INT,
);


CREATE TABLE childs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128),
    birthdate TIME,
    tracking_id VARCHAR(128),
    class_id INT,
    FOREIGN KEY (class_id) REFERENCES classes(id)
);



INSERT INTO users (first_name, last_name, email, pw_hash, phone, student_number, course, class_assigned, access_level) 
VALUES ('Joshua', 'Tester', 'jt@testmail.com', '5E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D8', '+639451234567', '202300001', 'BS Computer Science', 'CLASS A', 1);

CREATE TABLE base_requests (
    id SERIAL PRIMARY KEY,
    request_time TIME NOT NULL,
    completion_time TIME NOT NULL,
    faculty_id INT,
    FOREIGN KEY (faculty_id) REFERENCES users(id)
    office VARCHAR(128),
    company VARCHAR(128),
    admin_approve_layer INT,
    FOREIGN KEY (admin_approve_layer) REFERENCES admin_types(id)
    requester_id INT,
    FOREIGN KEY (requester_id) REFERENCES users(id) 
);

CREATE TABLE child_requests (
    id SERIAL PRIMARY KEY,
    preferred_age_group_low INT,
    preferred_age_group_high INT,
    child_id INT,
    FOREIGN KEY (child_id) REFERENCES childs(id)
    request_id INT,
    FOREIGN KEY (request_id) REFERENCES base_requests(id)
);

CREATE TABLE class_requests (
    id SERIAL PRIMARY KEY,
    class_id INT,
    FOREIGN KEY (class_id) REFERENCES classes(id)
    request_id INT,
    FOREIGN KEY (request_id) REFERENCES base_requests(id)
);

CREATE TABLE venue_requests (
    id SERIAL PRIMARY KEY,
    start_time TIME,
    end_time TIME,
    promised_return_time TIME,
    return_time TIME,
    venue_id INT,
    FOREIGN KEY (venue_id) REFERENCES venues(id)
    request_id INT,
    FOREIGN KEY (request_id) REFERENCES base_requests(id)
);

CREATE TABLE equipment_requests (
    id SERIAL PRIMARY KEY,
    count INT,
    start_time TIME,
    end_time TIME,
    promised_return_time TIME,
    return_time TIME,
    equipment_id INT,
    FOREIGN KEY (equipment_id) REFERENCES equipments(id)
    request_id INT,
    FOREIGN KEY (request_id) REFERENCES base_requests(id)
);

CREATE TABLE preferred_times_child (
    id SERIAL PRIMARY KEY,
    start_time TIME,
    end_time TIME,
    request_id INT,
    FOREIGN KEY (request_id) REFERENCES child_requests(id)
);

CREATE TABLE preferred_times_class (
    id SERIAL PRIMARY KEY,
    start_time TIME,
    end_time TIME,
    request_id INT,
    FOREIGN KEY (request_id) REFERENCES class_requests(id)
);

CREATE TABLE approvals (
    id SERIAL PRIMARY KEY,
    status VARCHAR(32),
    remarks VARCHAR(512),
    approver_id INT,
    FOREIGN KEY (approver_id) REFERENCES users(id),
    staff_assistant_id INT,
    FOREIGN KEY (staff_assistant_id) REFERENCES users(id),
    request_id INT,
    FOREIGN KEY (request_id) REFERENCES base_requests(id)
);
