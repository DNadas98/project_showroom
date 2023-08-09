const axios = require("axios");

async function forwardGitRequest(req, res, next) {
  try {
    const path = req.url.split("/git/")[1];
    const baseUrl = process.env.GIT_API_URL;
    const accessToken = process.env.GIT_API_TOKEN;

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (accessToken?.length > 0) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    const apiResponse = await axios.get(`${baseUrl}/${path}`, config);
    const data = apiResponse.data;

    return res.json(data);
  } catch (err) {
    return next(err);
  }
}

module.exports = { forwardGitRequest };
