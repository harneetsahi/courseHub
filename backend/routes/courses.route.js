import { Router } from "express";
import auth from "../middleware/userAuth.js";

import { viewAllCourses } from "../controllers/courses.controller.js";

const courseRouter = Router();

courseRouter.route("/").get(viewAllCourses);

///////////

export default courseRouter;
