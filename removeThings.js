const inquirer = require("inquirer");

//remove Department 
async function removeaDepartment(connection) {
    const departments = await connection.promise().query('SELECT * FROM department')
    //console.log (JSON.stringify(departments));
    const { department_id } = await inquirer.prompt([
        {
            type: "list",
            name: "department_id",
            message: "Which are we removing?",
            choices: departments[0].map(({ id, name }) => {return { name: name, value: id }})
        }
    ])
    await connection.promise().query(`DELETE FROM department WHERE id = ${department_id}`)
    console.log("department deleted successfully!")
}

//remove Employee

async function removeEmployees(connection) {
    const employees = await connection.promise().query('SELECT * FROM employees')

    const { employees_id } = await inquirer.prompt([
        {
            type: "list",
            name: "employees_id",
            message: "Which are we removing?",
            choices: employees[0].map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id })),
        }
    ])
    await connection.promise().query(`DELETE FROM employees WHERE id = ${employees_id}`)
    console.log("employee deleted success!")
}
module.exports = { removeaDepartment, removeEmployees }; 
