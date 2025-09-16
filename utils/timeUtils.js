function convertTimeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}
function convertDateToIsoFormat(dateStr, timeStr) {
  let [day, month, year] = dateStr.split(".");
  day = day.padStart(2, "0");
  month = month.padStart(2, "0");

  let [hour, minute] = timeStr.split(":").map(Number);
  // Muodosta alkuperäinen päivämäärä
  const date = new Date(`${year}-${month}-${day}T00:00:00`);
  // Lisää tunnit ja minuutit
  date.setHours(date.getHours() + hour);
  date.setMinutes(date.getMinutes() + minute);

  // Muodosta ISO 8601 -merkkijono
  return date.toISOString(); // Poistetaan 'Z' jos ei haluta UTC-aikaa
}
module.exports = {
  convertTimeToMinutes,
  convertDateToIsoFormat,
};
