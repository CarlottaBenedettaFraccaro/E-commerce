import cartController from "../controllers/cartController.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

// Controlador para modificar la cantidad de productos en el carrito
const cartModifyProductController = async (req, res, next) => {
  try {
    const { userId, productId } = req.params; // Obtener userId y productId desde los parámetros
    const { quantity } = req.body; // Cantidad que se quiere agregar o quitar

    /* Verificar que el usuario tenga permisos para modificar su propio carrito
        if (userId != req.user.id) {
            throw generateErrorsUtils('Usuario no autorizado para esta operación', 403);
        } */

    // Verificar que el productId y quantity sean válidos
    // if (!productId || !quantity || quantity <= 0 ) {
    //     throw generateErrorsUtils('Parámetros inválidos', 400);
    // }

    // Obtener el carrito y verificar la cantidad actual y el stock
    const cart = await cartController.getCartByUserId(userId);
    const productInCart = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!productInCart) {
      throw generateErrorsUtils("Producto no encontrado en el carrito", 404);
    }

    // Verificar stock del producto
    const stockAvailable = req.product.stock;
    if (quantity > stockAvailable) {
      throw generateErrorsUtils(
        "Cantidad solicitada supera el stock disponible",
        409
      );
    }

    // Actualizar la cantidad del producto en el carrito
    productInCart.quantity = quantity;
    await cartController.updateCart(cart);

    res.send({
      status: "ok",
      message: "Carrito actualizado correctamente",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

export default cartModifyProductController;
