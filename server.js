const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
let cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
const auth = require("./routes/auth.js");
const comments = require("./routes/comments.js")

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
  });

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/auth", auth);
app.use("/api/comments", comments)

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
