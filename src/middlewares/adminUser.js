import generateErrorsUtils from "../utils/generateErrorsUtils.js";

const adminUser = async (req, next) => {
  if (req.user.role !== "admin") {
    throw generateErrorsUtils("acceso denegado", 401);
  }
  next();
};

export default adminUser;
