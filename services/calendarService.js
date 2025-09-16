require("dotenv").config();
const { calendar } = require("googleapis/build/src/apis/calendar");
const { getOAuthClient } = require("../services/oAuthService");
const { getTokens } = require("../services/tokenService");
const { google } = require("googleapis");
async function addDayBLocksToCalendar(dayBlocks, calendarId) {
  const calendarIds = {
    noa: process.env.CALENDAR_ID,
    mari: process.env.CALENDAR_ID_MARI,
  };
  const oAuthClient = await getOAuthClient();
  const tokens = await getTokens();
  if (!tokens) {
    return;
  }
  oAuthClient.setCredentials(tokens);
  const calendar = google.calendar({
    version: "v3",
    auth: oAuthClient,
  });
  try {
    let succesCount = 0;
    for (let dayBlock of dayBlocks) {
      try {
        calendar.events.insert({
          calendarId: calendarIds[calendarId],
          resource: dayBlock,
        });
        succesCount++;
      } catch (err) {
        console.log("Virhe tietojen lisäämisessä: " + err);
      }
    }
    if (succesCount === dayBlocks.length) {
      return true;
    }
  } catch (error) {
    console.error("Virhe" + error);
  }
}
module.exports = {
  addDayBLocksToCalendar,
};
