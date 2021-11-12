const mongoose = require("mongoose");

const RenameSchema = mongoose.Schema({
  property: String,
});

module.exports = mongoose.model("Rename", RenameSchema);
