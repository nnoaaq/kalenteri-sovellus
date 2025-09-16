const express = require("express");
const router = express.Router();
const { getOAuthClient } = require("../services/oAuthService");
const { saveTokens } = require("../services/tokenService");
router.get("/", async (req, res) => {
  const oAuthClient = await getOAuthClient();
  const authUrl = oAuthClient.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar"],
  });
  res.redirect(authUrl);
});
router.get("/redirect", async (req, res) => {
  const code = req.query.code;
  if (code) {
    if (await saveTokens(code)) {
      res.redirect("/");
    } else {
      res.send("Virhe tokenien tallennuksessa");
    }
  }
});
module.exports = router;
