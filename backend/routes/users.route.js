import { Router } from "express";
import userAuth from "../middleware/userAuth.js";

import {
  userSignup,
  userLogin,
  userLogout,
  purchaseCourse,
  purchases,
} from "../controllers/users.controller.js";

const userRouter = Router();

// userRouter.route("/signup").post(userSignup);
userRouter.route("/signup").post(userSignup);

userRouter.route("/login").post(userLogin);

userRouter.route("/logout").post(userLogout);

userRouter.use(userAuth); /// authenticate user for all following functions

userRouter.route("/purchase").post(purchaseCourse);

userRouter.route("/allpurchases").get(purchases);

export default userRouter;
