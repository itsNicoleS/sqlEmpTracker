const inquirer = require("inquirer");
const mysql = require("mysql");
// require("dotenv").config();
const {AddaDepartment, addRole, addEmployee} = require ("./addThings.js")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hello",
    database: "employee_tracker"

})

async function mainQuestions() {
    await inquirer
        .prompt([
            {
                type: "list",
                name: "fart",
                message: "select an Action:",
                choices: ["View All Departments", "View All Employees", "View All Roles", "Add a Department", "Remove A Department", "Add an Employee", "Remove Employee", "Add a Role", "Update an Employee Role", "EXIT"],
            },
        ])
        .then(async (answers) => {
            const chosen = answers.fart;
            console.log(chosen)
            switch (chosen) {
                case "View All Departments":
                    connection.query('SELECT * from department', (err, results) => {

                        if (err) {
                            exitFunct(err)
                        }
                        else {
                            console.table(results)
                        };
                        mainQuestions();
                    });
                    break;
                case "View All Employees":
                    connection.query('SELECT * from employees', (err, results) => {

                        if (err) {
                            exitFunct(err)
                        }
                        else {
                            console.table(results)
                        };
                        mainQuestions();
                    });
                    break;

                case "View All Roles":
                    connection.query('SELECT * from roles', (err, results) => {

                        if (err) {
                            exitFunct(err)
                        }
                        else {
                            console.table(results)
                        };
                        mainQuestions();
                    });
                    break;



                case "Add a Department":
                    inquirer.prompt([
                        {
                            type:"input",
                            name:"department",
                            message:"input a new dep"
                        }
                    ]).then((answer)=>{  AddaDepartment(answer);

                    }).then(()=>{
                        mainQuestions();
                    })
                  
                    // if (err) {
                    //     console.log(err);
                    //     exitFunct(err)
                    // }
                    // else {
                    //     console.table(results)
                    // };
                    
                    break;

                case "Remove A Department":
                    removeaDepartment();
                    if (err) {
                        exitFunct(err)
                    }
                    else {
                        console.table(results)
                    };
                  
                    break;

                case "Add an Employee":
                    addEmployee();
                    if (err) {
                        exitFunct(err)
                    }
                    else {
                        console.table(results)
                    };
                    mainQuestions();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    if (err) {
                        exitFunct(err)
                    }
                    else {
                        console.table(results)
                    };
                    mainQuestions();
                    break;

                case "Add a Role":
                    addRole();
                    if (err) {
                        exitFunct(err)
                    }
                    else {
                        console.table(results)
                    };
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
                    console.log("Fine, exiting...");
                    break;
            }

        }
        );
}

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
    process.exit(1);
}
mainQuestions();