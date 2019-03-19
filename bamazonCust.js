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
  // close connection

  //connection.end()
});

function searchDb() {
  connection.query('SELECT * FROM products', function (err, res) {
    console.log('\n--------------------------------------------------------------\n')
    console.table(res)
  })
}

function open() {
  inquirer.prompt([{
      name: 'itemId',
      type: 'input',
      message: 'Select the Id of Item you wish to  Purchase from Babazon'
    },
    {
      name: 'quanity',
      typy: 'input',
      message: 'How many would you like to Have'
    }
  ]).then(answers => {
    console.info('Answers: ', answers)
    var query = `SELECT * FROM products WHERE ?`;
    connection.query(query, {
      id: answers.itemId
    }, function (err, res) {
      // console.table(res)
      console.log('Id#: ', res[0].id)

      console.log('Quan: ', res[0].quan)
      // checks quantity in db
      if (res[0].quan < answers.quanity) {
        console.log('The Avalible Stock is only ', res[0].quan, '- Please choose a lower Quanity')
        open();

      } else {
        // remove value fron quan in db
        var sale = res[0].price * answers.quanity;
        var newQuanity = res[0].quan - answers.quanity;
        connection.query(`UPDATE products SET quan = ${newQuanity} WHERE id = ${res[0].id}`)
        console.log('purchase Suscessful  you spent $', sale)
        //console.log(sale, 'price', res[0].price, 'quan purchased', answer.quanity)
        //console.log('new quan: ' , newQuanity)
        searchDb();
        //open();
      }

    })
  })
  //connection.end();
}

open();
searchDb();