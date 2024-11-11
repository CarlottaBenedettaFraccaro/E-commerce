import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const rateProductService = async ({ rate }) => {
  const pool = await getPool();

  try {
    await pool.beginTransaction();

    const rateQuery = `
        rate ENUM('1', '2', '3', '4', '5'),
        coment VARCHAR(225),
        image MEDIUMBLOB,   
    `;
    await pool.query(rateQuery, [rate, coment, image]);

    await pool.commit();
  } catch (err) {
    await pool.rollback();
    console.error("Error al valorar producto", err);
    throw generateErrorsUtils("error al valorar producto", 500);
  }
};

export default rateProductService;
