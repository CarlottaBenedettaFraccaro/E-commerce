import getPool from "../database/getPool.js";
import generateErrorsUtils from "../utils/generateErrorsUtils.js";

const listCategoriesController = async (req, res) => {
  const pool = await getPool();
  const query = "SELECT * FROM category";

  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener las categorías:", err);
      throw generateErrorsUtils("error al obtener las categorias", 500);
    }

    res.status(200).json(results);
  });
};

export default listCategoriesController;
