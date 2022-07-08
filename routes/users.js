const { User, validate } = require("../models/userSchema.js");
const auth = require("../middleware/auth.js");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.WORD,
  },
});

transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log(`=== Server is ready to take messages: ${success} ===`);
});

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
  if (name) return res.status(400).send("name already taken");

  const confToken = jwt.sign(
    { email: req.body.email },
    process.env.JWT_PRIVATE_KEY
  );

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmationCode: confToken,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  transporter
    .sendMail({
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${req.body.name}</h2>
          <p>Thanks for signing up for Barker Field's Forum. Please confirm your email by clicking on the following link</p>
          <a href=https://barkerfielddogpark.org/verify/${confToken}> Click here</a>
          </div>`,
    })
    .catch((err) => console.log(err));
  transporter
    .sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "New User Registered",
      html: `<h1>New User Registered</h1>
          <h2>Name: ${req.body.name}</h2>
          <h3>Email: ${req.body.email}</h3>
          </div>`,
    })
    .catch((err) => console.log(err));

  res.status(200).send("Success! Check your email");
});

module.exports = router;
