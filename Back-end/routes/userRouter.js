import { Router } from "express";
import {
  addNewUser,
  signIn,
} from "../contorllers/userController.js";

export const userRoutes = Router();

userRoutes.post("/signup", addNewUser);
userRoutes.post("/login", signIn);