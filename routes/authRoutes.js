const express = require("express");
const { verifyTokens } = require("../services/tokenService");
const router = express.Router();
router.get("/", async (req, res) => {
  if (verifyTokens()) res.redirect("/pdf/send");
  else res.redirect("/login");
});

module.exports = router;
