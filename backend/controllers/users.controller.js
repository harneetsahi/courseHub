import { UserModel } from "../models/users.model.js";
import jwt from "jsonwebtoken";
import { z } from "zod";
import bcrypt from "bcrypt";

const userSignup = async (req, res) => {
  // input validation

  const requiredBody = z.object({
    firstName: z.string().min(3).max(50),
    lastName: z.string().min(3).max(50),
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

  // getting user details
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 8);

    await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.json({
      message: "You are successfully signed up",
    });
  } catch (error) {
    res.status(400).json({
      message: "User already exists",
    });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      const matchedPassword = await bcrypt.compare(password, user.password);

      if (matchedPassword) {
        const token = jwt.sign(
          { id: user._id },
          `${process.env.JWT_USER_SECRET}`
        );
        return res.json({
          message: token,
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

const userLogout = async (req, res) => {
  const token = req.headers.token;

  // find user id
};

const purchases = async (req, res) => {};

export { userSignup, userLogin, userLogout, purchases };
