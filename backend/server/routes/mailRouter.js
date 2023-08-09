const express = require("express");
const { sendContactForm, sendMailToUser } = require("../controller/mailController");

const router = express.Router();

router.post("/contactForm", sendContactForm);
//router.post("/toUser", sendMailToUser);

module.exports = router;
