const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Post } = require("../models/postSchema.js");
const auth = require("../middleware/auth.js");

router.get("/", async (req, res) => {
  Post.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
      });
    });
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { body } = req;
  const message = new Post({
    title: body.title,
    body: body.body,
    username: body.username,
    timePosted: body.timePosted,
    likes: body.likes,
  });
  message
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Message.",
      });
    });
});

router.delete("/", auth, async (req, res) => {
  console.log(req.body._id);
  Post.deleteOne({ _id: req.body["_id"] }, function (err) {
    if (err) console.log(err);
    console.log("Successful deletion");
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
