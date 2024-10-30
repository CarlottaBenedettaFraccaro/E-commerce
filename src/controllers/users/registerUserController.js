import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import insertUserServices from "../../services/users/insertUserServices.js";
import randomString from "randomstring";

const registerUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw generateErrorsUtils("Se esperaba email o contraseña", 400);

    const registrationCode = randomString.generate(15);

    await insertUserServices(email, password, registrationCode);

    res.send({
      status: "ok",
      message:
        "Usuario registrado. Verifique su cuenta mediante el email recibido",
    });
  } catch (error) {
    next(error);
  }
};

export default registerUserController;
