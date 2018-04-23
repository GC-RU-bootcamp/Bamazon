"use strict";

require("dotenv").config();
var FS = require("fs");
var mysql = require("mysql");
var inquirer = require("inquirer");
var Product = require("./Product");
var Products = require("./Products");

var products = new Products();
var choices =[];
if (process.argv[1].includes("bamazonManager.js")) {
  products.managerMode = true;
  choices = [
    "View Products for Sale",
    "View Low Inventory",
    "Add to Inventory",
    "Add New Product"
  ];
}

if (process.argv[1].includes("bamazonSupervisor.js")) {
  products.supervisorMode = true;
  choices = [
    "View Product Sales by Department",
    "Create New Department",
  ]
}

var db_connect_info = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

function welcomeMsg() {
  console.log("----------------------------------------");
  console.log("-------- Welcome to Bamazon! -----------");
  if (products.managerMode)
    console.log("---------- Manager access --------------");
  if (products.supervisorMode)
    console.log("--------- Supervisor access ------------");
  console.log("----------------------------------------\n");
}

// create the connection information for the sql database
var connection = mysql.createConnection(db_connect_info);

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  welcomeMsg();
  if (products.supervisorMode) {
    actionPrompt(choices);
  } else if (products.managerMode) {
    actionPrompt(choices);
  } else {
    queryCategories();
  }
});

var actionPrompt = function(choices) {
  inquirer
    .prompt([
      {
        name: "activity",
        type: "list",
        message: "What do you want to do?",
        choices: choices
      }
    ])
    .then(function(activityPicked) {
      /* Use switch case to determine what method we'll be running */
      switch (activityPicked.activity) {
        case "View Products for Sale":
          queryCategories();
          break;
        case "View Low Inventory":
          queryLowStock();
          break;
        case "Add to Inventory":
          queryCategories();
          break;
        case "Add New Product":
          queryCategories(promptAddProduct);
          // whichDept(depts, ());
          break;
        case "View Product Sales by Department":
          queryReport(query, actionPrompt, choices);
          break;
        case "Create New Department":
          promptAddDept(promptAddProduct);
          break;
      }
    });
};

function queryCategories(nextFunc) {
  var depts = [];
  var query = connection.query(
    "SELECT distinct department_name FROM products ",
    [],
    function(err, res) {
      if (err) throw err;
      // console.log("What department would like to shop?");
      for (var i = 0; i < res.length; i++) {
        // console.log("- "+ res[i].department_name);
        if (res[i].department_name) {
          // avoid empty dept names
          depts.push(res[i].department_name);
        }
      }
      if (nextFunc) {
        whichDept(depts, nextFunc);
      } else {
        whichDept(depts);
      }
    }
  );
} // queryCategories

//var products = [];

function queryDeptProducts(dept) {
  products.emptyList();
  var query = connection.query(
    "SELECT item_id, product_name, department_name, price, stock_quantity," +
      "stock_limit, restock_quanity, stock_sold, gross_revenue  FROM products where department_name in (?)",
    [dept],
    function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        var p = new Product(
          res[i].item_id,
          res[i].product_name,
          res[i].department_name,
          res[i].price,
          res[i].stock_quantity,
          res[i].stock_limit,
          res[i].restock_quanity,
          res[i].stock_sold,
          res[i].gross_revenue
        );
        products.addProduct(p);
      }
      whichProduct(products);
    }
  );
} // queryDeptProducts

function queryProducts(query, productFunc) {
  var p = {};
  products.emptyList();
  var query = connection.query(
    query,
    // "SELECT item_id, product_name, department_name, price, stock_quantity," +
    //   "stock_limit, restock_quanity, stock_sold, gross_revenue FROM products where stock_quantity <= restock_quanity",
    [],
    function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        p = new Product(
          res[i].item_id,
          res[i].product_name,
          res[i].department_name,
          res[i].price,
          res[i].stock_quantity,
          res[i].stock_limit,
          res[i].restock_quanity,
          res[i].stock_sold,
          res[i].gross_revenue
        );
        products.addProduct(p);
      }
      productFunc(products);
    }
  );
} // queryDeptProducts

function queryProductUpdate(product, nextFunc, params) {
  var depts = [];
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        product_name: product.name,
        department_name: product.dept,
        price: product.price,
        stock_quantity: product.qty,
        stock_limit: product.maxQty,
        restock_quanity: product.restockQty,
        stock_sold: product.qtySold,
        gross_revenue: product.grossRevenue
      },
      {
        item_id: product.id
      }
    ],

    function(err, res) {
      if (err) throw err;
      console.log("DB updated\n");
      // for (var i = 0; i < res.length; i++) {
      //   // console.log("- "+ res[i].department_name);
      //   depts.push(res[i].department_name);
      // }
      // whichDept(depts);
      if (nextFunc) {
        if (params) nextFunc(params);
        else nextFunc();
      }
    }
  );
} // queryProductUpdate

