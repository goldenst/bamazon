var mysql = require('mysql');
var inquirer = require('inquirer');

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

connection.connect(function (err, res) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId + "\n");
  //close connection

 // connection.end()
});

function searchDb() {
  connection.query('SELECT * FROM products', function (err, res) {
    console.log('\n--------------------------------------------------------------\n')
    console.table(res)
  })
}
//searchDb();

 function open() {
   inquirer.prompt([{
    name: 'manager',
         type: 'list',
         message: 'Select your task',
         choices: ['View all products', 'View low Inventory', 'Add products', 'Add to low inventory']
   }
  ]).then(answer => {
    console.info('Answers: ', answer.manager) 
     
      if (answer.manager === 'View all products') {
        var query = 'SELECT * FROM products';
        connection.query(query, function (err, res) {
          if (err) throw err
          console.table(res)
          open();
        })
      } 
      if (answer.manager === 'View low Inventory') {
        var query = 'SELECT * FROM products WHERE quan < 15';
        connection.query(query, function (err, res) {
          if (err) throw err
          console.table(res)
          //open();
        })
      } 

        if (answer.manager === 'Add to low inventory') {
          //connection.end();
          addLowInv()
      } 

      if (answer.manager === 'Add products') {
        //connection.end();
        addProd()
    } 
    
  })
  
 }
 open();

function addProd () {
        var query = 'SELECT * FROM products WHERE quan < 15';
      connection.query(query, function (err, res) {
        if (err) throw err
        console.table(res)
        //open();
      })
  console.log('add Prod function');
  
}

function addLowInv () {
    inquirer.prompt([{
      name: 'itemid',
      type: 'input',
      message: 'enter Item Id you wish to add inventory to'
    },
    {
      name: 'quan',
      type: 'input',
      message: 'New Quanity'
    }]).then(answer => {
      connection.query(`UPDATE products SET quan = ${answer.quan} WHERE id = ${answer.itemid}`)
      
      {
        if (err) throw err
        // console.log(answer)
        // console.table(res)
      //open();
      }
    })




  
  console.log('low inv function');
  open();
}



//{
//   inquirer.prompt([{
//     name: 'manager',
//     type: 'list',
//     message: 'Select your task',
//     choices: ['View all products', 'View low Inventory', 'Add products', 'Add to low inventory']
//   }
// ]).then(answer => {

//   console.log(answer)

// }), function (err, res) {}