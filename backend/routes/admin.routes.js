import { Router } from "express";
import auth from "../middleware/auth.js";

import {
  adminSignup,
  adminLogin,
  adminLogout,
  createCourse,
  deleteCourse,
  editCourse,
} from "../controllers/admins.controller.js";

const adminRouter = Router();

adminRouter.route("/signup").post(adminSignup);

adminRouter.route("/login").post(adminLogin);

adminRouter.route("/logout").post(adminLogout);

adminRouter.route("/create").post(auth, createCourse);

adminRouter.route("/delete").post(auth, deleteCourse);

adminRouter.route("/edit").post(auth, editCourse);

export default adminRouter;
