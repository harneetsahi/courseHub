import { Router } from "express";
import auth from "../middleware/auth.js";

import {
  purchaseCourse,
  viewPurchasedCourses,
  viewAllCourses,
  createCourse,
  deleteCourse,
  editCourse,
} from "../controllers/courses.controller.js";

const courseRouter = Router();

courseRouter.route("/purchase").post(auth, purchaseCourse);

courseRouter.route("/allpurchases").get(auth, viewPurchasedCourses);

courseRouter.route("/courses").get(auth, viewAllCourses);

///////////

courseRouter.route("/create").post(auth, createCourse);

courseRouter.route("/delete").post(auth, deleteCourse);

courseRouter.route("/edit").post(auth, editCourse);

export default courseRouter;
