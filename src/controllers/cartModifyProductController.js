// import oredrProductList from "../controllers/orderProuctList.js";
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
          //let order;

          const [order] = await db.query(
            "SELECT user_id AS userId FROM orders WHERE id = ?",
            [orderId]
        );

        if (!order) {
            throw generateErrorsUtils("Pedido no encontrado", 404);
        }
        
        // 1 tengo que ver si req.user.id es igual a orders.user_id
        if (order.userId !== req.user.id) {
            throw generateErrorsUtils('Usuario no autorizado para esta operación', 403);
        }

        // 2 busco el producto en el pedido (product_orders)
        // SELECT amount
        // FROM product_order
        // WHERE order_id = orderId AND product_size_id = productSizeId
        //let product;
         // Aquí seleccionamos la cantidad (amount) del producto en el carrito
         const [product] = await db.query(
          "SELECT amount FROM product_order WHERE order_id = ? AND product_size_id = ?",
          [orderId, productSizeId]
      );
        if (!product) {
          throw generateErrorsUtils('Producto no encontrado en el carrito', 404);
      }  //falta crear y definir cartController 


      // verificamos si la cantidad que el usuario quiere agregar (quantity) es mayor que la cantidad actual que tiene en el carrito (product.amount).
        if (quantity > product.amount){
          // 3 comprobar stock en DB
          // query a product_size para sacar el stock de product.id
          const [stockCheck] = await db.query(
            "SELECT stock FROM product_size WHERE id = ?",
            [productSizeId]
        );

        const stock = stockCheck ? stockCheck.stock : 0; //stockCheck contiene el resultado de la consulta;  si stockCheck tiene un valor (si encuentro el producto en la base de datos), se obtiene el stock. Si no se encontró, se asigna un valor de 0 a stock.

          if(stock < (quantity - product.amount) ){
            //Error no tengo stock
            throw generateErrorsUtils('Cantidad solicitada supera el stock disponible', 409);
          }
        }

        // 4 actualizar la cantidad en el carrito
        //UPDATE amount con quantity en product_order para orderId
        await db.query(
          "UPDATE product_order SET amount = ? WHERE order_id = ? AND product_size_id = ?",
          [quantity, orderId, productSizeId]
      );

        // 5 Actualizar el stock
        // update en product_size del stock
        await db.query(
          "UPDATE product_size SET stock = stock - ? WHERE id = ?",
          [quantity - product.amount, productSizeId]
      );

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
