const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Comment } = require("../models/commentSchema.js");
const auth = require("../middleware/auth.js");
const admin = require("../middleware/admin.js");

router.post("/get", async (req, res) => {
  console.log(req.body);
  let searchParam = req.body;
  Comment.find(searchParam)
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
  const message = new Comment({
    body: body.body,
    parentPost: body.parentPost,
    parentComment: body.parentComment,
    timeCommented: body.timeCommented,
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

module.exports = router;
