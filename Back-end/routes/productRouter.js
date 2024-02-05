import { Router } from "express";
import { uploadImage } from "../middleware/multer.js";
import {
  AddProduct,
  deleteProduct,
  getProducts,
  editProduct,
} from "../contorllers/productController.js";
import { isAdmin,authenticate } from "../middleware/authMiddleware.js";
export const productRoutes = Router();

productRoutes.post(
  "/addProduct",
  authenticate,
  isAdmin,
  uploadImage.single("image"),
  AddProduct
);
productRoutes.delete("/deleteProduct", authenticate,isAdmin, deleteProduct);
productRoutes.get("/AllProducts", getProducts);
productRoutes.patch(
  "/editProduct",
  authenticate,
  isAdmin,
  uploadImage.single("image"),
  editProduct
);
