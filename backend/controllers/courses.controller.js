import { CourseModel } from "../models/courses.model.js";

const viewAllCourses = async (req, res) => {
  try {
    const courses = await CourseModel.find({});

    console.log(courses);

    res.json({
      message: "All the courses",
      content: courses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch all the coursess",
    });
  }
};

////////////////////

export { viewAllCourses };
