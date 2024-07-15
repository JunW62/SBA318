import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    // console.log(response);
    res.render("index.ejs", { products: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Route to render the edit page
app.get("/new", (req, res) => {
  res.render("edit.ejs", { heading: "New Product", submit: "Create Product" });
});

app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/products/${req.params.id}`);
    console.log(response.data);
    res.render("edit.ejs", {
      heading: "Edit Product",
      submit: "Update Product",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
});

// Create a new product
app.post("/api/products", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/products`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
});

// Partially update a product
app.post("/api/products/:id", async (req, res) => {
  console.log("called");
  try {
    const response = await axios.patch(
      `${API_URL}/products/${req.params.id}`,
      req.body
    );
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
});

// Delete a product
app.get("/api/products/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/products/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
