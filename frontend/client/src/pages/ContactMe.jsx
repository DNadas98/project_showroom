import React, { useState } from "react";
import "../style/contact.css";
import Confirm from "../components/utility/Confirm";
import LoadingSpinner from "../components/utility/LoadingSpinner";
import {
  contactNameRegex,
  emailRegex,
  emailSubjectRegex,
  emailMessageRegex
} from "../regex/regex";
import { apiPrivFetch } from "../functions/publicFetch";
import ContactForm from "../components/contact/ContactForm";

function ContactMe() {
  const [resultMessage, setResultMessage] = useState(null);
  const [senderNameError, setSenderNameError] = useState(false);
  const [senderEmailError, setSenderEmailError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [onConfirm, setOnConfirm] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const { senderName, senderEmail, subject, message } = Object.fromEntries(
        new FormData(event.target).entries()
      );
      const validInput = validateInput(senderName, senderEmail, subject, message);
      if (validInput) {
        setOnConfirm(() => () => {
          sendContactMail(senderName, senderEmail, subject, message);
        });
        setConfirmMessage(
          `Are you sure you want to send this message\nas ${senderName}\nfrom address ${senderEmail}?`
        );
      }
    } catch (err) {
      setResultMessage("Oops! Something went wrong. Please try again later.");
    }
  }

  function validateInput(senderName, senderEmail, subject, message) {
    let validInput = true;
    if (!senderName || !senderEmail || !subject || !message) {
      setResultMessage("Please complete all fields to proceed!");
      validInput = false;
    } else {
      if (!contactNameRegex.test(senderName)) {
        setSenderNameError(true);
        validInput = false;
      } else {
        setSenderNameError(false);
      }
      if (!emailRegex.test(senderEmail)) {
        setSenderEmailError(true);
        validInput = false;
      } else {
        setSenderEmailError(false);
      }
      if (!emailSubjectRegex.test(subject)) {
        setSubjectError(true);
        validInput = false;
      } else {
        setSubjectError(false);
      }
      if (!emailMessageRegex.test(message)) {
        setMessageError(true);
        validInput = false;
      } else {
        setMessageError(false);
      }
    }
    return validInput;
  }

  async function sendContactMail(senderName, senderEmail, subject, message) {
    try {
      setLoading(true);
      const requestBody = {
        senderName: senderName,
        senderEmail: senderEmail,
        subject: subject,
        message: message
      };

      const { httpResponse, responseObject } = await apiPrivFetch(
        "mail/contactForm",
        "POST",
        requestBody
      );
      if (httpResponse.status === 200 && responseObject?.message) {
        setResultMessage("Message sent successfully! I'll get back to you soon.");
      } else if (responseObject?.message) {
        setResultMessage(responseObject.message);
      } else {
        setResultMessage("Oops! Something went wrong. Please try again later.");
      }
    } catch (err) {
      setResultMessage("Oops! Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ContactMe hcenter">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="contact column">
          {confirmMessage && (
            <Confirm
              onConfirm={onConfirm}
              message={confirmMessage}
              setConfirmMessage={setConfirmMessage}
            />
          )}
          <h3>My Contacts:</h3>
          <table>
            <tbody>
              <tr>
                <td className="right">E-mail: </td>
                <td>
                  <strong>
                    <a
                      className="blue underline"
                      href="mailto:info@dnadas.com"
                      rel="noopener noreferrer"
                    >
                      info@dnadas.com
                    </a>
                  </strong>
                </td>
              </tr>
              <tr>
                <td className="right">GitHub: </td>
                <td>
                  <strong>
                    <a
                      className="blue underline"
                      href="https://github.com/DNadas98"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      github.com/DNadas98
                    </a>
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
          {resultMessage ? <h3>{resultMessage}</h3> : <h3>Send me a message!</h3>}
          <ContactForm
            onSubmit={handleSubmit}
            senderNameError={senderNameError}
            senderEmailError={senderEmailError}
            subjectError={subjectError}
            messageError={messageError}
          />
        </div>
      )}
    </div>
  );
}

export default ContactMe;
