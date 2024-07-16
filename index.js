import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const port = 3000; // Assuming you want to run your frontend server on port 3000
const API_URL = "http://localhost:4000"; // API URL if you still need to connect to an external API

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use product routes for API operations
app.use("/api/products", productRoutes);

// Frontend Routes
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    res.render("index.ejs", { products: response.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

app.get("/new", (req, res) => {
  res.render("edit.ejs", {
    heading: "New Product",
    submit: "Create Product",
    product: {},
  });
});

app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/products/${req.params.id}`);
    if (response.data) {
      res.render("edit.ejs", {
        heading: "Edit Product",
        submit: "Update Product",
        product: response.data,
      });
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching product" });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/products`, req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating product" });
  }
});

app.post("/api/products/:id", async (req, res) => {
  try {
    const response = await axios.patch(
      `${API_URL}/products/${req.params.id}`,
      req.body
    );
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating product" });
  }
});

app.get("/api/products/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/products/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting product" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Connecting to API server at ${API_URL}`);
});
