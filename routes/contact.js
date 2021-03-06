const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.WORD,
  },
});

transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log(`=== Server is ready to take messages: ${success} ===`);
});

router.post("/", async (req, res) => {
  let mailOptions = {
    to: process.env.EMAIL,
    subject: `BFcontact: ${req.body.subject}`,
    text: `
FROM: ${req.body.firstName} ${req.body.lastName}

EMAIL: ${req.body.email}

MESSAGE: ${req.body.message}`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent successfully");
      res.json({ status: "Email sent" });
    }
  });
});

module.exports = router;
