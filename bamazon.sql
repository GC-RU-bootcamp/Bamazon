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
  PRIMARY KEY (item_id)
);

insert into products 
(product_name, department_name, price,stock_quantity)
values 
("Disk drive", "Computers & Accessories", 49.99, 20 ),
("Laptop", "Computers & Accessories", 999, 12 ),
("Desktop", "Computers & Accessories", 759, 14 ),
("Monitor", "Computers & Accessories", 231, 22 ),
("Router", "Computers & Accessories", 170, 7 ),
("27in TV", "Home Entertainment", 175, 7 ),
("32in TV", "Home Entertainment", 253, 8 ),
("47in TV", "Home Entertainment", 310, 4 ),
("55in TV", "Home Entertainment", 709, 14 ),
("65in TV", "Home Entertainment", 899, 4 ),
("70in TV", "Home Entertainment", 1245, 2 ),
("DVD player", "Home Entertainment", 36, 3 ),
("HDMI cable", "Home Entertainment", 12, 35 ),
("Surround sound", "Home Entertainment", 368, 7 ),
("4K Ultra HD TVs", "Home Entertainment", 843, 7 ),
("Smart TVs", "Home Entertainment", 725, 18 ),
("Curved TVs", "Home Entertainment", 733, 2 ),
("LED & LCD TVs", "Home Entertainment", 450, 14 ),
("OLED TVs", "Home Entertainment", 860, 5 ),
("Blu-ray players", "Home Entertainment", 45, 4 ),
("Streaming Media Players", "Home Entertainment", 75, 6 ),
("Home Theater Projectors", "Home Entertainment", 351, 3 ),
("Sound Bars", "Home Entertainment", 223, 6 ),
("Audio & Video Accessories.", "Home Entertainment", 16, 25 ),
("Camera", "Photography & Videography", 154.88, 7 ),
("Lens", "Photography & Videography", 53.1, 5 ),
("Memory", "Photography & Videography", 19.75, 32 ),
("cable", "Photography & Videography", 14.99, 43 ),
("battery", "Photography & Videography", 4.99, 14 ),
("digital SLR", "Photography & Videography", 254.88, 5 ),
("mirrorless camera", "Photography & Videography", 310.22, 2 ),
("wide angle lenses", "Photography & Videography", 57.99, 3 ),
("drone", "Photography & Videography", 75.99, 14 ),
("sports & action camera", "Photography & Videography", 106.55, 3 ),
("Security camera", "Photography & Videography", 305.79, 4 ),
("Nikon", "Photography & Videography", 446.9, 5 ),
("Sony", "Photography & Videography", 152, 2 ),
("Olympus", "Photography & Videography", 75.99, 4 ),
("GoPro", "Photography & Videography", 94.77, 15 ),
("Fujifilm", "Photography & Videography", 43.66, 2 ),
("Canon", "Photography & Videography", 57.88, 3 )
;

select * from products;


