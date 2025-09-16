require("dotenv").config();
const { google } = require("googleapis");
function getOAuthClient() {
  const oAuthClient = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
  return oAuthClient;
}
module.exports = {
  getOAuthClient,
};
