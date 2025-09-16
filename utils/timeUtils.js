function convertTimeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}
function convertDateToIsoFormat(dateStr, timeStr) {
  let [day, month, year] = dateStr.split(".");
  day = day.padStart(2, "0");
  month = month.padStart(2, "0");

  let [hour, minute] = timeStr.split(":").map(Number);

  const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute));

  return utcDate.toISOString();
}

console.log(convertDateToIsoFormat("22.09.2025", "07:07"));
module.exports = {
  convertTimeToMinutes,
  convertDateToIsoFormat,
};
