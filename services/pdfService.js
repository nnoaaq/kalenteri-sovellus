const {
  convertTimeToMinutes,
  convertDateToIsoFormat,
} = require("../utils/timeUtils");
function convertRawDataToDayBlocks(rawData) {
  const readyDayBlocks = [];
  const dateMatches = [...rawData.matchAll(/\d{1,2}\.\d{1,2}\.\d{4}[A-Z]/g)];
  const dayBlocks = dateMatches.map((match, i, arr) => {
    const start = match.index;
    const end = arr[i + 1]?.index ?? rawData.indexOf("80:00");
    return rawData.slice(start, end);
  });
  for (let dayBlock of dayBlocks) {
    const dateMatch = dayBlock.match(/\d{1,2}\.\d{1,2}\.\d{4}/);
    if (dateMatch[0].length > 0) {
      const allLines =
        dayBlock.match(
          /(?<!\d)(400N|431B|560N|600N|614K|633|623|617|614|600|560|554|431|400|311|111|70|69|63)/gm
        ) || [];
      if (allLines.length > 0) {
        const calendarFormat = {
          summary: "",
          description: "",
          start: {
            dateTime: "",
            timeZone: "UTC",
          },
          end: {
            dateTime: "",
            timeZone: "UTC",
          },
        };
        const drivedLines = [...new Set(allLines)];
        const foundTimes = dayBlock.match(/^\d{1,2}:\d{1,2}/gm);
        const sortedTimes = foundTimes.slice().sort((a, b) => {
          return convertTimeToMinutes(a) - convertTimeToMinutes(b);
        });
        calendarFormat.summary = drivedLines.join(" | ");
        calendarFormat.start.dateTime = convertDateToIsoFormat(
          dateMatch[0],
          sortedTimes[0]
        );
        calendarFormat.end.dateTime = convertDateToIsoFormat(
          dateMatch[0],
          sortedTimes[sortedTimes.length - 1]
        );
        const descriptionLines = [
          ...dayBlock.matchAll(/^\d{2}:\d{2} - \d{2}:\d{2}/gm),
        ];
        const description = descriptionLines.map((match, i, arr) => {
          return dayBlock
            .slice(match.index, arr[i + 1]?.index ?? dayBlock.length)
            .trim()
            .replace(/\n/g, "")
            .replace(/(\d{1,2}:\d{1,2}\s-\s\d{1,2}:\d{1,2})/, "$1 ")
            .replace(/Lopetusaika.*/, " Lopetusaika")
            .replace(/Varallaoloaika.*/, " Varallaoloaika")
            .replace(/Siirtymä kävellen.*/, " Siirtymä kävellen")
            .replace(/Siirtymän odotus.*/, " Siirtymän odotus")
            .replace(/(Aloitusaika)/, " $1")
            .replace(/(Ruokatauko)/, " $1")
            .replace(/(Ptau.*)/, " $1")
            .replace(/(vaihtopysäkki)/, "$1 ")
            .replace(/(Lentoasema T2)/g, "$1 ")
            .replace(
              /(\d{2,3}(?:[A-Z]?)|\d{2,3}(?:[A-Z]?),\s\d{2,3}(?:[A-Z]?)|\d{2,3}(?:[A-Z]?),\s\d{2,3}(?:[A-Z]?),\s\d{2,3}(?:[A-Z]?))(\d{3})/,
              " [Linjat : $1] [Vuoro : $2] "
            )
            .replace(/CAR.*/, " Aloitusaika ja siirtyminen muulla autolla")
            .replace(/Linja-ajoa\s([12])/, "[Suunta : $1]");
        });

        calendarFormat.description = description.join("\n\n");
        readyDayBlocks.push(calendarFormat);
      }
    }
  }
  if (readyDayBlocks.length > 0) {
    return readyDayBlocks;
  }
}
module.exports = {
  convertRawDataToDayBlocks,
};
