const inquirer = require("inquirer");
//const inquirer = import("inquirer");
const mysql = require("mysql2");
const ascii = require("ascii-art");
// require("dotenv").config();
const { AddaDepartment, addRole, addEmployee } = require("./addThings.js");
const { removeaDepartment, removeEmployees } = require("./removeThings.js");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hello",
    database: "employee_tracker"

})

async function mainQuestions() {
    let render = await ascii.font("Welcome!", 'doom').completed()
    console.log(render);

   while (true) {
   const answers = await inquirer.prompt([
            {
                type: "list",
                name: "fart",
                message: "Select an Action:",
                choices: ["View All Departments", "View All Employees", "View All Roles", "Add a Department", "Remove A Department", "Add an Employee", "Remove Employee", "Add a Role", "Update an Employee Role", "EXIT"],
            },
        ]);
        const chosen = answers.fart;
            console.log(chosen);

            switch (chosen) {
                case "View All Departments":

                    const [departments] = await connection.promise().query
                    ('SELECT * from department')
                    console.table(departments);

                    mainQuestions();

                    break;
                case "View All Employees":

                    const [employees] = await connection.promise().query
                        ("SELECT employees.first_name, employees.last_name, roles.title, roles.salary, roles.department_id FROM employees, roles WHERE employees.role_id=roles.id")
                    console.table(employees);

                    mainQuestions();

                    break;

                case "View All Roles":
                    const [roles] = await connection.promise().query
                        ("SELECT roles.title, roles.salary, department.name as department_name FROM roles, department WHERE roles.department_id= department.id")
                    console.table(roles);

                    mainQuestions();

                    break;

                case "Add a Department":
                    await AddaDepartment(connection);
                    mainQuestions();

                    break;


                case "Add an Employee":
                    await addEmployee(connection);

                    mainQuestions();

                    break;

                case "Add a Role":
                    await addRole(connection)
                    mainQuestions();

                    break;

                case "Remove A Department":
                    await removeaDepartment(connection)
                    mainQuestions();


                    break;

                case "Remove Employee":
                    await removeEmployees(connection);

                    mainQuestions();

                    break;

                case "Update an Employee Role":
                    updateRole();
                    if (err) {
                        exitFunct(err)
                    }
                    else {
                        console.table(results)
                    };
                    mainQuestions();

                    break;

                case "EXIT":
                    connection.end();
                    console.log("Goodbye!");
                    process.exit(1);
            }

        }
};

//update Employee Roles
async function updateEmployeeRole() {
    connection.query("SELECT * FROM employees", async (err, employees) => {
        if (err) {
            exitFunct(err)
        }
        else {
            console.table(results)
        };
        connection.query("SELECT * FROM titles", async (err, roles) => {
            if (err) {
                exitFunct(err)
            }
            else {
                console.table(results)
            };

            inquirer.prompt([
                {
                    type: "list",
                    name: "role_id",
                    message: "Select the New Role:",
                    choices: roles.map(role => ({ name: role.title, valuye: role.id })),
                }
            ])
                .then(async (answers) => {
                    const sql = `UPDATE employees SET role_id = ${answers.role_id} WHERE id = ${answers.employee_id}`;
                    connection / query(sql, (err, results) => {
                        if (err) {
                            exitFunct(err)
                        }
                        else {
                            console.table(results)
                        };
                        mainQuestions();
                    }
                    )
                }
                )
        })

    })

}




function exitFunct(err) {
    console.error('Error', err);
    connection.end();
    process.exit(0);
}
mainQuestions();

module.exports = { mainQuestions, exitFunct }; 