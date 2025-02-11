import { Router } from "express";
import userAuth from "../middleware/userAuth.js";

import {
  userSignup,
  userLogin,
  userLogout,
  purchases,
} from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.route("/signup").post(userSignup);

userRouter.route("/login").post(userLogin);

userRouter.route("/logout").post(userLogout);

userRouter.use(userAuth);

userRouter.route("/allpurchases").get(purchases);

export default userRouter;
