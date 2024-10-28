import generateErrorsUtils from "../utils/generateErrorsUtils.js";
import selectUserByIdService from "sevices/users/selectUserByIdService.js";
import bcrypt from "bcrypt";

const editUserPasswordController = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    // Buscar al usuario
    const user = await selectUserByIdService(userId);
    if (!user) {
      throw generateErrorsUtils("Usuario no encontrado", 404);
    }

    // Verificar la contraseña anterior
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      throw generateErrorsUtils("Contraseña incorrecta", 400);
    }

    // Encriptar la nueva contraseña
    const hashPassword = await bcrypt.hash(newPassword, 10);

    // Guardar los cambios
    await pool.query(
      `
          UPDATE users
          SET password=?
          WHERE id=?
      `,
      [hashPassword]
    );

    res.send({
      status: "ok",
      message: "contraseña actualizada",
    });
  } catch (error) {
    next(error);
  }
};

export default editUserPasswordController;
