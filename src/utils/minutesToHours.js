function minutesToHm(d) {
  d = Number(d);
  var h = Math.floor(d / 60);
  var m = d % 60;
  console.log(h, m);
  var hDisplay = h > 0 ? h + (h === 1 ? "h " : "h ") : ""; // Changed from "hour" to "h"
  var mDisplay = m > 0 ? m + (m === 1 ? "m" : "m") : ""; // Changed from "minute" to "m"
  return hDisplay + mDisplay;
}

export default minutesToHm;
