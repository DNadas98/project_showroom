/* eslint-disable no-useless-escape */

//auth

//(min 3, max 20 characters, alphanumeric and underscores only)
export const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
//(min 8, max 30 characters, allows special characters)
export const passwordRegex = /^[\s\S]{8,30}$/;

//github api

//(min 3, max 39 characters, alphanumeric, and hyphens)
export const githubUsernameRegex = /^[a-zA-Z0-9\-]{3,39}$/;
//(min 3, max 100 characters, alphanumeric, hyphens, and underscores)
export const githubRepoNameRegex = /^[a-zA-Z0-9\-_]{3,100}$/;
//(max 500 characters, alphanumeric, hyphens, underscores, slashes, and dots)
export const githubRepoFilePathRegex = /^[a-zA-Z0-9\-_/\.]{1,500}$/;
//(max 100 characters, alphanumeric, hyphens, and underscores)
export const fileNameRegex = /^[a-zA-Z0-9\-_.]{1,100}$/;
//(max 50 characters, alphanumeric, hyphens, and underscores)
export const languageRegex = /^[a-zA-Z0-9_-]{1,50}$/;
//(max 500 characters, allowing common punctuation and line breaks)
export const descriptionRegex = /^[\w\s.,!?'"():;\[\]{}@#%^&*()\r\n-]{1,700}$/;

//mail

//(min 2, max 100 characters, very permissive to accommodate international characters)
export const contactNameRegex = /^[\p{L}\p{N}\p{P}\p{Z}]{2,100}$/u;
//(common simplified pattern for emails, permissive for the local part)
export const emailRegex = /^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,200}$/;
//(min 2, max 150 characters for email subject, permissive to accommodate international characters)
export const emailSubjectRegex = /^[\p{L}\p{N}\p{P}\p{Z}\s]{2,150}$/u;
//(min 10, max 2000 characters for email message, permissive to accommodate international characters)
export const emailMessageRegex = /^[\p{L}\p{N}\p{P}\p{Z}\s]{10,2000}$/u;
