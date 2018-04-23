
DROP DATABASE IF EXISTS bamazon;

create database bamazon;

use bamazon;

create table products (
  item_id INT NOT NULL AUTO_INCREMENT,
   /*(unique id for each product)*/
  product_name VARCHAR(100) NOT NULL,
  /*--(Name of product)*/
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) not null,
  /*--(cost to customer)*/
  stock_quantity INT NOT NULL,
  /*--(how much of the product is available in stores)*/
  stock_limit INT NOT NULL,
  /*--(max amount of the product is available in stock)*/
  restock_quanity INT NOT NULL,
  /*--(min qty of the product when the product should be restocked*/
  stock_sold INT NOT NULL,
  /*--(quanity of the product sold)*/
  gross_revenue DECIMAL(10,2) not null,
  /*--(total $ amount of the product sold)*/
  PRIMARY KEY (item_id)
);



