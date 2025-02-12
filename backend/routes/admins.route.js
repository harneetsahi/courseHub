import { Router } from "express";
import adminAuth from "../middleware/adminAuth.js";

import {
  adminSignup,
  adminLogin,
  adminLogout,
  createCourse,
  deleteCourse,
  editCourse,
  allCourses,
} from "../controllers/admins.controller.js";

const adminRouter = Router();

adminRouter.route("/signup").post(adminSignup);

adminRouter.route("/login").post(adminLogin);

adminRouter.route("/logout").post(adminLogout);

////!SECTION

adminRouter.use(adminAuth); /// authenticate admin for all following functions

adminRouter.route("/course").post(createCourse);

adminRouter.route("/course").delete(deleteCourse);

adminRouter.route("/course").put(editCourse);

adminRouter.route("/course/all").get(allCourses);

export default adminRouter;
