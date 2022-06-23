const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Comment } = require("../models/commentSchema.js");
const auth = require("../middleware/auth.js");
const admin = require("../middleware/admin.js");

router.get("/all", async (req, res) => {
  Comment.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/get", async (req, res) => {
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

router.post("/report", async (req, res) => {
  let searchParam = { _id: req.body.id };
  let comment = await Comment.findOne(searchParam);
  if (!comment.report) {
    comment.report = [req.body.reportObj];
  } else {
    comment.report.push(req.body.reportObj);
  }
  comment
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the report.",
      });
    });
});

router.post("/unreport", async (req, res) => {
  let searchParam = { _id: req.body.id };
  let comment = await Comment.findOne(searchParam);
  comment.report.splice(req.body.index, 1);

  comment
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the report.",
      });
    });
});

router.post("/", async (req, res) => {
  const { body } = req;
  const message = new Comment({
    body: body.body,
    parentPost: body.parentPost,
    username: body.username,
    parentComment: body.parentComment,
    timeCommented: body.timeCommented,
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

router.post("/delete", async (req, res) => {
  let searchParam = req.body;
  Comment.findOneAndUpdate(searchParam, { deleted: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {});
});

module.exports = router;
