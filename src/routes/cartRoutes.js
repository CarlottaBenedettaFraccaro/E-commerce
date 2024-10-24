import express from "express";
import {
  getCartProducts,
  addProductToCart,
  updateProductInCart,
} from "../controllers/cartController.js";

const router = express.Router();

//endpoint para obtener todos los productos del carrito
router.get("/", getCartProducts);

//endpoint para añadir un producto al carrito
router.post("/", addProductToCart);

//endpoint para actualizar un producto en el carrito
router.put("/:id", updateProductInCart);

//endpoint para eliminar un producto del carrito
router.delete("/:id", deleteProductoFromCarrito);

export default router;
