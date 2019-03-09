
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
id INT AUTO_INCREMENT,
name VARCHAR (100) NOT NULL,
descript VARCHAR (200) NOT NULL,
price FLOAT (3,2) Default 0,
quan INT (3) DEFAULT 0,
dept VARCHAR (20) NOT NULL,
PRIMARY KEY (id)
);


USE bamazon_db;
INSERT INTO products (name, descript, price, quan, dept )
VALUES ('Cards', ' Playing Cards', 1.99, 100, 'Games' );

INSERT INTO products (name, descript, price, quan, dept )
VALUES ('Checkers', 'Big Boy Checkers', 15, 50, 'Games' );

INSERT INTO products (name, descript, price, quan, dept )
VALUES ('Hose', '50 Foot Gargen  Hose', 25, 10, 'Gardning' );

INSERT INTO products (name, descript, price, quan, dept )
VALUES ('CD', 'Blank CD Pack of 50', 50, 50, 'Computers' );
