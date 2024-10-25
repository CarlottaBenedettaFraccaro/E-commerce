CREATE DATABASE ecoil;

USE ecoil;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    surname VARCHAR(50),
	-- telephone_prefix_id INT DEFAULT SELECT (id FROM telephone_prefix WHERE prefix = '+34'), dejo comentado todo lo del prefijo porque es muy complicdo. 
    -- FOREIGN KEY (telephone_prefix_id) REFERENCES telephone_prefix(id)
    telephone CHAR(9) NOT NULL,
    CHECK (telephone REGEXP '^[0-9]{9}$'),
    email VARCHAR(50),
    password VARCHAR(20) CHECK (LENGTH(password) >= 8),
    role ENUM('admin', 'client'),
    active BOOLEAN DEFAULT FALSE,
    registrationcode VARCHAR(50),
    recoverpasscode VARCHAR(50),
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modifiedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- CREATE TABLE telephone_prefix (
   -- id INT PRIMARY KEY AUTO_INCREMENT,
   -- prefix VARCHAR(5) NOT NULL

-- );

CREATE TABLE direction (
    id INT PRIMARY KEY AUTO_INCREMENT,
    country VARCHAR(50),
    city VARCHAR(50),
    PC VARCHAR(10), 
    CHECK (PC REGEXP '^[0-9]{1,10}$'),
    direction VARCHAR(50),
    notes VARCHAR(225),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)

);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    outstanding BOOLEAN DEFAULT TRUE,
    desactivated BOOLEAN DEFAULT FALSE,
    product_name VARCHAR(50) NOT NULL,
    product_description VARCHAR(50) NOT NULL

);

CREATE TABLE product_size (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    size VARCHAR(50),
    stock INTEGER,
    cost NUMERIC(10, 2),
    FOREIGN KEY (product_id) REFERENCES products(id)

);

CREATE TABLE photos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    photo_name VARCHAR(50),
    producto_id INT,
    FOREIGN KEY (producto_id) REFERENCES products(id)

);

CREATE TABLE category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    categoryProd VARCHAR(50)

);

CREATE TABLE product_category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    product_id INT,
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (product_id) REFERENCES products(id)

);

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    direction_delivery_id INT,
    direction_billing_id INT,
    status VARCHAR(50) CHECK (status IN ('in progress', 'confirmed', 'fraude', 'cancelated', 'sent')),
    carrier_url VARCHAR(50),
    carrier_tracking_code VARCHAR(50),
    bill_file MEDIUMBLOB, -- Asumiendo que el archivo PDF se almacenará como un Binary Large Object de hasta 16Mb
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    order_confirmation_date TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (direction_delivery_id) REFERENCES direction(id),
    FOREIGN KEY (direction_billing_id) REFERENCES direction(id)

);

CREATE TABLE pedido_productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_size_id INT,
    amount SMALLINT DEFAULT 1,
    order_id INT,
    FOREIGN KEY (product_size_id) REFERENCES product_size(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)

);

CREATE TABLE rating (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    rate ENUM('1', '2', '3', '4', '5'),
    coment VARCHAR(225),
    image MEDIUMBLOB,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)

);