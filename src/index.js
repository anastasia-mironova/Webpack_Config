import "./styles/styles.css";
import "./styles/scss.scss";
function getDate(day, month, year, format = "year_month_day") {
  if (
    0 < day &&
    day <= 31 &&
    0 <= +month &&
    month <= 31 &&
    year.toString().length === 4
  ) {
    const date = new Date(year, month, day);
    switch (format) {
      case "day.month.year":
        return date.toLocaleDateString("ru");

      case "year_month_day":
        return date.toLocaleDateString("en-US");

      case "object":
        return date;
      case "iso":
        return date.toISOString();
      //   default:
      //     return null;
    }
  }
  return null;
}

console.log(getDate(1, 14, 1994, "iso"));
console.log(getDate(1, 11, 1994, "iso"));
console.log(typeof getDate(1, 13, 1994, "object"));
console.log(getDate(1, 11, 1994, "iskhlgo"));
console.log(getDate(1, 11, 1994, "year_month_day"));
console.log(getDate(1, 11, 1994, "day.month.year"));
const a = 42;
