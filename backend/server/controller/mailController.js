const { logError } = require("../middleware/logger");
const {
  contactNameRegex,
  emailRegex,
  emailSubjectRegex,
  emailMessageRegex
} = require("../model/regex");
const mailService = require("../service/mailService.js");

function validateMail(name, email, subject, message) {
  let isValid = true;
  if (
    !contactNameRegex.test(name) ||
    !emailRegex.test(email) ||
    !emailSubjectRegex.test(subject) ||
    !emailMessageRegex.test(message)
  ) {
    isValid = false;
  }
  return isValid;
}

//POST /api_priv/mail/contactForm
async function sendContactForm(req, res) {
  try {
    const { senderName, senderEmail, subject, message } = req.body;
    const vpsEmail = process.env.CONTACT_MAIL_ADDRESS;
    if (!vpsEmail) {
      throw new Error("Missing contact mail address");
    }
    if (!senderName || !senderEmail || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const isValid = validateMail(senderName, senderEmail, subject, message);
    if (!isValid) {
      throw new Error("Invalid e-mail data");
    }

    const mailBody = `New inquiry from ${senderName},\n
    e-mail address: ${senderEmail}\n
    Message:\n
    ${message}`;

    const sentMail = await mailService.sendMail(
      vpsEmail,
      vpsEmail,
      senderEmail,
      subject,
      mailBody
    );

    if (!sentMail?.result || sentMail.error) {
      throw new Error(sentMail?.error ?? "Failed to send contact form");
    }
    return res.status(200).json({ message: "Mail sent successfully" });
  } catch (err) {
    logError(err, req);
    return res.status(400).json({ message: "Failed to send mail" });
  }
}

//POST /api_priv/mail/toUser
function sendMailToUser(req, res, next) {
  try {
    return next();
  } catch (err) {
    logError(err, req);
    return res.status(400).json({ message: "Failed to send mail" });
  }
}

module.exports = { sendContactForm, sendMailToUser };
