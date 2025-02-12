import { AdminModel } from "../models/admins.model.js";
import jwt from "jsonwebtoken";
import { z } from "zod";
import bcrypt from "bcrypt";

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

    await AdminModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

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
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await AdminModel.findOne({ email });

    if (user) {
      const matchedPassword = await bcrypt.compare(password, user.password);

      if (matchedPassword) {
        const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`);
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

const createCourse = async (req, res) => {};

const deleteCourse = async (req, res) => {};

const editCourse = async (req, res) => {};

export {
  adminSignup,
  adminLogin,
  adminLogout,
  createCourse,
  deleteCourse,
  editCourse,
};
