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
  console.log("connected as id " + connection.threadId + "\n");

  // /close connection
  //connection.end()
});

function readDb (){
  connection.query("select * FROM products", function(err, res) {
    console.table(res);
    connection.end();
  })
}

function searchDb () {
  connection.query('SELECT * FROM products WHERE id  = 3', function(err,res) {
    console.table(res)
    connection.end();
  })
}

function updateDb () {
  connection.query('UPDATE products SET price = 10 ',function(err,res) {
    console.table(res)
    connection.end();
  })    
}

function deleteDb () {
  connection.query('DELETE FROM products WHERE id = 3' ,function(err,res) {
    console.table(res)
    connection.end();
  })
}
  
//deleteDb();
//updateDb();
//searchDb();
//readDb();