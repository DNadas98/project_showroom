import React from "react";
import BackButton from "../utility/BackButton";

function ContactForm({
  onSubmit,
  senderNameError,
  senderEmailError,
  subjectError,
  messageError
}) {
  return (
    <form
      className="ContactForm column"
      onSubmit={(event) => {
        onSubmit(event);
      }}
    >
      <label htmlFor="senderName">Your Name or Organization</label>
      <input
        type="text"
        id="senderName"
        name="senderName"
        placeholder="Enter your name"
        minLength={2}
        maxLength={100}
        required={true}
        title="Enter 2-100"
        autoFocus={true}
      />
      {senderNameError && <p className="error">Please enter a valid name!</p>}
      <label htmlFor="senderEmail">Your E-mail Address</label>
      <input
        type="text"
        id="senderEmail"
        name="senderEmail"
        placeholder="Enter your e-mail address"
        minLength={2}
        maxLength={200}
        required={true}
        title="Enter your e-mail address"
      />
      {senderEmailError && <p className="error">Please enter a valid e-mail address!</p>}
      <label htmlFor="subject">Subject</label>
      <input
        type="text"
        id="subject"
        name="subject"
        placeholder="Enter the subject"
        minLength={2}
        maxLength={150}
        required={true}
        title="Enter the subject"
      />
      {subjectError && <p className="error">Please enter a vaild email subject!</p>}
      <label htmlFor="message">Your message</label>
      <textarea
        id="message"
        name="message"
        rows={20}
        minLength={10}
        maxLength={2000}
        placeholder="Send me a message!"
        title="Enter 10-2000 characters"
      />
      {messageError && (
        <p className="error">Please enter a valid email message! (10-200 characters)</p>
      )}
      <div className="row">
        <button type="submit">Send</button>
        <BackButton path="/" text="Back" />
      </div>
    </form>
  );
}

export default ContactForm;
