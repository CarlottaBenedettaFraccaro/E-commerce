import orderController from "../controllers/orderController.js";
import generateErrorsUtils from "../utils/generateErrorsUtils.js";

const orderViewFinalController = async (req, res, next) => {
  try {
    const { userId } = req.user;

    // Verificar que el usuario tenga permisos para ver su propio carrito
    /*if (userId != req.user.id) {
      throw generateErrorsUtils(
        "Usuario no autorizado para esta operación",
        403
      );
    }*/

    // Obtener el carrito del usuario
    const cart = await orderController.getOrderByUserId(userId);

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({
        message: "Carrito vacío o no encontrado",
        cart: [],
      });
    }

    // Calcular subtotal y total del carrito
    let total = 0;
    const items = cart.items.map((item) => {
      const subtotal = item.quantity * item.product.price;
      total += subtotal;

      return {
        productId: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        subtotal,
      };
    });

    res.send({
      status: "ok",
      message: "Procede al pago",
      cart: {
        items,
        total,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default orderViewFinalController;
