import express from "express";
const router = express.Router();

import products from "../data/products.js";

// GET all products
router.get("/", (req, res) => {
  console.log(products);
  res.json(products);
});

// GET a specific product by id
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// POST a new product
router.post("/", (req, res) => {
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
router.patch("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (req.body.name) product.name = req.body.name;
  if (req.body.description) product.description = req.body.description;
  if (req.body.price) product.price = req.body.price;
  if (req.body.quantity) product.quantity = req.body.quantity;

  res.json(product);
});

// DELETE a specific product by providing the product id
router.delete(":id", (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ message: "Product not found" });

  products.splice(index, 1);
  res.json({ message: "Product deleted" });
});

export default router;
