import express from "express";
import bodyParser from "body-parser";
import products from "./data/products.js";

const app = express();
const port = 4000;

let lastId = 10;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all products
app.get("/products", (req, res) => {
  console.log(products);
  res.json(products);
});

// GET a specific product by id
app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// POST a new product
app.post("/products", (req, res) => {
  const newId = (lastId += 1);
  const product = {
    id: newId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    date: new Date(),
  };
  lastId = newId;
  products.push(product);
  res.status(201).json(product);
});

// PATCH a product when you just want to update one parameter
app.patch("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (req.body.name) product.name = req.body.name;
  if (req.body.description) product.description = req.body.content;
  if (req.body.price) product.price = req.body.price;
  if (req.body.quantity) product.price = req.body.quantity;

  res.json(product);
});

// DELETE a specific product by providing the post id
app.delete("/products/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ message: "Product not found" });

  products.splice(index, 1);
  res.json({ message: "Product deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
