import { Router } from "express";
import { uploadImage } from "../middleware/multer.js";
import {
  AddProduct,
  deleteProduct,
  getProducts,
  editProduct,
} from "../contorllers/productController.js";
import { isAdmin } from "../middleware/authMiddleware.js";
export const productRoutes = Router();

productRoutes.post(
  "/addProduct",
  isAdmin,
  uploadImage.single("image"),
  AddProduct
);
productRoutes.delete("/deleteProduct", isAdmin, deleteProduct);
productRoutes.get("/AllProducts", getProducts);
productRoutes.patch(
  "/editProduct",
  isAdmin,
  uploadImage.single("image"),
  editProduct
);
