import express from "express";
const router = express.Router();

import users from "../data/users.js";

let lastId = 3;

// GET all users
router.get("/", (req, res) => {
  console.log(users);
  res.json(users);
});

// GET a specific user by id
router.get("/:id", (req, res) => {
  const user = users.find((p) => p.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// POST a new user
router.post("/", (req, res) => {
  const newId = (lastId += 1);
  const user = {
    id: newId,
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
  };
  lastId = newId;
  users.push(user);
  res.status(201).json(user);
});

// PATCH a user when you just want to update one parameter
router.patch("/:id", (req, res) => {
  const user = users.find((p) => p.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  if (req.body.name) user.name = req.body.name;
  if (req.body.username) user.username = req.body.username;
  if (req.body.email) user.email = req.body.email;

  res.json(user);
});

// DELETE a specific user by providing the user id
router.delete("/:id", (req, res) => {
  const index = users.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "User not found" });

  users.splice(index, 1);
  res.json({ message: "User deleted" });
});

export default router;
