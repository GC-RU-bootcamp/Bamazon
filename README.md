# Bamazon
Bamazon an Amazon-like storefront using Node.js, Inquirer.js CLI  and  MySQL . The app takes in orders from customers and deplete stock from the store's inventory. It also tracks product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.

This application demonstrates the use of: 
* Object constructors
* Function passing
* inquirer.js  - prompting for user input
* mysql.js - for accessing and updating a MySQL database.
* dotenv.js - for configuring the database connection parameters. This been successfully tested to a MySQL instance deployed on AWS RDS. 

The database is called  **bamazon**
* The database definition is defined in **banazonDB.sql**
* The database seed data is defined in **banazonSeed.sql**

There are three .JS files that define three access modes:
* Customer access via: **node bamazonCustomer.js**
* Manager access via: **node bamazonManager.js**
* Customer access via: **node bamazonSupervisor.js**
* NOTE: **the 3 .js files all contain the SAME** code (duplicates of each other). The code determines the mode by the name of the .js file. Defaults to customer mode. Alternatives could have been via a prompt or an additional startup parameter. This application was created to strictly follow the assignment specifications.

h4 Customer mode:
 **node bamazonCustomer.js** has the following feature:
* Shop/browse by one or more departments then
* Choose a product from a list. (a quantity column is shown for demonstration purposes) then
* Purchase 'N' quantity of the chosen product. The system decrements the stock quantity and updates purchase stats 
[Customer CLI Demo](recordings/bamzonCustomer.gif)

Manager mode: **node bamazonManager.js** has the following features:
* "View Products for Sale",
* "View Low Inventory",
* "Add to Inventory",
* "Add New Product"

Supervisor mode: **node bamazonSupervisor.js** has the following features:
* "View Product Sales by Department",
* "Create New Department",
* Also included all the features of Manager Mode. (Useful for demonstrating the supervisor mode features without the need to start Manager Mode)

Notes: While the application was created in a way to easily add additional features. Such as edit any of the product fields or restock in mass. This application can use the following improvements 1. Support for database concurrency control 2. Improved prompting and navigation such as going to previous prompt and exiting. 