function queryProductCreate(product, nextFunc, params) {
  var depts = [];
  var query = connection.query(
    "INSERT INTO products " +
      // + "(product_name, department_name, price,stock_quantity, stock_limit, restock_quanity, stock_sold, gross_revenue)"
      // + " values (?) ",
      " set ? ",
    [
      {
        product_name: product.name,
        department_name: product.dept,
        price: product.price,
        stock_quantity: product.qty,
        stock_limit: product.maxQty,
        restock_quanity: product.restockQty,
        stock_sold: product.qtySold,
        gross_revenue: product.grossRevenue
      }
    ],

    function(err, res) {
      if (err) throw err;
      console.log(
        "Created new product '" +
          product.name +
          "' with id:" +
          res.insertId +
          "\n"
      );
      // for (var i = 0; i < res.length; i++) {
      //   // console.log("- "+ res[i].department_name);
      //   depts.push(res[i].department_name);
      // }
      // whichDept(depts);
      if (nextFunc) {
        if (params) nextFunc(params);
        else nextFunc();
      }
    }
  );
} // queryProductCreate

function queryReport(query, nextFunc, params) {
  var p = {};
  products.emptyList();
  var query = connection.query(
    query,
    // "SELECT item_id, product_name, department_name, price, stock_quantity," +
    //   "stock_limit, restock_quanity, stock_sold, gross_revenue FROM products where stock_quantity <= restock_quanity",
    [],
    function(err, res) {
      var pad="                      "
      if (err) throw err;
      console.log(
        ("Department Name" + pad).slice(0,30) +
          ("Over head costs" + pad).slice(0,18) +
          ("Product sales" + pad).slice(0,18) +
          ("Total profit" +pad).slice(0,18) 
      );
      console.log(
        ("---------------" + pad).slice(0,30) +
          ("---------------" + pad).slice(0,18) +
          ("-------------" + pad).slice(0,18) +
          ("------------" +pad).slice(0,18) 
      );
      for (var i = 0; i < res.length; i++) {
       console.log(
          (res[i].department_name + pad).slice(0,30) +
          ("$"+res[i].over_head_costs.toFixed(2) + pad).slice(0,18) +
          ("$"+res[i].product_sales.toFixed(2) + pad).slice(0,18) +
          ("$"+res[i].total_profit.toFixed(2) +pad).slice(0,18) 
        );
      }
      if (nextFunc){
        if (params){
          nextFunc(params);
        } else {
          nextFunc();
        }
      }
    }
  );
} // queryReport


// function which prompts the user for what action they should take
function XXXwhichDept(depts) {
  var dept = "";
  inquirer
    .prompt({
      name: "dept",
      type: "checkbox",
      message: "What deparment(s) would like to see?",
      choices: depts
    })
    .then(function(answer) {
      dept = answer.dept;
      console.log(dept + " -- Okay ...\n");
      queryDeptProducts(dept);
    });
} //whichDept

function whichDept(depts, nextFunc) {
  var dept = "";
  inquirer
    .prompt({
      name: "dept",
      type: "list",
      message: products.managerMode
        ? "What deparment would like to manage?"
        : "What deparment would like to shop?",
      choices: depts
    })
    .then(function(answer) {
      dept = answer.dept;
      console.log(dept + " -- Okay ...\n");
      if (nextFunc) {
        nextFunc(dept);
      } else {
        queryDeptProducts(dept);
      }
    });
} //whichDept

