const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });
const pdfParse = require("pdf-parse");
const { convertRawDataToDayBlocks } = require("../services/pdfService");
const { addDayBLocksToCalendar } = require("../services/calendarService");
router.get("/send", (req, res) => {
  res.send(`
    <form action="/pdf/receive" method="post" enctype="multipart/form-data">
      <input
        type="file"
        accept="application/pdf"
        name="pdf"
        id="pdf"
        required
      />
      <select name="calendarId" id="calendarID" required>
        <option value="noa">Noa</option>
        <option value="mari">Mari</option>
      </select>
      <button type="submit">Lähetä ></button>
    </form>`);
});
router.post("/receive", upload.single("pdf"), async (req, res) => {
  const dataBuffer = req.file.buffer;
  const rawData = await pdfParse(dataBuffer);
  const dayBlocks = convertRawDataToDayBlocks(rawData.text);
  const success = await addDayBLocksToCalendar(dayBlocks, req.body.calendarId);
  if (success) {
    res.send(
      `Lisätty ${req.body.calendarId}n kalenteriin ${dayBlocks.length} tapahtumaa <a href="/">Tallenna toisen listan työvuorot</a>`
    );
  }
});
module.exports = router;
