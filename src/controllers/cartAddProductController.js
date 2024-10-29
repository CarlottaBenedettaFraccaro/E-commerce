const Cart = require("../models/Cart");

const cartAddProductController = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (cart) {
      // si el carrito ya existe, actualiza la cantidad o añade un nuevo item
      const itemIndex = cart.items.findIndex(
        (item) => item.productId == productId
      );

      if (itemIndex > -1) {
        // si roducto ya en el carrito, actualiza la cantidad
        let item = cart.items[itemIndex];
        item.quantity += quantity;
        cart.items[itemIndex] = item;
      } else {
        // Producto no está en el carrito, añádelo
        cart.items.push({ productId, quantity });
      }
    } else {
      // Crear un nuevo carrito para el usuario
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    }

    await cart.save();
    res.send({
      status: "ok",
      message: "añadido al carrito",
    });
  } catch (error) {
    next(error);
  }
};

export default cartAddProductController;
