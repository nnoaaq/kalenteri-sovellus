const fs = require("fs");
const path = require("path");
const { getOAuthClient } = require("../services/oAuthService");
const tokenFilePath = path.join(__dirname, "../tmp", "tokens.json");
function verifyTokens() {
  try {
    const tokenFile = fs.readFileSync(tokenFilePath, "utf-8");
    if (!tokenFile.trim()) {
      return false;
    }
    try {
      const tokens = JSON.parse(tokenFile);
      if (tokens.expiry_date && tokens.expiry_date > Date.now()) return true;
    } catch (error) {
      return false;
    }
  } catch (error) {
    return false;
  }
}

async function saveTokens(code) {
  try {
    const oAuthClient = await getOAuthClient();
    const { tokens } = await oAuthClient.getToken(code);
    try {
      fs.writeFileSync(tokenFilePath, JSON.stringify(tokens, null, 2));
      return true;
    } catch (error) {
      console.error("Virhe tokenien tallentamisesa:" + error);
      console.log;
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}
async function getTokens() {
  try {
    const tokenFile = fs.readFileSync(tokenFilePath, "utf-8");
    if (!tokenFile.trim()) {
      return false;
    }
    try {
      const tokens = JSON.parse(tokenFile);
      return tokens;
    } catch (error) {
      return false;
    }
  } catch (error) {
    return false;
  }
}
module.exports = {
  verifyTokens,
  saveTokens,
  getTokens,
};
