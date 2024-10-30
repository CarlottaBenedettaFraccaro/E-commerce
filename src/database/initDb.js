import mysql from "mysql2";
import getPool from "./getPool.js";

(async () => {
  const pool = getPool();

  try {
    const connection = await pool.getConnection();

    await connection.query("CREATE DATABASE IF NOT EXISTS ecoil");
    await connection.query("USE ecoil");

    // Crea las tablas
    await connection.query(
      `CREATE TABLE telephone_prefix (
        id INT PRIMARY KEY AUTO_INCREMENT,
        country VARCHAR(50),
        prefix VARCHAR(5) NOT NULL
    `
    );

    await connection.query(`
      CREATE TABLE direction (
        id INT PRIMARY KEY AUTO_INCREMENT,
        country VARCHAR(50),
        city VARCHAR(50),
        PC VARCHAR(10), 
        direction VARCHAR(50),
        notes VARCHAR(225)
    `);

    await connection.query(`
      CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(50),
        surname VARCHAR(50),
        telephone_prefix_id INT,
        telephone CHAR(9) NOT NULL,
        direction_id INT,
        email VARCHAR(50),
        password VARCHAR(20) NOT NULL CHECK (CHAR_LENGTH(password) BETWEEN 8 AND 20),
        role ENUM('admin', 'client'),
        active BOOLEAN DEFAULT FALSE,
        registrationcode VARCHAR(50),
        recoverpasscode VARCHAR(50),
        createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modifiedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (telephone_prefix_id) REFERENCES telephone_prefix(id),
        FOREIGN KEY (direction_id) REFERENCES direction(id)
    `);

    await connection.query(`
      CREATE TABLE products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        outstanding BOOLEAN DEFAULT TRUE,
        desactivated BOOLEAN DEFAULT FALSE,
        product_name VARCHAR(50) NOT NULL,
        product_description VARCHAR(500) NOT NULL
    `);

    await connection.query(`
     CREATE TABLE product_size (
        id INT PRIMARY KEY AUTO_INCREMENT,
        product_id INT,
        size VARCHAR(50),
        stock INTEGER,
        cost NUMERIC(10, 2),
        FOREIGN KEY (product_id) REFERENCES products(id)
    `);

    await connection.query(`
        CREATE TABLE photos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        photo_name VARCHAR(50),
        producto_id INT,
        FOREIGN KEY (producto_id) REFERENCES products(id)
    `);

    await connection.query(`
            CREATE TABLE category (
        id INT PRIMARY KEY AUTO_INCREMENT,
        categoryProd VARCHAR(50)
    `);

    await connection.query(`
            CREATE TABLE product_category (
        id INT PRIMARY KEY AUTO_INCREMENT,
        category_id INT,
        product_id INT,
        FOREIGN KEY (category_id) REFERENCES category(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    `);

    await connection.query(`
        CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    direction_delivery_id INT,
    direction_billing_id INT,
    status ENUM('in progress', 'confirmed', 'fraude', 'cancelated', 'sent'),
    carrier_url VARCHAR(50),
    carrier_tracking_code VARCHAR(50),
    bill_file MEDIUMBLOB,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    order_confirmation_date TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (direction_delivery_id) REFERENCES direction(id),
    FOREIGN KEY (direction_billing_id) REFERENCES direction(id))
        `);
    await connection.query(`
        CREATE TABLE product_order (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_size_id INT,
    amount SMALLINT DEFAULT 1,
    order_id INT,
    FOREIGN KEY (product_size_id) REFERENCES product_size(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
        `);

    await connection.query(`
        CREATE TABLE rating (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    rate ENUM('1', '2', '3', '4', '5'),
    coment VARCHAR(225),
    image MEDIUMBLOB,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
        `);

    console.log("Base de datos y tablas inicializadas correctamente");
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
  } finally {
    pool.end();
  }
})();
