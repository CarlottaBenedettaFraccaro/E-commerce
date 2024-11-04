import createProductService from "../../services/products/createProductService.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const newProductController = async (req, res, next) => {
  try {
    const { product_name, product_description, size, prize } = req.body;

    await createProductService({
      product_name,
      product_description,
      size,
      prize,
    });

    res.status(201).json({
      status: "ok",
      data: "Producto y tamaño añadidos a la base de datos",
    });
  } catch (err) {
    console.error("Error en el controlador:", err);
    next(err);
  }
};

export default newProductController;
