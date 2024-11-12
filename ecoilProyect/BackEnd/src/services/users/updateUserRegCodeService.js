import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const updateUserRegCodeService = async (registrationCode) => {

    const pool = await getPool();

    const [user] = await pool.query(
        `
            SELECT id FROM users WHERE registrationCode=?
        `,
        [registrationCode]
    );

    if(!user.length) throw generateErrorsUtils('No existe ese codigo de registro', 400);

    await pool.query(
        `
            UPDATE users
            SET active=true, registrationCode=null
            WHERE registrationCode=?
        `,
        [registrationCode]
    );
}

export default updateUserRegCodeService;