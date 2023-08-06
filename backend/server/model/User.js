const mongoose = require("mongoose");
const availableRoles = require("../config/availableRoles");
const { usernameRegex } = require("./regex");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      match: usernameRegex
    },
    password: {
      type: String,
      required: true
    },
    roles: [
      {
        type: String,
        default: "User",
        enum: availableRoles
      }
    ],
    active: {
      type: Boolean,
      default: true
    },
    refreshTokens: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
