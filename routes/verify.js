const { User } = require("../models/userSchema.js");
const mongoose = require("mongoose");

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  User.findOne({
    confirmationCode: req.body.confCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.status = "Active";
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        } else {
          res.status(200).send("Email confirmed! Please login.");
        }
      });
    })
    .catch((e) => console.log("error", e));
});

module.exports = router;
