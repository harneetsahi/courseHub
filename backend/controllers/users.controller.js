import { UserModel } from "../models/users.model.js";
import jwt from "jsonwebtoken";

const userSignup = async (req, res) => {
  // input validation
  const requiredBody = "";

  // getting user details
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await UserModel.create({
      name,
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
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await UserModel.find({ email });

    if (user) {
      const matchedPassword = await bcrypt.compare(password, user.password);

      if (matchedPassword) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
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

export { userSignup, userLogin, userLogout };
