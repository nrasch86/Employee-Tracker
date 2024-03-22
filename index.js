// Global handler for unhandled promise rejections
process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});

const inquirer = require('inquirer');
const Queries = require('./queries');

const queries = new Queries();

async function startApp() {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    },
  ]);

  switch (answer.action) {
    case 'View all departments':
      await viewAllDepartments();
      break;
    case 'View all roles':
      await viewAllRoles();
      break;
    case 'View all employees':
      await viewAllEmployees();
      break;
    case 'Add a department':
      await addDepartment();
      break;
    case 'Add a role':
      await addRole();
      break;
    case 'Add an employee':
      await addEmployee();
      break;
    case 'Update an employee role':
      await updateEmployeeRole();
      break;
    case 'Exit':
      console.log('Exiting the application. Goodbye!');
      return;
  }

  setImmediate(startApp);
}

async function viewAllDepartments() {
  const departments = await queries.viewAllDepartments();
  console.table(departments);
}

async function viewAllRoles() {
  const roles = await queries.viewAllRoles();
  console.table(roles);
}

async function viewAllEmployees() {
  const employees = await queries.viewAllEmployees();
  console.table(employees);
}

async function addDepartment() {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the department:',
    },
  ]);

  await queries.addDepartment(answer.departmentName);
  console.log('Department added successfully!');
}

async function addRole() {
  const departments = await queries.viewAllDepartments();
  const departmentChoices = departments.map(({ id, name }) => ({
    name,
    value: id
  }));

  const roleData = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:',
      validate: input => {
        // Make sure salary is a number
        return !isNaN(parseFloat(input)) || "Please enter a valid number for the salary.";
      },
      filter: input => {
        // Convert the input to a digit
        return parseFloat(input);
      }
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Select the department for the role:',
      choices: departmentChoices
    }
  ]);

  await queries.addRole(roleData.title, roleData.salary, roleData.department_id);
  console.log('Role added successfully!');
}

async function addEmployee() {
  const roles = await queries.viewAllRoles();
  const managers = await queries.viewAllEmployees();
  const roleChoices = roles.map(({ id, title }) => ({ name: title, value: id }));
  const managerChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));
  managerChoices.unshift({ name: "None", value: null });

  const employeeData = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name of the employee:',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name of the employee:',
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select the role for the employee:',
      choices: roleChoices,
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'Select the manager for the employee:',
      choices: managerChoices,
    },
  ]);

  await queries.addEmployee(employeeData.first_name, employeeData.last_name, employeeData.role_id, employeeData.manager_id);
  console.log('Employee added successfully!');
}

async function updateEmployeeRole() {
  const employees = await queries.viewAllEmployees();
  const roles = await queries.viewAllRoles();
  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));
  const roleChoices = roles.map(({ id, title }) => ({ name: title, value: id }));

  const updateData = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select the employee to update:',
      choices: employeeChoices,
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the new role for the employee:',
      choices: roleChoices,
    },
  ]);

  await queries.updateEmployeeRole(updateData.employeeId, updateData.roleId);
  console.log('Employee role updated successfully!');
}

startApp();
