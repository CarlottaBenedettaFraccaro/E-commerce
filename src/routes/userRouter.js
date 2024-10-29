import express from "express";

import editUserPasswordController from "../controllers/EditUserPasswordController";
import registerUserController from "../controllers/users/registerUserController";
import validaterUserController from "../controllers/users/validaterUserController";
import sendRecoverPassController from "../controllers/users/sendRecoverPassController";
import loginUserController from "../controllers/users/loginUserController";
import newProductController from '../controllers/newProductController';

const userRouter = express.Router();

userRouter.post("/users/password", editUserPasswordController);
userRouter.post("/users/register", registerUserController);
userRouter.post("/users/validater", validaterUserController);
userRouter.post("/users/recover_password", sendRecoverPassController);
userRouter.post("/users/login", loginUserController);
//userRouter.post("/users/password", editUserPasswordController);
userRouter.post('/newproduct', authUser, adminUser, newProductController) 

export default userRouter;
