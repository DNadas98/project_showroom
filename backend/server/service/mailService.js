/* eslint-disable camelcase */
const sgMail = require("@sendgrid/mail");

async function sendMail(sender, receiver, originalSender, subject, mailBody) {
  try {
    if (!process.env.MAIL_API_KEY) {
      throw new Error("Missing API key");
    }

    const mailOptions = {
      from: sender,
      to: receiver,
      replyTo: originalSender,
      subject: subject,
      text: mailBody
    };

    sgMail.setApiKey(process.env.MAIL_API_KEY);
    const sentMail = await sgMail.send(mailOptions);

    return { result: sentMail };
  } catch (err) {
    return { error: err };
  }
}

module.exports = { sendMail };
