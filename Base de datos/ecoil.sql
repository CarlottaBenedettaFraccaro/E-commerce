DROP DATABASE IF EXISTS ecoil;
CREATE DATABASE ecoil;
USE ecoil;

CREATE TABLE telephone_prefix (
    id INT PRIMARY KEY AUTO_INCREMENT,
    country VARCHAR(50),
    prefix VARCHAR(5) NOT NULL
);

CREATE TABLE direction (
    id INT PRIMARY KEY AUTO_INCREMENT,
    country VARCHAR(50),
    city VARCHAR(50),
    PC VARCHAR(10), 
    direction VARCHAR(50),
    notes VARCHAR(225)
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    surname VARCHAR(50),
    telephone_prefix_id INT,
    telephone CHAR(9) NOT NULL,
    direction_id INT,
    email VARCHAR(50),

    password VARCHAR(300) NOT NULL CHECK (CHAR_LENGTH(password) BETWEEN 8 AND 300),
    role ENUM('admin', 'client') DEFAULT 'client',
    active BOOLEAN DEFAULT FALSE,
    registrationcode VARCHAR(50),
    recoverpasscode VARCHAR(50),
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modifiedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (telephone_prefix_id) REFERENCES telephone_prefix(id),
    FOREIGN KEY (direction_id) REFERENCES direction(id)
);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    outstanding BOOLEAN DEFAULT TRUE,
    desactivated BOOLEAN DEFAULT FALSE,
    product_name VARCHAR(50) NOT NULL,
    product_description VARCHAR(500) NOT NULL
);

CREATE TABLE product_size (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    size VARCHAR(50),
    stock INTEGER,
    price NUMERIC(10, 2),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE product_image (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_image_name VARCHAR(50),
    product_image MEDIUMBLOB,
    product_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id)
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

CREATE TABLE cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    direction_delivery_id INT,
    direction_billing_id INT,
    status ENUM('in progress', 'confirmed', 'fraude', 'cancelated', 'sent'),
    carrier_url VARCHAR(50),
    carrier_tracking_code VARCHAR(50),
    bill_file MEDIUMBLOB,
    cart_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cart_confirmation_date TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (direction_delivery_id) REFERENCES direction(id),
    FOREIGN KEY (direction_billing_id) REFERENCES direction(id)
);

CREATE TABLE product_cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_size_id INT,
    amount SMALLINT DEFAULT 1,
    cart_id INT,
    FOREIGN KEY (product_size_id) REFERENCES product_size(id),
    FOREIGN KEY (cart_id) REFERENCES cart(id)
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