import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../utils/generateErrorsUtils.js";

const adminUser = async (req, res, next) => {
  const pool = await getPool();
  const userId = req.user.id;

  const query = "SELECT role FROM users WHERE id = ?";
  pool.query(query, [userId], (err, results) => {
    if (err) {
      throw generateErrorsUtils("error de servidor", 500);
    }

    if (results.length === 0 || results[0].role !== "admin") {
      throw generateErrorsUtils("acceso denegado", 403);
    }

    next();
  });
};

export default adminUser;
