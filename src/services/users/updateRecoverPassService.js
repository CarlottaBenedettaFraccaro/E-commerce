import getPool from "../../database/getPool.js";
import sendMailUtils from "../../utils/sendMailUtils.js";

const updateRecoverPassService = async (email, recoverPassCode) => {
  const pool = await getPool();

  await pool.query(
    `
            UPDATE users
            SET recoverPassCode=?
            WHERE email=?
        `,
    [recoverPassCode, email]
  );

  const emailSubject = "Recuperación de contraseña de Ecoil";

  const emailBody = `
                <html>
                    <body>
                        <h2>Recuperación de contraseña para: ${email}</h2>
                        <p>
                            Se ha solicitado la recuperación de la contraseña de Ecoil.
                            Utiliza el siquiente código de recuperación para creaer una nueva contrasaeña:
                            Codigo de recuperación: ${recoverPassCode}
                        </p>
                        <p>
                            Si no ha sido usted, ignore este email
                        
                            Hecho con ❤ por el equipo de Ecoil.
                        </p>
                    </body>
                </html>
        `;

  await sendMailUtils(email, emailSubject, emailBody);
};

export default updateRecoverPassService;
