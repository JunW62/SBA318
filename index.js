import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();
const port = 4000;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use product routes for API operations
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);

app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});
