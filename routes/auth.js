const jwt = require("jsonwebtoken");
const { User } = require("../models/userSchema.js");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  if (user.status != "Active") {
    return res.status(401).send({
      message: "Pending Account. Please Verify Your Email!",
    });
  }
  const token = user.generateAuthToken();

  res.send(token);
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

module.exports = router;
