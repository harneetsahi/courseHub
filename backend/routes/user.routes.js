import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  userSignup,
  userLogin,
  userLogout,
  purchaseCourse,
  viewPurchasedCourses,
  viewAllCourses,
} from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.route("/signup").post(userSignup);

userRouter.route("/login").post(userLogin);

userRouter.route("/logout").post(userLogout);

userRouter.route("/purchase").post(auth, purchaseCourse);

userRouter.route("/viewpurchased").post(auth, viewPurchasedCourses);

userRouter.route("/viewall").get(auth, viewAllCourses);

export default userRouter;
