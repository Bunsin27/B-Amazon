CREATE DATABASE B_Amazon_db;

USE B_Amazon_db;

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
	ProductName VARCHAR(100) NOT NULL,
	DepartmentName VARCHAR(100) NOT NULL,
	Price DECIMAL(10,2) default 0,
	StockQuantity INT default 0,
	PRIMARY KEY(id)
);

INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Halo reach', 'VideoGames', 9.99, 6);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Destiny2', 'videoGames', 89.95, 20);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Escape from Tarkov', 'VideoGames', 119, 10);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('GTFO', 'VideoGames', 19.95, 20);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Razer DeathAdder', 'Accessories', 89.90, 15);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('MadCatz Glide', 'Accessories', 20, 20);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Msi Geforce RTX 2070', 'Electronics', 599.99, 5);

CREATE TABLE departments (
	DepartmentId INT NOT NULL AUTO_INCREMENT,
	DepartmentName VARCHAR(100) NOT NULL,
	OverheadCost DECIMAL(10,2) NOT NULL,
	TotalSales DECIMAL(10,2),
	PRIMARY KEY(DepartmentId)
);

INSERT INTO departments(DepartmentName, OverheadCost) VALUES('VdeoGames', 500);
INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Electronics', 500);
INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Accessories', 500);