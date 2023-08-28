++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++DROP DATABASE IF EXISTS employee_tracker; 
CREATE DATABASE employee_tracker; 
USE employee_tracker; 

CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR (30) NOT NULL
);

  CREATE TABLE roles (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR (50) NOT NULL,
        salary INT NOT NULL, 
        department_id INT,
       FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
    ); 
  
CREATE TABLE employees
 (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR (50) NOT NULL, 
    last_name VARCHAR (50) NOT NULL, 
    role_id INT, 
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
); 

DESCRIBE titles;

INSERT INTO department (name) VALUES
    ("Books"), 
    ("Money"), 
    ("Puppies");
   


INSERT INTO roles (title, salary, department_id) VALUES
("Manager", 100000, 1), 
("Software Engineer", 90000, 2), 
("Marketing", 80000, 3)
;
DESCRIBE roles; 

INSERT INTO employees
 (first_name, last_name, role_id) VALUES
    ("JRR", "Tolkein", 1), 
    ("Rudyard", "Kipling", 1),
    ("Chuck", "Palahniuk", 1), 
    ("King", "Leo", 3),
    ("Chanel", "Choux", 3), 
    ("Captain", "Ron", 3), 
    ("Piggy", "Bank", 2), 
    ("Underpants", "Gnomes", 2)
    ;
DESCRIBE roles;




    

  


