//const { default: inquirer } = require("inquirer");


const inquirer = require("inquirer");

// const { mainQuestions, exitFunct } = require("./app.js");

//remove Department 
async function  removeaDepartment(connection) {
    return await connection.query('SELECT * FROM department', (err, departments) => {
        console.log(JSON.stringify(departments));
        inquirer.prompt([
            {
                type: "list",
                name: "department_id",
                message: "Which are we removing?",
                choices: departments.map(({id, name}) =>  ({"name": name, "value": id}) ),
            }
        ])
        .then(async (answers) => {
            const sql = `DELETE FROM department WHERE id = ${answers.department_id}`;
            return await connection.query(sql, (err, results) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log ("deleted success!");
                };
            });
        });
}); }

//remove Employee

async function removeEmployees(connection, mainQuestions, exitFunct) {
    await connection.query('SELECT * FROM employees', (err, employees) => {
        
        inquirer.prompt([
            {
                type: "list",
                name: "employees_id",
                message: "Which are we removing?",
                choices: employees.map(employee => ({ name: employee.name, value: employee.id })),
            }
        ])
        .then(async (answers) => {
            const sql = `DELETE FROM employees WHERE id = ${answers.employees_id}`;
            await connection.query(sql, (err, results) => {
                if (err) {
                    exitFunct(err)
                }
                else {
                    console.table(results)
                    mainQuestions();
                };
                
            }
           // console.log("here i am!")
            );
        });
}); }
module.exports = { removeaDepartment, removeEmployees }; 
