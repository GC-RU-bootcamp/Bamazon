require("dotenv").config();
var FS = require("fs");
var mysql = require("mysql");
var inquirer = require("inquirer");

var db_connect_info = {
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
};

// create the connection information for the sql database
var connection = mysql.createConnection(db_connect_info);

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  welcomeMsg();
  queryCategories();
});

function welcomeMsg() {
  console.log("----------------------------------------");
  console.log("-------- Welcome to Bamazon! -----------");
  console.log("----------------------------------------\n");
}

function queryCategories() {
  var depts = [];
  var query = connection.query(
    "SELECT distinct department_name FROM products ",
    [],
    function(err, res) {
      if (err) throw err;
      // console.log("What department would like to shop?");
      for (var i = 0; i < res.length; i++) {
        // console.log("- "+ res[i].department_name);
        depts.push(res[i].department_name);
      }
      whichDept(depts);
    }
  );
} // queryCategories

var products = [];

function queryDeptProducts(dept) {
  
  p = {};
  var query = connection.query(
    "SELECT item_id, product_name, price, stock_quantity FROM products where department_name = ?",
    [dept],
    function(err, res) {
      if (err) throw err;
      // console.log("What department would like to shop?");
      for (var i = 0; i < res.length; i++) {
        // console.log("- "+ res[i].department_name);
        p = new Prod(
          res[i].item_id,
          res[i].product_name,
          res[i].price,
          res[i].stock_quantity
        );
        products.push(p);
      }
      whichProduct(products);
    }
  );
} // queryCategories

var Prod = function(id, name, price, qty) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.qty = qty;
  this.showItem = function() {
    return this.id + ") " + (this.name+",                   ").slice(0,20) + " $" + (this.price+",         ").slice(0,10)  +  +  this.qty + " in stock";
  };
  
};

function getIdFromAns(str) {
  var id = -1;
  var arr = str.split(")");
  var id = parseInt(arr[0]);
  return id ;
};

function myFindIndexById(list, id) {
  var retval = -1;
  for (let i = 0; i < list.length; i++) {
    if (id === list[i].id) {
      retval = i;
      break;
    }
  }
  return retval;
}

// function which prompts the user for what action they should take
function whichDept(depts) {
  var dept = "";
  inquirer
    .prompt({
      name: "dept",
      type: "list",
      message: "What deparment would like to shop?",
      choices: depts
    })
    .then(function(answer) {
      dept = answer.dept;
      console.log(dept + " -- Okay ...\n");
      queryDeptProducts(dept);
      // based on their answer, either call the bid or the post functions
    });
} //start

function productDisplayList(products) {
  var list = [];
  products.forEach(element => {
    list.push(element.showItem());
  });
  return list;
}

// function which prompts the user for what action they should take
function whichProduct(products) {
  var product = "";
  inquirer
    .prompt([
      {
        name: "product",
        type: "list",
        pageSize: products.length,
        message: "What product would like to buy?",
        choices: productDisplayList(products)
      },
      {
        name: "qty",
        type: "input",
        message: "How many would like to buy? ", //+ products[Prod.getIdFromAns(product)].qty,
        validate: function(value) {
          // var pass = value.match(
          //   /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
          // );
          if (parseInt(value) > -1) {
            return true;
          }
    
          return 'Please enter a valid number';
        }
      }
    ])
    .then(function(answer) {
      product = answer.product;
      console.log(product);
      console.log(answer.qty);
      var item_id = getIdFromAns(product);
      var index = myFindIndexById(products, item_id);
      // out of stock?
      if (products[index].qty < parseInt(answer.qty)){
          console.log("Sorry, There is only "+ products[index].qty + " in stock \n")
          //changeQtyPrompt(products, index, qty);
          whichProduct(products)
      } 
      // chose zero qty then query for new product
      else if (parseInt(answer.qty) === 0 ) {
        console.log("Okay. nothing purchased");
        console.log("Lets try again\n");
        while(products.length){
          products.pop();
        }
        products = [];
        queryCategories();
      } else {
        // deduct qty from stock;
        console.log("Purchase:");
        console.log("  Qty "+ answer.qty + ") '"+ products[index].name +"' at $"+ products[index].price + " each");
        console.log("  Total: :" + parseInt(answer.qty) * products[index].price+"\n\n");
        while(products.length){
          products.pop();
        }
        products = [];
        queryCategories();
      }

        
      // based on their answer, either call the bid or the post functions
      // if (answer.postOrBid.toUpperCase() === "POST") {
      //   postAuction();
      // }
      // else {
      //   bidAuction();
      // }
    });
} //start

function changeQtyPrompt(products, index, qty) {
  var product = "";
  inquirer
    .prompt([
      {
        name: "product",
        type: "list",
        pageSize: products.length,
        message: "What product would like to buy?",
        choices: productDisplayList(products)
      },
      {
        name: "qty",
        type: "input",
        message: "How many would like to buy? " //+ products[Prod.getIdFromAns(product)].qty
      }
    ])
    .then(function(answer) {
      product = answer.product;
      console.log(product);
      console.log(answer.qty);
      // based on their answer, either call the bid or the post functions
      // if (answer.postOrBid.toUpperCase() === "POST") {
      //   postAuction();
      // }
      // else {
      //   bidAuction();
      // }
    });
} //start
