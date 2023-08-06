import React from "react";
import BackButton from "../utility/BackButton";

function UserFormConfirm({ onSubmit, user, submitText, usernameError, passwordError }) {
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
        minLength={3}
        maxLength={20}
        required={true}
        placeholder="3-20 characters"
        title="Enter 3-20 characters (letters, numbers, or underscores)"
        defaultValue={user?.username ?? ""}
        autoFocus={true}
      />
      {usernameError && (
        <p className="red error">
          Enter 3-20 characters (letters, numbers, or underscores)
        </p>
      )}
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        minLength={8}
        maxLength={30}
        required={true}
        autoComplete="new-password"
        placeholder="Min. 8 characters"
        title="Enter 8-30 characters"
      />
      {passwordError && <p className="red error">Enter minimum 8 characters</p>}
      <label htmlFor="confirm_password">Confirm password:</label>
      <input
        type="password"
        id="confirm_password"
        name="confirmPassword"
        minLength={8}
        maxLength={30}
        required={true}
        placeholder="Confirm Password"
      />
      <button type="submit">{submitText}</button>
      <BackButton />
    </form>
  );
}

export default UserFormConfirm;
