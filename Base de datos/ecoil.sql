SELECT * FROM ecoil.products;

USE ecoil;

INSERT INTO products (product_name, product_description)
VALUES ('AOVE Granada', 'Aceite de oliva virgen extra de nuestros proveedores granadinos de la mejor calidad, del olivar a tu mesa');

INSERT INTO product_size (product_id, size, cost)
VALUES (LAST_INSERT_ID(), '1 Litro', 14.99);
