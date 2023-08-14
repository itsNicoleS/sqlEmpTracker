//Add Department

const inquirer = require("inquirer");

async function AddaDepartment(name) {

      
            console.log(`you picked ${name}`);
            var sql = "INSERT INTO department (name) VALUES('" + name + "')";
            console.log(sql)
           return await connection.query(sql, (err, results) => {

                if (err) {
                    exitFunct(err)
                }
                else {
                    console.table(results)
                };

                mainQuestions();
            });
      
}


// Add Employee
async function addEmployee() {
    connection.query('SELECT * from employees', (err, results) => {

        if (err) {
            exitFunct(err)
        }
        else {
            console.table(results)
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

async function addRole() {
    await inquirer
    .prompt ([
        {
            type: "input", 
            name: "title", 
            message: "Enter the title of the new role:",
        }, 
        {
            type: "input", 
            name: "salary", 
            message: "Enter the salary for this new role:", 
        }
    ])
.then (async (answers) => {
    const sql = `INSERT INTO titles (title, salary) VALUES ('${answers.title}', '${answers.salary}')`;
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
}

module.exports =  {AddaDepartment, addRole, addEmployee}; 