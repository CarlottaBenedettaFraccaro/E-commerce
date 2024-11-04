import updatePasswordService from "../../services/users/updatePasswordService.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const editUserPasswordController = async (req, res, next) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    await updatePasswordService(userId, oldPassword, newPassword);

    res.send({
      status: "ok",
      message: "contraseña actualizada",
    });
  } catch (error) {
    throw generateErrorsUtils("error al actualizar la contraseña", 400);
  }
};

export default editUserPasswordController;
