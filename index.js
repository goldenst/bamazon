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



function searchDb () {
  connection.query('SELECT * FROM products WHERE id  = 3', function(err,res) {
    console.table(res)
    //connection.end();
  })
}

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
      // case "EXIT":
      //   connection.end();
      //   break;
    }
  })
  connection.end();
}

// customer function
function readDb (){
  inquirer.prompt({
    name: 'Purchase',
    type: 'input',
    message: 'Enter Item Id number that You Would like to Purchase ?'
    }).then(function(answer) {
    var query = "select * FROM products WHWER id ?";
    connection.query(query,{Purchase: answer.Purchase}, function(err,res) {
      console.table(res);
      open();
    });
  });
}

// manager function
function managerRole (){
  inquirer.prompt({
    name: 'manage',
    type: 'list',
    message: 'Chose Action',
    choices: ['UPDATE Item Quanity', 'UPDATE Item Price' , 'Exit']
  })
}

function adminRole() {
  inquirer.prompt({
    name: 'admin',
    type: 'list',
    Message: 'Choose What you neeed to do ?',
    choices: ['add Item', 'Delete item', 'change description', 'UPDATE Item Quanity', 'UPDATE Item Price' , 'Exit' ]
  })
}



open();