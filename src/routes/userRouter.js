import express from "express";

import editUserPasswordController from "../controllers/editUserPasswordController";
import cartAddProductController from "../controllers/cartAddProductController";

const userRouter = express.Router();

userRouter.post("/users/password", editUserPasswordController);
userRouter.post('/cart', cartAddProductController);

export default userRouter;
