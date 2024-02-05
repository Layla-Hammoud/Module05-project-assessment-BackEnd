import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { generateToken } from "../utils/jwt.js";

export const signIn = async (request, response) => {
  try {
    const { email, password } = request.body;

    // Find the user by email
    const user = await User.findOne({ email: email });

    if (!user) {
      return response.status(401).json({ message: "Email not found" });
    }

    // Compare passwords using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const jwtToken = generateToken(user);

    response.cookie("access_token", jwtToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // Set to true in production (requires HTTPS)
    });

    return response.status(200).json({
      message: "user log in",
    });
  } catch (err) {
    return response.status(401).json({ message: err.message, success: false });
  }
};

export async function addNewUser(req, res) {
  let user = req.body;

  try {
    if (!user.username || !user.password || !user.email) {
      return res.status(400).json({ message: "missing required property" });
    } else {
      let passExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      let userNameExpression = /^[a-zA-Z][a-zA-Z0-9]{5,11}$/;
      if (!user.password.match(passExpression)) {
        return res.status(400).json({
          error:
            "password should start with letter and has 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
        });
      } else {
        let findUser = await User.findOne({
          username: user.username,
        });
        if (findUser) {
          return res.status(400).json({ error: "Username already exist" });
        }
        findUser = await User.findOne({ email: user.email });
        if (findUser) {
          return res
            .status(400)
            .json({ error: "a User with this email already exist" });
        }
        try {
          const hashedPass = await bcrypt.hash(user.password, 10);
          const newUser = await User.create({
            ...user,
            password: hashedPass,
            isAdmin: user.isAdmin ? true : false,
          });
          res.json(newUser);
        } catch (error) {
          console.log(error);
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

export const getOneUser = async (request, response) => {
    const { id } = request.user
    try {
      // Fetching all users from the database
      const user = await User.findOne({ _id: id  });
  
      if (!user) {
        return response.status(401).json({ message: "user not found" });
      }
  
      return response.status(200).json({
        data: user,
        success: true,
        message: "User found"
      });
    } catch (error) {
      return response.status(401).json({
        success: false,
        message: error.message
      });
    }
  };
