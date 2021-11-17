const mongoose = require("mongoose");

const Post = mongoose.Schema({
  title: String,
  body: String,
  timePosted: Date,
  username: String,
  likes: Array,
});

module.exports = mongoose.model("Post", Post);
