var mysql = require ('mysql');
var inquirer = require ('inquirer');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId + "\n");
  // close connection
  //connection.end()
});





function updateDb () {
  connection.query('UPDATE products SET price = 10 ',function(err,res) {
    console.table(res)
    //connection.end();
  })    
}

function deleteDb () {
  connection.query('DELETE FROM products WHERE id = 3' ,function(err,res) {
    console.table(res)
    //connection.end();
  })
}
  
//deleteDb();
//updateDb();
//searchDb();
//readDb();

function open (){
  inquirer.prompt ({
    name: 'start',
    type: 'list',
    message: 'Select your roll',
    choices: [
      'Customer',
      'Manager', 
      'Admin', 
      'EXIT'
      ]
      
  })
  .then(function(answer) {
    switch (answer.start) {
      case "Customer":
        readDb();
        break;
      case "Manager":
        managerRole();
        break;
      case "Admin":
        adminRole();
        break;
    }
    return
  })

  connection.end();
}

// customer function
function readDb (){
  inquirer.prompt([{
    name: 'itemId',
    type: 'input',
    message: 'Enter Item Id number that You Would like to Purchase ?'
  },{
    name:'quanity',
    type: 'input',
    message: 'How mant would you like'
  }]).then(function(answers) {
    var query = "select FROM products WHERE id = ? ";
    connection.query(query,{itemId: answers}, function(err,res) {
      console.info(answers);
      console.table(res);
      
    });
  });
}

// manager function
function managerRole (){
  inquirer.prompt([{
    name: 'manage',
    type: 'list',
    message: 'Chose Action',
    choices: ['UPDATE Item Quanity', 'UPDATE Item Price' , 'Exit']
  }])
}

// admin function
function adminRole() {
  inquirer.prompt([{
    name: 'admin',
    type: 'list',
    Message: 'Choose What you neeed to do ?',
    choices: ['add Item', 'Delete item', 'change description', 'UPDATE Item Quanity', 'UPDATE Item Price' , 'Exit' ]
  }])
}



open();
//searchDb();