
USE company_db;

DROP TABLE IF EXISTS employees, roles, departments;

-- Department table
CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- Role table
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Employee table
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
  FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);

-- Department Data
INSERT INTO departments (name) VALUES ('Engineering');
INSERT INTO departments (name) VALUES ('Human Resources'); 
INSERT INTO departments (name) VALUES ('Marketing');
INSERT INTO departments (name) VALUES ('Customer Service');
INSERT INTO departments (name) VALUES ('IT Support');

-- Position Data
INSERT INTO roles (title, salary, department_id) VALUES ('Software Engineer', 90000, 1);  
INSERT INTO roles (title, salary, department_id) VALUES ('HR Manager', 65000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Marketing Coordinator', 50000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Customer Advocate', 40000, 4);
INSERT INTO roles (title, salary, department_id) VALUES ('Help Desk Associate', 45000, 5);

-- Employees Data
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Nikki', 'Smith', 1, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Alex', 'Jones', 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Angela', 'Hood', 3, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Michael', 'Kelly', 4, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Seth', 'Russell', 5, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Ryan', 'Clause', 6, 2);
