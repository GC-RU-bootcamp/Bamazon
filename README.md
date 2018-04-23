# Bamazon
Bamazon an Amazon-like storefront using Node.js, Inquirer.js CLI  and  MySQL . The app takes in orders from customers and deplete stock from the store's inventory. It aslo tracks product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.

This application demonstrates the use of: 
* Object constructors
* Function passing
* inquirer.js  - prompting for user input
* mysql.js - for accessing and updating a MySQL database.
* dotenv.js - for configuring the database connction parameters. This been sucessfuly tested to a MySQL instance deployed on AWS RDS. 

The database is called  **bamazon**
* The database defination is defined in **banazonDB.sql**
* The database seed data is defined in **banazonSeed.sql**

There are three .JS files that define three access modes:
* Customer access via: **node bamazonCustomer.js**
* Manager access via: **node bamazonManager.js**
* Customer access via: **node bamazonSupervisor.js**
* NOTE: **the 3 .js files all contain the SAME** code (duplicates of each other). The code determines the mode by the name of the .js file. Defaults to customer mode. Alternatives could have been via a prompt or an additional startup parameter. This application was created to strictly follow the assignment specifications.

Customer mode: **node bamazonCustomer.js** has the following feature:
* Shop/browse by one or more departments then
* Choose a product from a list. (qty is shown for debugging purposes) then
* Purchase 'N' quanity of the chosen product. The system decrements the stock qty and updates purchase stats 

Manager mode: **node bamazonManager.js** has the following features:
* "View Products for Sale",
* "View Low Inventory",
* "Add to Inventory",
* "Add New Product"

Supervisor mode: **node bamazonSupervisor.js** has the following features:
* "View Product Sales by Department",
* "Create New Department",
* All the features of Manager mode. (useful for debugging the supervisor mode features)

Notes: While the application was created a way to easlily add additional features. This application can use the following improvements 1. support for database concurrency control 2. improved promting 


