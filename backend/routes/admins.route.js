import { Router } from "express";
import adminAuth from "../middleware/adminAuth.js";

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

////!SECTION

adminRouter.use(adminAuth);

adminRouter.route("/create").post(createCourse);

adminRouter.route("/delete").post(deleteCourse);

adminRouter.route("/edit").post(editCourse);

export default adminRouter;
