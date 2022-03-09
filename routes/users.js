const { User, validate } = require("../models/userSchema.js");
const auth = require("../middleware/auth.js");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  let name = await User.findOne({ name: req.body.name });
  if (user) return res.status(400).send("User already registered");
  if (name) return res.status(400).send("Username already taken");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: false,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(user);
});

module.exports = router;
