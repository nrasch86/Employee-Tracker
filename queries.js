const db = require('./db/connection');

class Queries {
  async viewAllDepartments() {
    const [rows] = await db.query('SELECT * FROM departments');
    return rows;
  }

  async viewAllRoles() {
    const [rows] = await db.query(
      'SELECT roles.id, roles.title, departments.name AS department, roles.salary ' +
      'FROM roles ' +
      'JOIN departments ON roles.department_id = departments.id'
    );
    return rows;
  }

  async viewAllEmployees() {
    const [rows] = await db.query(
      'SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, ' +
      'CONCAT(manager.first_name, " ", manager.last_name) AS manager ' +
      'FROM employees ' +
      'LEFT JOIN roles ON employees.role_id = roles.id ' +
      'LEFT JOIN departments ON roles.department_id = departments.id ' +
      'LEFT JOIN employees manager ON manager.id = employees.manager_id'
    );
    return rows;
  }

  async addDepartment(name) {
    const [result] = await db.query('INSERT INTO departments (name) VALUES (?)', [name]);
    return result;
  }

  async addRole(title, salary, department_id) {
    const [result] = await db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
    return result;
  }
  

  async addEmployee(first_name, last_name, role_id, manager_id) {
    const [result] = await db.query(
      'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
      [first_name, last_name, role_id, manager_id]
    );
    return result;
  }

  async updateEmployeeRole(employeeId, roleId) {
    const [result] = await db.query('UPDATE employees SET role_id = ? WHERE id = ?', [roleId, employeeId]);
    return result;
  }
}

module.exports = Queries;
