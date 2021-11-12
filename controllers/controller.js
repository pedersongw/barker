const RenameSchema = require("../models/rename.js");

exports.message = (req, res) => {
  console.log("Get request received");
  res.send(" GET request recieved. This is a response from the backend.");
};
