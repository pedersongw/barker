const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: String,
    body: String,
    username: Object,
    timePosted: Date,
    likes: Array,
  })
);

exports.Post = Post;
