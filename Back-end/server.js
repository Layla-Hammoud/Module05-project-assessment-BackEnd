import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbconnect from "./config/db.js";
import { userRoutes } from "./routes/userRouter.js";
import { productRoutes } from "./routes/productRouter.js";
import orderRouter from "./routes/orderRouter.js";

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());
app.use(express.static("public"));
dbconnect();

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRouter);

app.listen(port, () => {
  console.log(`Server is listenning on port ${port}`);
});
