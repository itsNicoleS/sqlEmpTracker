DROP DATABASE IF EXISTS employee_tracker; 
CREATE DATABASE employee_tracker; 
USE employee_tracker; 

CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR (30) NOT NULL
);

SHOW TABLE;

CREATE TABLE employees
 (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR (50) NOT NULL, 
    last_name VARCHAR (50) NOT NULL, 
    department_id INT, 
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

DESCRIBE employees; 

  CREATE TABLE titles (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR (50) NOT NULL,
        salary INT NOT NULL); 

        SHOW TABLE; 

    ALTER TABLE employees
     ADD COLUMN title_id INT;
    ALTER TABLE employees
    FOREIGN KEY (title_id) REFERNCES title(id) ON DELETE SET NULL; 

SHOW TABLES;

INSERT INTO department (name) VALUES
    ("Books"), 
    ("Money"), 
    ("Puppies");
    SHOW TABLE department;

INSERT INTO employees
 (first_name, last_name, department_id) VALUES
    ("JRR", "Tolkein", 1), 
    ("Rudyard", "Kipling", 1),
    ("Chuck", "Palahniuk", 1), 
    ("King", "Leo", 3),
    ("Chanel", "Choux", 3), 
    ("Captain", "Ron", 3), 
    ("Piggy", "Bank", 2), 
    ("Underpants" "Gnomes", 2)
    ;
SHOW TABLE employees;


    INSERT INTO tiles (role, salary) VALUES
    ("Manager", 100000), 
    ("Software Engineer", 90000), 
    ("Marketing", 80000)
    ;
    SHOW TABLE titles; 


    

  


