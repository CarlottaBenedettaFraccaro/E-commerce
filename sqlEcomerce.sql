CREATE DATABASE ecomerce;

CREATE TABLE usuarios (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR (50) NOT NULL,

    apellidos VARCHAR(50) NOT NULL,

    telefono CHAR(9) NOT NULL,
    CHECK (telefono REGEXP '^[0-9]{9}$'),

    email VARCHAR(20) NOT NULL UNIQUE,

    password VARCHAR(50) NOT NULL,
    CHECK(CHAR_LENGTH (password)>=8),

    direccion_envio VARCHAR(100),
    
    administrador BOOLEAN default false

);

CREATE TABLE productos (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre_producto VARCHAR(50) NOT NULL,

    categoria VARCHAR(50) NOT NULL,

    modelo VARCHAR(50) NOT NULL,

    caracteristicas TEXT NOT NULL

);

CREATE TABLE compras (
	id INT AUTO_INCREMENT PRIMARY KEY,

	usuario_id INT,

    producto_id INT,

    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    cantidad SMALLINT default 1,
    CHECK (cantidad <= 20),
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),

    FOREIGN KEY (producto_id) REFERENCES productos(id)
    
);