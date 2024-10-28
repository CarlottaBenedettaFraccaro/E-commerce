import cartController from cartController.js //aquí hay que importar desde el archivo creado por Alex
import generateErrorsUtils from generateErrorsUtils.js

const removeFromCart = async (req, res, next) => {
    const { userId, productId } = req.params;

    try {
        // Obtener el carrito del usuario
        const cart = await cartController.findOne({ user: userId });
        
        if (!cart) {
            throw generateErrorsUtils('Carrito no encontrado', 404);
        }

        // Verificar si el producto estaba en el carrito
        if (newItems.length === cart.items.length) {
            throw generateErrorsUtils('Producto no encontrado en el carrito', 404);
        }

        /* Actualizar el carrito con los nuevos productos
        cart.items = newItems;
        await cart.save(); */

        res.status(200).json({ message: 'Producto eliminado del carrito', cart });
    } catch (error) {
        next(error);
    }
}; 

export default removeFromCart; 
