const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

function appMenu() {

    function createManager(){
    inquirer.prompt([
        
            {type: "input",
            message: "please give manager name:",
            name: "managerName",
            validate: function(answer) {
                if (answer !== "") { //managerName
                    return true;
                }
                return "Please enter at least one character"
            }},
        
        {
            type: "input",
            message: "please give manager id:",
            name: "managerId"
        },
        {
            type: "input",
            message: "please give manager email:",
            name: "managerEmail"
        },
        {
            type: "input",
            message: "please give manager office number:",
            name: "managerOfficeNumber"
        }
    ]).then(function(answers) {
    const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
    console.log(manager)
    // teamMembers = fs.readFileSync("templates/manager.html");
    // const managerHtml = renderManager(manager);
    // console.log(managerHtml);
    teamMembers.push(manager);
createTeam();
});
}
function createTeam() {
inquirer.prompt([
  {
    type: "list",
    name: "memberChoice",
    message: "Which type of team member would you like to add?",
    choices: [
      "Engineer",
      "Intern",
      "I don't want to add any more team members"
    ]
  }
]).then(userChoice => {
  switch(userChoice.memberChoice) {
  case "Engineer":
    addEngineer();
    break;
  case "Intern":
    addIntern();
    break;
  default:
    buildTeam();
  }
}).catch(error => console.log(error));
}
function addEngineer() {
inquirer.prompt([
  // engineer questions go here
  {
    type: "input",
    message: "What is your Engineer's GitHub?",
    name: "github"
}
]).then(answers => {
    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
  // do something with answers, make new Engineer()
  // add engineer to teamMembers array
  teamMembers.push(engineer);
  createTeam();
});
}
function addIntern() {
inquirer.prompt([
  // intern questions go here
  {
    type: "input",
    message: "What school is your Intern attending?",
    name: "school"
}
]).then(answers => {
    const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
  // do something with answers, make new Intern()
  // add intern to teamMembers array
  teamMembers.push(intern);

  createTeam();
});
}
function buildTeam() {
// build html files from teamMembers array
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR)
  }
fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
}
createManager();
}
appMenu();






// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
