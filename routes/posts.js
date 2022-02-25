const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Post } = require("../models/postSchema.js");
const auth = require("../middleware/auth.js");
const admin = require("../middleware/admin.js");

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

router.get("/single", async (req, res) => {
  console.log(req.query);
  Post.findById(req.query)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured fetching post",
      });
    });
});

router.put("/like", async (req, res) => {
  const filter = { _id: req.body._id };
  const user = { ...req.body.user };
  console.log(filter, user);
  const update = { $push: { likes: user } };
  Post.findOneAndUpdate(filter, update, {
    new: true,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.put("/unlike", async (req, res) => {
  console.log(req.body);
  const filter = { _id: req.body._id };
  const user = { ...req.body.user };
  console.log(filter, user);
  const update = { $pull: { likes: { _id: user._id } } };
  Post.findOneAndUpdate(filter, update, {
    new: true,
  })
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
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
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Message.",
      });
    });
});

router.delete("/", async (req, res) => {
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
