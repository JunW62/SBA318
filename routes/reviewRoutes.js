import express from "express";
const router = express.Router();

import reviews from "../data/reviews.js";

let lastId = 10;
// GET all reviews
router.get("/", (req, res) => {
  console.log(reviews);
  res.json(reviews);
});

// GET a specific review by id
router.get("/:id", (req, res) => {
  const review = reviews.find((p) => p.id === parseInt(req.params.id));
  if (!review) return res.status(404).json({ message: "Review not found" });
  res.json(review);
});

// POST a new review
router.post("/", (req, res) => {
  const newId = (lastId += 1);
  const review = {
    id: newId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    date: new Date(),
  };
  lastId = newId;
  reviews.push(review);
  res.status(201).json(review);
});

// PATCH a review when you just want to update one parameter
router.patch("/:id", (req, res) => {
  const review = reviews.find((p) => p.id === parseInt(req.params.id));
  if (!review) return res.status(404).json({ message: "Review not found" });

  if (req.body.name) review.name = req.body.name;
  if (req.body.description) review.description = req.body.description;
  if (req.body.price) review.price = req.body.price;
  if (req.body.quantity) review.quantity = req.body.quantity;

  res.json(review);
});

// DELETE a specific review by providing the review id
router.delete("/:id", (req, res) => {
  const index = reviews.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ message: "Review not found" });

  reviews.splice(index, 1);
  res.json({ message: "Review deleted" });
});

export default router;
