import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const newProductController = async (req, res) => {
  const pool = await getPool();
  const { product_name, product_description, size, cost } = req.body;

  try {
    await pool.beginTransaction();

    const productsQuery = `
            INSERT INTO products (product_name, product_description)
            VALUES (?, ?)
        `;
    await pool.query(productsQuery, [product_name, product_description]);

    const productSizeQuery = `
            INSERT INTO product_size (size, cost)
            VALUES (?, ?)
        `;
    await pool.query(productSizeQuery, [size, cost]);

    await pool.commit();

    res.status(201).json({
      status: "ok",
      data: "Producto y tamaño añadidos a la base de datos",
    });
  } catch (err) {
    await pool.rollback();
    console.error("Error al realizar la transacción:", err);

    throw generateErrorsUtils("error al realizar la transacción", 500);
  }
};

export default newProductController;
