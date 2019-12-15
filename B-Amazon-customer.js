var inquirer = require('inquirer');
var mysql = require('mysql');
var colors = require('colors');
var amountOwed;

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '********',
    database: 'b_amazon_db'
});

//Establish Connection
connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id: ' + connection.threadId)
});

//FUNCTIONS
//=============================================================================

//Displays all items available in store and then calls the place order function
function showProducts() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log('=================================================');
        console.log('=================Items in Store==================');
        console.log('=================================================');

        for (i = 0; i < res.length; i++) {
            console.log('Item ID:'.green.bold + res[i].id + ' Product Name: '.yellow.bold + res[i].ProductName + ' Price: ' + '$' + res[i].Price + '(Quantity left: '.red.bold + res[i].StockQuantity + ')')
        }
        console.log('=================================================');
        placeOrder();
    })
}

//Prompts the user to place an order, fulfills the order, and then calls the new order function
function placeOrder() {
    inquirer.prompt([{
        name: 'selectId',
        message: 'Please enter the ID of the product you wish to purchase',
        validate: function (value) {
            var valid = value.match(/^[0-9]+$/)
            if (valid) {
                return true
            }
            return 'Please enter a valid Product ID'.red.bold
        }
    }, {
        name: 'selectQuantity',
        message: 'How many of this product would you like to order?',
        validate: function (value) {
            var valid = value.match(/^[0-9]+$/)
            if (valid) {
                return true
            }
            return 'Please enter a numerical value'.yellow.bold
        }
    }]).then(function (answer) {
        connection.query('SELECT * FROM products WHERE id = ?', [answer.selectId], function (err, res) {
            if (answer.selectQuantity > res[0].StockQuantity) {
                console.log('Insufficient Quantity'.blue.bold);
                console.log('This order has been cancelled'.cyan.bold);
                console.log('');
                newOrder();
            } else {
                amountOwed = res[0].Price * answer.selectQuantity;
                currentDepartment = res[0].DepartmentName;
                console.log('Thanks for your order'.magenta.bold);
                console.log('You owe $' + amountOwed);
                console.log('');
                //update products table
                connection.query('UPDATE products SET ? Where ?', [{
                    StockQuantity: res[0].StockQuantity - answer.selectQuantity
                }, {
                    id: answer.selectId
                }], function (err, res) {});
                newOrder();
            }
        })

    }, function (err, res) {})
};

//the user can place a new order or end
function newOrder() {
    inquirer.prompt([{
        type: 'confirm',
        name: 'choice',
        message: 'Would you like to place another order?'.yellow.bold
    }]).then(function (answer) {
        if (answer.choice) {
            placeOrder();
        } else {
            console.log('Thank you for shopping at B-amazon!'.green.bold);
            connection.end();
        }
    })
};

showProducts();