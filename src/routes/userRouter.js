import express from "express";

import editUserPasswordController from "../controllers/EditUserPasswordController";

const userRouter = express.Router();

userRouter.post("/users/password", editUserPasswordController);

export default userRouter;
