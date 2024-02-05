import { Router } from "express";
import {
  addNewUser,
  signIn,
  getOneUser
} from "../contorllers/userController.js";
import {authenticate} from '../middleware/authMiddleware.js'

export const userRoutes = Router();

userRoutes.post("/signup", addNewUser);
userRoutes.post("/login", signIn);
userRoutes.get("/one",authenticate, getOneUser);