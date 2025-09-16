require("dotenv").config();
const express = require("express");
const app = express();
const authRoutes = require("../routes/authRoutes");
const loginRoutes = require("../routes/loginRoutes");
const pdfRoutes = require("../routes/pdfRoutes");
app.use("/", authRoutes);
app.use("/login", loginRoutes);
app.use("/pdf", pdfRoutes);
app.listen(process.env.PORT || 3000, () => {
  console.log("Sovellus käynnissä osoitteessa http://localhost:3000");
});
