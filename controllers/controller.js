const CommentSchema = require("../models/commentSchema.js");
const Post = require("../models/postSchema.js");

exports.findAll = (req, res) => {
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
};

exports.createNewPost = (req, res) => {
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
};

exports.createNewComment = (req, res) => {
  const { body, timeCommented, username, parentPost, likes } = req.body;
  const commentObj = new CommentSchema({
    body: body,
    timeCommented: timeCommented,
    username: username,
    likes: likes,
    parentPost: parentPost,
  });
  commentObj
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.delete = (req, res) => {
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
};