// function which prompts the user for what action they should take
function whichProduct(products) {
  // var productChoice = "";
  var question = products.productQuestion();
  var header = products.showHeader();
  inquirer
    .prompt([
      {
        name: "product",
        type: "list",
        pageSize: products.length,
        message: question + header,
        // + "Product,                           ".slice(0,30) + " Price,       ".slice(0,11)
        // + " Stock,     ",
        choices: products.productDisplayList()
      },
      {
        name: "qty",
        type: "input",
        message: products.managerMode
          ? "How many would like to add to stock? "
          : "How many would like buy?", //+ products[Prod.getIdFromAns(product)].qty,
        validate: function(value) {
          // var pass = value.match(
          //   /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
          // );
          if (parseInt(value) > -1) {
            return true;
          }

          return "Please enter a valid number";
        }
      }
    ])
    .then(function(answer) {
      //product = answer.product;
      console.log(answer.product);
      console.log(answer.qty);
      var item_id = products.getIdFromAns(answer.product);
      var index = products.myFindIndexById(item_id);
      // out of stock? then choose different product
      if (products.managerMode) {
        products.list[index].restockItem(answer.qty);
        console.log("Updated");
        queryProductUpdate(products.list[index]);
        actionPrompt();
      } else {
        if (products.list[index].qty < parseInt(answer.qty)) {
          console.log(
            "Sorry, There is only " + products.list[index].qty + " in stock \n"
          );
          //changeQtyPrompt(products, index, qty);
          whichProduct(products);
        }
        // choose zero qty then query for new product categoty
        else if (parseInt(answer.qty) === 0) {
          console.log("Okay. nothing purchased");
          console.log("Lets try again\n");
          // while (products.length) {
          //   products.pop();
          // }
          // products = [];
          queryCategories();
        } else {
          // deduct qty from stock - then choose new category;
          console.log("Purchased:");
          var total = products.list[index].sellItem(parseInt(answer.qty));

          console.log(
            "  Qty " +
              answer.qty +
              ") '" +
              products.list[index].name +
              "' at $" +
              products.list[index].price.toFixed(2) +
              " each"
          );
          console.log("  Total: $" + total.toFixed(2) + "\n\n");
          queryProductUpdate(products.list[index]);

          queryCategories();
        }
      }
    });
} //whichProduct

function promptAddDept() {
  var dept = "";
  inquirer
    .prompt([
      {
        name: "dept",
        type: "text",
        message: "What is the name of the new department?",
        validate: function(value) {
          if (value) {
            return true;
          }
          return "Please enter a valid name";
        }
      }
    ])
    .then(function(answer) {
      dept = answer.dept;

      // based on their answer, either call the bid or the post functions
      // if (answer.postOrBid.toUpperCase() === "POST") {
      //   postAuction();
      // }
      // else {
      //   bidAuction();
      // }
    });
} //changeQtyPrompt

function queryLowStock() {
  var query =
    "SELECT item_id, product_name, department_name, price, stock_quantity," +
    "stock_limit, restock_quanity, stock_sold, gross_revenue FROM products where stock_quantity <= restock_quanity";
  console.log("Low Stock ...");
  queryProducts(query, displayProducts);
} // queryLowStock

function displayProducts(products) {
  if (products.list.length) {
    console.log(products.showHeader());
    for (let i = 0; i < products.list.length; i++) {
      const p = products.list[i];
      console.log("  " + p.showItem());
    }
  } else {
    console.log("No products found");
  }
  actionPrompt();
} // displayProducts

function promptAddProduct(dept, choices) {
  var c_default = {};
  if (choices) {
    c_default = choices;
  } else {
    var c_defaults = {
      product: "",
      dept: dept,
      price: "",
      qty: 1,
      maxQty: 1,
      restockQty: 0
    };
  }

  inquirer
    .prompt([
      {
        name: "name",
        type: "text",
        //pageSize: products.length,
        message: "Enter product name:",
        default: c_defaults.name
      },
      {
        name: "qty",
        type: "input",
        message: "Enter the stock quantity:", //+ products[Prod.getIdFromAns(product)].qty,
        validate: function(value) {
          if (parseInt(value) > -1) {
            return true;
          }
          return "Please enter a valid number";
        }
      },
      {
        name: "price",
        type: "input",
        message: "Enter the product price:", //+ products[Prod.getIdFromAns(product)].qty,
        validate: function(value) {
          if (parseFloat(value) > 0) {
            return true;
          }
          return "Please enter a valid number";
        }
      },
      {
        name: "maxQty",
        type: "input",
        message: "Enter the maximum quanity to be in stock :", //+ products[Prod.getIdFromAns(product)].qty,
        validate: function(value) {
          if (parseInt(value) > -1) {
            return true;
          }
          return "Please enter a valid number";
        }
      },
      {
        name: "restockQty",
        type: "input",
        message: "Enter the minimum quanity in stock to trigger a restock:", //+ products[Prod.getIdFromAns(product)].qty,
        validate: function(value) {
          if (parseInt(value) > -1) {
            return true;
          }
          return "Please enter a valid number";
        }
      }
    ])
    .then(function(answer) {
      //product = answer.product;
      console.log(answer);
      //console.log(answer.qty);
      var p = new Product(
        0, //id,
        answer.name,
        dept,
        answer.price,
        answer.qty,
        answer.maxQty,
        answer.restockQty,
        0, // qtySold,
        0 //grossRevenue
      );
      queryProductCreate(p, actionPrompt);
    });
} //promptAddProduct


var query = "select department_name, "  
+ " sum(stock_quantity * price) as over_head_costs,"  
+ " sum(gross_revenue) as product_sales,"  
+ " sum(gross_revenue) - sum(stock_quantity * price) as total_profit"
+ " from products"
+ " group by department_name";

