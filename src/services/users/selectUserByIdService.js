<<<<<<< HEAD
import { generate } from "randomstring";
import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const selectUserByIdService = async (userId) => {
  const pool = await getPool();

  const [user] = await pool.query(
    `
        select id, email, firstName, lastName, avatar
        from users
        where id=?
        `,
    [userId]
  );

  if (!user.length) {
    throw generateErrorsUtils("el usuario no existe", 404);
  }

  return user[0];
};

export default selectUserByIdService;
=======
import { generate } from "randomstring";
import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const selectUserByIdService = async (userId) => {
  const pool = await getPool();

  const [user] = await pool.query(
    `
        select id, email, firstName, lastName, avatar
        from users
        where id=?
        `,
    [userId]
  );

  if (!user.length) {
    throw generateErrorsUtils("el usuario no existe", 404);
  }

  return user[0];
};

export default selectUserByIdService;
>>>>>>> b70d090309b7731c80490c532908229153c368de
