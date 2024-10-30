import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import orderProductListCartService from "../../services/cart/orderProductListCartService.js";

const orderViewFinalController = async (req, res, next) => {
  try {
    const { userId } = req.user; // Asegúrate de que req.user sea donde obtienes el userId

    // Obtener el carrito del usuario
    const cart = await orderProductListCartService(userId);

    // Enviar respuesta con los detalles del carrito
    res.status(200).json({
      status: "ok",
      message: "Procede al pago",
      cart: {
        items,
        total,
      },
    });
  } catch (error) {
    next(generateErrorsUtils); // Pasar el error al middleware de manejo de errores
  }
};

export default orderViewFinalController;
