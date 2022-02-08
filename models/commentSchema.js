const mongoose = require("mongoose");

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    body: String,
    timeCommented: Date,
    username: Object,
    parentPost: String,
    parentComment: String,
    children: Array,
    deleted: Boolean,
  })
);

exports.Comment = Comment;
