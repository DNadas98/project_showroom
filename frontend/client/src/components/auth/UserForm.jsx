import React from "react";
import BackButton from "../utility/BackButton";

function UserForm({ onSubmit, submitText, usernameError, passwordError }) {
  return (
    <form
      className="column"
      onSubmit={(event) => {
        onSubmit(event);
      }}
    >
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        autoComplete="username"
        placeholder="3-20 characters"
        minLength={3}
        maxLength={20}
        required={true}
        title="Enter 3-20 characters (alphanumeric or underscores)"
        autoFocus={true}
      />
      {usernameError && (
        <p className="error">Enter 3-20 characters (alphanumeric or underscores)</p>
      )}
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        autoComplete="new-password"
        placeholder="Min. 8 characters"
        minLength={3}
        maxLength={30}
        required={true}
        title="Enter 8-30 characters"
      />
      {passwordError && <p className="error">Enter 8-30 characters</p>}
      <button type="submit">{submitText}</button>
      <BackButton path="/" />
    </form>
  );
}

export default UserForm;
