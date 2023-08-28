//Add Department

const inquirer = require("inquirer");
const util = require('util');
const maine = null;
function setMain(useMain) {
    maine = useMain
    console.log("setMain called")
}

async function AddaDepartment(connection) {

    try {
        const { department } = await inquirer.prompt([
            {
                type: "input",
                name: "department",
                message: "What is the name of the department you want to add?",
            }
        ])
        await connection.promise().query(`INSERT INTO department (name) VALUES ('${department}')`)

    } catch (err) {
        console.log(err);
    }
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

//add Employee 
async function addEmployee(connection) {
    const [roles] = await connection.promise().query("SELECT * FROM roles");
    try {
        const { first_name, last_name, roles_id, } = await inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the first name of the employee?",
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the last name of the employee?",
            },
            {
                type: "list",
                name: "roles_id",
                message: "Please to be choose a role from list",
                choices: roles.map(({ id, title }) => {
                    return {
                        value: id,
                        name: title
                    }
                })
            },])


        await connection.promise().query(`INSERT INTO employees (first_name, last_name, role_id) VALUES ('${first_name}', '${last_name}', '${roles_id}')`);
        console.log("employee added succesfully!")
    } catch (err) {
        console.log(err);
    }
};

module.exports = { AddaDepartment, addRole, addEmployee, setMain, }; 