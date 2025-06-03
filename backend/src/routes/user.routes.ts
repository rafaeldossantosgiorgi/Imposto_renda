import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/auth";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/register", userController.register.bind(userController));
userRouter.post("/login", userController.login.bind(userController));
userRouter.get("/profile", authMiddleware, userController.profile.bind(userController));

export { userRouter };