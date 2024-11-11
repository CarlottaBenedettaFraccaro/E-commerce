import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const orderListService = async () => {
    const pool = await getPool();

    // Selecciona los pedidos, posiblemente uniéndolos a la tabla de usuarios o productos si necesitas más información
    const [orders] = await pool.query(
        "SELECT * FROM orders" // Adaptar según la estructura de la tabla y si necesita unirse a otras
    );

    if (!orders.length) {
        throw generateErrorsUtils('No se encontraron pedidos', 404);
    }

    return orders;
};

export default orderListService;