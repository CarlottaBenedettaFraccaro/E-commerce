import express from "express";
import registerUserController from "../controllers/users/registerUserController.js";
import loginUserController from "../controllers/users/loginUserController.js";
import validaterUserController from "../controllers/users/validaterUserController.js";
import authUser from "../middlewares/authUser.js";
import adminUser from "../middlewares/adminUser.js";
import sendRecoverPassController from "../controllers/users/sendRecoverPassController.js";
import newProductController from "../controllers/newProductController.js";
import editUserPasswordController from "../controllers/editUserPasswordController.js";
import listCategoriesController from '../controllers/listCategoriesController.js';

const userRouter = express.Router();

userRouter.post("/users/register", registerUserController);
userRouter.get('/users/validate/:registrationCode', validaterUserController);
userRouter.post("/users/login", loginUserController);

userRouter.put("/users/password", editUserPasswordController);
userRouter.post('/users/password/recover', sendRecoverPassController);

userRouter.post("/newproduct", authUser, adminUser, newProductController);
userRouter.get('/categories', listCategoriesController);


export default userRouter;
