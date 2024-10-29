import cartController from "../controllers/cartController.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

// Controlador para modificar la cantidad de productos en el carrito
const cartModifyProductController = async (req, res, next) => {
    try {
        // En req.param pedidoID, productID
        // usuario lo del token
        //PATCH "/orders/:orderID/productSize/:productSizeId"
        const { orderId, productSizeId } = req.params; // Obtener userId y productId desde los parámetros
        const { quantity } = req.body; // Cantidad que se quiere agregar o quitar
  
        // 0 comprobar que el pedido/carrito (orders) exista
          // query al DB para comprobar que exista el pedido (SELECT user_id)
          // En order guardo el resultado de la select 
          let order;
        
        // 1 tengo que ver si req.user.id es igual a orders.user_id
        if (order.userId !== req.user.id) {
            throw generateErrorsUtils('Usuario no autorizado para esta operación', 403);
        }

        // 2 busco el producto en el pedido (product_orders)
        // SELECT amount
        // FROM product_order
        // WHERE order_id = orderId AND product_size_id = productSizeId
        let product;
        if (!product) {
          throw generateErrorsUtils('Producto no encontrado en el carrito', 404);
      }  //falta crear y definir cartController 



        if (quantity > product.amount){
          // 3 comprobar stock
          // query a product_size para sacar el stock de product.id
          if(stock < (quantity - product.amount) ){
            //Error no tengo stock
            throw generateErrorsUtils('Cantidad solicitada supera el stock disponible', 409);
          }
        }

        // 4 actualizar la cantidad en el carrito
        //UPDATE amount con quantity en product_order para orderId

        // 5 Actualizar el stock
        // update en product_size del stock

        res.send({
            status: 'ok',
            message: 'Carrito actualizado correctamente',
            data: {
              quantity
            },
        });
        
    } catch (error) {
        next(error);
    }
};

export default cartModifyProductController;
