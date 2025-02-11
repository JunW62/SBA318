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
    // Use Promise.all to handle both requests simultaneously
    const [userResponse, productResponse, reviewResponse] = await Promise.all([
      axios.get(`${API_URL}/api/users`),
      axios.get(`${API_URL}/api/products`),
      axios.get(`${API_URL}/api/reviews`),
    ]);

    // Render index.ejs with both users and products
    res.render("index.ejs", {
      users: userResponse.data,
      products: productResponse.data,
      reviews: reviewResponse.data,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res
      .status(500)
      .json({ message: "Error fetching data", details: error.message });
  }
});

// Route to render the edit page
app.get("/new", (req, res) => {
  res.render("edit.ejs", { heading: "New Product", submit: "Create Product" });
});

app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/products/${req.params.id}`
    );
    console.log(response.data);
    res.render("edit.ejs", {
      heading: "Edit Product",
      submit: "Update Product",
      product: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
});

// Create a new product
app.post("/api/products", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/api/products`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
});

// Partially update a product
app.post("/api/products/:id", async (req, res) => {
  // console.log("called");
  try {
    const response = await axios.patch(
      `${API_URL}/api/products/${req.params.id}`,
      req.body
    );
    // console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
});

// Delete a product
app.get("/api/products/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/api/products/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

// ---------------------------users----------------------------------

// Route to display users
app.get("/new-user", (req, res) => {
  res.render("user.ejs", { heading: "New User", submit: "Create User" });
});

// Route to display edit user
app.get("/edit-user/:id", async (req, res) => {
  console.log("called");
  try {
    const response = await axios.get(`${API_URL}/api/users/${req.params.id}`);
    console.log(response.data);
    res.render("user.ejs", {
      heading: "Edit User",
      submit: "Update Profile",
      user: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

// Create a new user
app.post("/api/users", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/api/users`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

// Partially update a user

app.post("/api/users/:id", async (req, res) => {
  // console.log("called");
  try {
    const response = await axios.patch(
      `${API_URL}/api/users/${req.params.id}`,
      req.body
    );
    // console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

// Route to handle user deletion
app.get("/delete-user/:id", async (req, res) => {
  await axios.delete(`${API_URL}/api/users/${req.params.id}`);
  res.redirect("/");
});

// ---------------------------reviews----------------------------------

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
