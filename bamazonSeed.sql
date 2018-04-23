truncate table products;

insert into products 
(product_name, department_name, price,stock_quantity, stock_limit, restock_quanity, stock_sold, gross_revenue)
values 
("Disk drive", "Computers & Accessories", 49.99, 20, 20, 5, 0, 0 ),
("Laptop", "Computers & Accessories", 999, 12, 12, 5, 0, 0 ),
("Desktop", "Computers & Accessories", 759, 14, 14, 5, 0, 0 ),
("Monitor", "Computers & Accessories", 231, 22, 22, 5, 0, 0 ),
("Router", "Computers & Accessories", 170, 7, 7, 2, 0, 0 ),
("27in TV", "Home Entertainment", 175, 7, 7, 2, 0, 0 ),
("32in TV", "Home Entertainment", 253, 8, 8, 2, 0, 0 ),
("47in TV", "Home Entertainment", 310, 4, 4, 2, 0, 0 ),
("55in TV", "Home Entertainment", 709, 14, 14, 7, 0, 0 ),
("65in TV", "Home Entertainment", 899, 4, 4, 2, 0, 0 ),
("70in TV", "Home Entertainment", 1245, 2, 2, 2, 0, 0 ),
("DVD player", "Home Entertainment", 36, 3, 3, 1, 0, 0 ),
("HDMI cable", "Home Entertainment", 12, 35, 35, 10, 0, 0 ),
("Surround sound", "Home Entertainment", 368, 7, 7, 2, 0, 0 ),
("4K Ultra HD TV", "Home Entertainment", 843, 7, 7, 2, 0, 0 ),
("Smart TV", "Home Entertainment", 725, 18, 18, 13, 0, 0 ),
("Curved TV", "Home Entertainment", 733, 2, 2, 1, 0, 0 ),
("LED & LCD TV", "Home Entertainment", 450, 14, 14, 9, 0, 0 ),
("OLED TV", "Home Entertainment", 860, 5, 5, 0, 0, 0 ),
("Blu-ray player", "Home Entertainment", 45, 4, 4, 1, 0, 0 ),
("Streaming Media Player", "Home Entertainment", 75, 6, 6, 1, 0, 0 ),
("Home Theater Projector", "Home Entertainment", 351, 3, 3, 0, 0, 0 ),
("Sound Bar", "Home Entertainment", 223, 6, 6, 1, 0, 0 ),
("Video cable", "Home Entertainment", 16, 25, 25, 20, 0, 0 ),
("Camera", "Photography & Videography", 154.88, 7, 7, 2, 0, 0 ),
("Lens", "Photography & Videography", 53.1, 5, 5, 0, 0, 0 ),
("Memory", "Photography & Videography", 19.75, 32, 32, 10, 0, 0 ),
("cable", "Photography & Videography", 14.99, 43, 43, 10, 0, 0 ),
("battery", "Photography & Videography", 4.99, 14, 14, 9, 0, 0 ),
("digital SLR", "Photography & Videography", 254.88, 5, 5, 0, 0, 0 ),
("mirrorless camera", "Photography & Videography", 310.22, 2, 2, 1, 0, 0 ),
("wide angle lenses", "Photography & Videography", 57.99, 3, 3, 1, 0, 0 ),
("drone", "Photography & Videography", 75.99, 14, 14, 9, 0, 0 ),
("sports & action camera", "Photography & Videography", 106.55, 3, 3, 1, 0, 0 ),
("Security camera", "Photography & Videography", 305.79, 4, 4, 1, 0, 0 ),
("Nikon", "Photography & Videography", 446.9, 5, 5, 0, 0, 0 ),
("Sony", "Photography & Videography", 152, 2, 2, 1, 0, 0 ),
("Olympus", "Photography & Videography", 75.99, 4, 4, 1, 0, 0 ),
("GoPro", "Photography & Videography", 94.77, 15, 15, 10, 0, 0 ),
("Fujifilm", "Photography & Videography", 43.66, 2, 2, 1, 0, 0 ),
("Canon", "Photography & Videography", 57.88, 3, 3, 1, 0, 0 )

;

select * from products;


SELECT item_id, product_name, price FROM products WHERE department_name = "Photography & Videography";

