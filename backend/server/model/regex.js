/* eslint-disable no-useless-escape */

//(min 3, max 20 characters, alphanumeric and underscores only)
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
//(min 8, max 30 characters, allows special characters)
const passwordRegex = /^[\s\S]{8,30}$/;
//(min 3, max 39 characters, alphanumeric, and hyphens)
const githubUsernameRegex = /^[a-zA-Z0-9\-]{3,39}$/;
//(min 3, max 100 characters, alphanumeric, hyphens, and underscores)
const githubRepoNameRegex = /^[a-zA-Z0-9\-_]{3,100}$/;
//(max 500 characters, alphanumeric, hyphens, underscores, slashes, and dots)
const githubRepoFilePathRegex = /^[a-zA-Z0-9\-_/\.]{1,500}$/;
//(max 100 characters, alphanumeric, hyphens, and underscores)
const fileNameRegex = /^[a-zA-Z0-9\-_.]{1,100}$/;
//(max 50 characters, alphanumeric, hyphens, and underscores)
const languageRegex = /^[a-zA-Z0-9_-]{1,50}$/;
//(max 500 characters, allowing common punctuation and line breaks)
const descriptionRegex = /^[\w\s.,!?'"():;\[\]{}@#%^&*()\r\n-]{1,700}$/;

module.exports = {
  usernameRegex,
  passwordRegex,
  githubUsernameRegex,
  githubRepoNameRegex,
  githubRepoFilePathRegex,
  fileNameRegex,
  languageRegex,
  descriptionRegex
};
