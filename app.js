const inquirer = requier("inquirer");
const mysql = requier("mysql");

inquirer
    .prompt([
        {
            type: "list",
            name: "action",
            message: "select and action:",
            choices: ["View all Departments", "View all Roles", "View all Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Exit"],
        },
    ])
    .then((answers) => {

    }
    );

    connection.query('CREATE DATABASE IF NOT EXISTS your_database_name', (err) => {
        if (err) {
          console.error('Error creating database:', err);
          connection.end();
          process.exit(1);
        }
    });
