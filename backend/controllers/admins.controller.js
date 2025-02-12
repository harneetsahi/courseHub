import { AdminModel } from "../models/admins.model.js";
import jwt from "jsonwebtoken";
import { z } from "zod";
import bcrypt from "bcrypt";
import { CourseModel } from "../models/courses.model.js";

const adminSignup = async (req, res) => {
  // input validation

  const requiredBody = z.object({
    firstName: z.string().min(3).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .max(16)
      .refine(
        (value) =>
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d\s]).+$/.test(value),
        {
          message:
            "Password must be at least 8 characters long with max 15 characters and have at least one uppercase letter, one lowercase letter, one special character, and one digit.",
        }
      ),
  });

  const parsedData = requiredBody.safeParse(req.body);

  if (!parsedData.success) {
    return res.json({
      message: "Incorrect format",
      error: parsedData.error,
    });
  }

  ////!SECTION
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 8);

    console.log(hashedPassword);

    await AdminModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    console.log(firstName, lastName, email);

    res.json({
      message: "You are successfully signed up as an admin",
    });
  } catch (error) {
    res.status(400).json({
      message: "User already exists",
    });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AdminModel.findOne({ email });

    if (user) {
      const matchedPassword = await bcrypt.compare(password, user.password);

      if (matchedPassword) {
        const token = jwt.sign(
          { id: user._id },
          `${process.env.JWT_ADMIN_SECRET}`
        );
        return res.json({
          token,
        });
      } else {
        return res.status(401).json({
          message: "Incorrect credentials",
        });
      }
    } else {
      return res.status(401).json({
        message: "Account does not exist",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const adminLogout = async (req, res) => {};

///////////////////!SECTION

//
const courseInputValidation = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.number().min(0, { message: "Price must be a positive number" }),
  imageUrl: z.string().url({ message: "Image URL must be a valid URL" }),
});

//

const createCourse = async (req, res) => {
  const parsedData = courseInputValidation.safeParse(req.body);

  if (!parsedData.success) {
    return res.json({
      message: "Incorrect format",
      error: parsedData.error,
    });
  }

  ////!SECTION
  const userId = req.userId;

  const { title, description, price, imageUrl } = req.body;

  try {
    const course = await CourseModel.create({
      title,
      description,
      price,
      imageUrl,
      creatorId: userId,
    });

    res.json({
      message: "Course created",
      courseId: course._id,
    });
  } catch (error) {
    res.json("Error creating a course");
  }
};

const editCourse = async (req, res) => {
  const parsedData = courseInputValidation.safeParse(req.body);

  if (!parsedData.success) {
    return res.json({
      message: "Incorrect format",
      error: parsedData.error,
    });
  }

  //
  const userId = req.userId;

  const { title, description, price, imageUrl, courseId } = req.body;

  try {
    const course = await CourseModel.findOneAndUpdate(
      { _id: courseId, creatorId: userId },
      { title, description, price, imageUrl },
      { new: true }
    );

    res.json({
      message: "Course updated",
      courseId: course._id,
    });
  } catch (error) {
    res.status(400).json({
      message:
        "Error updating the course. You are not authorized to update this course",
      error: error.message,
    });
  }
};

const allCourses = async (req, res) => {
  const userId = req.userId;

  try {
    const course = await CourseModel.find({ creatorId: userId });

    res.json({
      message: "All your courses",
      content: course,
      courseId: course._id,
    });
  } catch (error) {
    res.json("Error fetching all courses");
  }
};

const deleteCourse = async (req, res) => {
  const userId = req.userId;

  const { courseId } = req.body;

  try {
    const course = await CourseModel.deleteOne({
      _id: courseId,
      creatorId: userId,
    });

    if (course.deletedCount === 0) {
      res.status(400).json({
        message: "Course not found or you are not the creator",
      });
    }

    res.json({
      message: "Course deleted",
      deletedCourse: courseId,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting the course", error: error.message });
  }
};

export {
  adminSignup,
  adminLogin,
  adminLogout,
  createCourse,
  editCourse,
  allCourses,
  deleteCourse,
};
