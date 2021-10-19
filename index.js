const fs = require('fs');
const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const generateHtml = require('./util/generateHtml')

//creating an array for my employees on a global level
const team = [];

//starts the application with inquirer with questions below
const start = () => {
    // console.log("current employees")
    // console.table(team);
    inquirer.prompt([
        {
            type: "input",
            message: "What is the team manager's name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is the employee ID?",
            name: "id",
        },
        {
            type: "input",
            message: "What is the employee's email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is the employee's office number?",
            name: "officeNumber",
        },

        // "answer" can be defined as whatever
    ]).then(managerAnswer => {
        const myEmployees = new Manager(managerAnswer.name, managerAnswer.id, managerAnswer.email, managerAnswer.officeNumber);
        team.push(myEmployees);
        addEmployee();
    })
}

const addEmployee = () => {
    inquirer.prompt(
        {
            // generates a list and allows you select your choices 
            type: "list",
            message: "Do you want to add an Engineer, Intern, or build team? ",
            name: "choice",
            choices: ["Add an Engineer", "Add an Intern", "Build Team"]
        }).then(managerAnswer => {
            switch (managerAnswer.choice) {
                case "Add an Engineer":
                    addEngineer();
                    break;
                case "Add an Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();
                    break;
            }
        })
}

const addEngineer = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the Engineer's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the Engineer's ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the Engineer's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the Engineer's GitHub username?",
            name: "github"
        },
    ]).then(engineerAnswer => {
        console.log(engineerAnswer)
        const myEmployees = new Engineer(engineerAnswer.name, engineerAnswer.id, engineerAnswer.email, engineerAnswer.github);
        team.push(myEmployees)
        inquirer.prompt({
            // generates a list and allows you select your choices 
            type: "list",
            message: "Do you want to add an Engineer, Intern, or build team? ",
            name: "choice",
            choices: ["Add an Engineer", "Add an Intern", "Build Team"]

        }).then(response => {
            if (response.choice === "Add an Engineer") {
                addEngineer();
            } else if (response.choice === "Add an Intern") {
                addIntern();
            } else {
                buildTeam();
            }
        })
    })

}

const addIntern = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the Intern's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the Intern's ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the Intern's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the Intern's school?",
            name: "school"
        },
    ]).then(internAnswer => {
        console.log(internAnswer)
        const myEmployees = new Intern(internAnswer.name, internAnswer.id, internAnswer.email, internAnswer.school);
        team.push(myEmployees)
        // console.table(team)
        inquirer.prompt({
            // generates a list and allows you select your choices 
            type: "list",
            message: "Do you want to add an Engineer, Intern, or build team? ",
            name: "choice",
            choices: ["Add an Engineer", "Add an Intern", "Build Team"]

        }).then(response => {
            if (response.choice === "Add an Engineer") {
                addEngineer();
            } else if (response.choice === "Add an Intern") {
                addIntern();
            } else {
                buildTeam();
            }
        })
    })

}

const buildTeam = () => {
    fs.writeFile("./dist/index.html", generateHtml(team), (err) =>
        err ? console.log(err) : console.log('Done!'));
}

start();