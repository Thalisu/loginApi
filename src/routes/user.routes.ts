import { Router } from "express";
import { UserControllers } from "../controllers/user.controllers";
import { verifyToken } from "../middleware/verifyToken.middleware";
import { container } from "tsyringe";
import { UserServices } from "../services/user.services";

const userRouter = Router();

container.registerSingleton("UserServices", UserServices);
const userControllers = container.resolve(UserControllers);

userRouter.post("/login", (req, res) => userControllers.login(req, res));
userRouter.post("/register", (req, res) => userControllers.register(req, res));
userRouter.get("/", verifyToken.execute, (req, res) =>
  userControllers.getUser(req, res)
);
userRouter.patch("/:id", verifyToken.execute, (req, res) =>
  userControllers.updateUser(req, res)
);
userRouter.patch("/password/:id", verifyToken.execute, (req, res) =>
  userControllers.updatePassword(req, res)
);
userRouter.delete("/:id", verifyToken.execute, (req, res) =>
  userControllers.delete(req, res)
);

export default userRouter;
