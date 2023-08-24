//Add Department

const inquirer = require("inquirer");
const util = require('util');

async function AddaDepartment(name, connection) {


    // console.log(`you picked ${name}`);
    var sql = "INSERT INTO department (name) VALUES('" + name + "')";
    console.log(sql)
    return connection.query(sql, (err, results) => {

        if (err) {
            exitFunct(err)
        }
        else {
            console.table(results)
            mainQuestions();
        };

    });

}


// Add Employee
async function addEmployee() {
    connection.query('SELECT * from employees', (err, results) => {

        if (err) {
            exitFunct(err)
        }
        else {
            console.log("success!")
        }
    });

    var questions = [
        {
            type: "input",
            name: "First",
            message: "What is the First Name?",

        },
        {
            type: "input",
            name: "Last",
            message: "What is the Last Name?",

        },
        {
            type: "list",
            name: "Role",
            message: "What is the Employee Role?",
            choices: [results.Roles]

        }]
    await inquirer
        .prompt()
        .then(async (answers) => {

            var sql = "INSERT INTO employees (name) VALUES('" + answers.Emp + "')";

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
};

//add a Role 

async function addRole(connection) {

    const query = util.promisify(connection.query).bind(connection);
    var results = await query('SELECT * from department');
    console.log(JSON.stringify(results));
    var department_id = [];
    for (i = 0; i < results.length; i++) {
        department_id.push(
            results[i].id)
    }
    await inquirer
        .prompt([
            {
                type: "select",
                name: "DeptID",
                message: "Which Department is this Role going into? ",
                choices: department_id,

            },
            {
                type: "input",
                name: "title",
                message: "Enter the title of the new role:",
            },
            {
                type: "input",
                name: "salary",
                message: "Enter the salary for this new role:",
            },

        ])
        .then(async (answers) => {
            console.log(JSON.stringify(answers));
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES ('${answers.title}', '${answers.salary}', '${answers.DeptID}')`;
            connection.query(sql, (err, results) => {
                console.log("query executed");
                if (err) {
                    console.log(JSON.stringify(err));
                }
                else {
                    console.log("success!")
                };
            });
        });


}

module.exports = { AddaDepartment, addRole, addEmployee }; 