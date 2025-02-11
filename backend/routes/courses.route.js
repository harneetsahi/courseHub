import { Router } from "express";
import auth from "../middleware/userAuth.js";

import {
  purchaseCourse,
  viewAllCourses,
} from "../controllers/courses.controller.js";

const courseRouter = Router();

courseRouter.route("/purchase").post(purchaseCourse);

courseRouter.route("/courses").get(viewAllCourses);

///////////

export default courseRouter;
