const mongoose = require("mongoose");
const {
  githubUsernameRegex,
  githubRepoNameRegex,
  githubRepoFilePathRegex,
  fileNameRegex,
  languageRegex,
  descriptionRegex
} = require("./regex");

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      match: githubUsernameRegex
    },
    repo: {
      type: String,
      required: true,
      match: githubRepoNameRegex
    },
    readme: {
      path: { type: String, required: true, match: githubRepoFilePathRegex },
      language: { type: String, match: languageRegex, default: "markdown" }
    },
    files: [
      {
        name: { type: String, required: true, match: fileNameRegex },
        path: { type: String, required: true, match: githubRepoFilePathRegex },
        language: { type: String, required: true, match: languageRegex },
        startLine: { type: Number, default: 1, min: 1, max: 9999 },
        endLine: { type: Number, min: 0, max: 9999 },
        description: { type: String, match: descriptionRegex },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Project", projectSchema);
