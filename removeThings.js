const { default: inquirer } = require("inquirer");

//remove Department 
async function removeaDepartment() 
    connection.query('SELECT * FROM department', (err, departments) => {
        
        inquirer.prompt([
            {
                type: "list",
                name: "department_id",
                message: "Which are we removing?",
                choices: departments.map(dep => ({ name: department.name, value: deparment.id })),
            }
        ])
        .then(async (answers) => {
            const sql = `DELETE FROM department WHERE id = ${answers.department.id}`;
            connection.query(sql, (err, results) => {
                if (err) {
                    exitFunct(err)
                }
                else {
                    console.table(results)
                };
                mainQuestions();
            });
        });
}); 

//remove Employee

async function removeEmployees() 
    connection.query('SELECT * FROM employees', (err, employees) => {
        
        inquirer.prompt([
            {
                type: "list",
                name: "employees_id",
                message: "Which are we removing?",
                choices: employee.map(dep => ({ name: employee.name, value: employees.id })),
            }
        ])
        .then(async (answers) => {
            const sql = `DELETE FROM department WHERE id = ${answers.employees.id}`;
            connection.query(sql, (err, results) => {
                if (err) {
                    exitFunct(err)
                }
                else {
                    console.table(results)
                };
                mainQuestions();
            });
        });
}); 