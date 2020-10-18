function getDate(day, month, year, format = 'year_month_day') {
    if (1 <= +day && +day <= 31 && 1 <= +month && +month <= 31 && year.length === 4 && +year) {
        const date = new Date(year, month, day)
        switch (format) {
            case 'day.month.year': date.toLocaleString("ru"); break;
            case 'year_month_day': date.toLocaleString("en"); break;
            case 'object': return date;
            case 'iso': return date.toISOString(); break;
        }
        return date.toDateString();
    }
    return null;
}

console.log(getDate(1, 13, 1994, 'iso'));
console.log(getDate(1, 13, 1994, 'object'));
console.log(getDate(1, 13, 1994, 'iskhlgo'));
console.log(getDate(1, 13, 1994, 'year_month_day'));
console.log(getDate(1, 13, 1994, 'day.month.year'));
module.exports = getDate;