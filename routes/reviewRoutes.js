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

// DELETE a specific review by providing the review id
router.delete("/:id", (req, res) => {
  const index = reviews.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ message: "Review not found" });

  reviews.splice(index, 1);
  res.json({ message: "Review deleted" });
});

export default router;
