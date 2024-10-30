import express from "express";
import authUser from "../middlewares/authUser.js";
import adminUser from "../middlewares/adminUser.js";
import editUserPasswordController from "../controllers/editUserPasswordController.js";
import registerUserController from "../controllers/users/registerUserController.js";
import validaterUserController from "../controllers/users/validaterUserController.js";
import sendRecoverPassController from "../controllers/users/sendRecoverPassController.js";
import loginUserController from "../controllers/users/loginUserController.js";
import newProductController from "../controllers/newProductController.js";
import listCategoriesController from '../controllers/listCategoriesController.js';

const userRouter = express.Router();

userRouter.post("/users/password", editUserPasswordController);
userRouter.post("/users/register", registerUserController);
userRouter.post("/users/validater", validaterUserController);
userRouter.post("/users/recover_password", sendRecoverPassController);
userRouter.post("/users/login", loginUserController);
//userRouter.post("/users/password", editUserPasswordController);
userRouter.post("/newproduct", authUser, adminUser, newProductController);
router.get('/categories', listCategoriesController);

export default userRouter;
