const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  body: String,
  timeCommented: Date,
  username: String,
  likes: Array,
  parentPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

module.exports = mongoose.model("CommentSchema", CommentSchema);
