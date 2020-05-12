/* eslint-disable no-mixed-operators */
const calendarHelpers = {};

calendarHelpers.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

calendarHelpers.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

calendarHelpers.getLatestMonth = (monthNumber) => {
  if (monthNumber + 3 > 11) {
    return monthNumber + 3 - 12;
  }
  return monthNumber + 3;
};

calendarHelpers.firstDayOfMonth = (year, monthNumber) => (
  calendarHelpers.weekdays[new Date(year, monthNumber, 1).getDay()]
);

calendarHelpers.lastDayIndexOfMonth = (year, monthNumber) => (
  new Date(year, monthNumber, calendarHelpers.lastDateOfMonth(year, monthNumber)).getDay()
);

calendarHelpers.lastDateOfMonth = (year, monthNumber) => (
  32 - new Date(year, monthNumber, 32).getDate()
);

calendarHelpers.monthNameToNum = (monthName) => (
  calendarHelpers.months.indexOf(monthName)
);

calendarHelpers.monthNumToName = (monthNumber) => (
  calendarHelpers.months[monthNumber]
);

calendarHelpers.blankDaysBefore = (year, monthNumber) => {
  const blanksArray = [];
  const numOfBlanks = new Date(year, monthNumber, 1).getDay();
  let previousMonthNumber = monthNumber - 1;
  let previousMonthsYear = year;
  if (monthNumber === 0) {
    previousMonthNumber = 11;
    previousMonthsYear -= 1;
  }
  const lastDayOfPreviousMonth = calendarHelpers
    .lastDateOfMonth(previousMonthsYear, previousMonthNumber);

  for (let i = lastDayOfPreviousMonth - (numOfBlanks - 1); i <= lastDayOfPreviousMonth; i += 1) {
    const id = calendarHelpers.createId(previousMonthsYear, previousMonthNumber, i);
    blanksArray.push(id);
  }
  return blanksArray;

  // should return an array of the day numbers of prior month before the first day of current month
};

calendarHelpers.firstWeekRow = (year, monthNumber) => {
  const firstWeek = calendarHelpers.blankDaysBefore(year, monthNumber);
  const currentMonthsDaysInRow = 7 - firstWeek.length;
  for (let i = 1; i <= currentMonthsDaysInRow; i += 1) {
    const id = calendarHelpers.createId(year, monthNumber, i);
    firstWeek.push(id);
  }
  return firstWeek;
};

calendarHelpers.lastWeekRow = (year, monthNumber) => {
  const lastDate = calendarHelpers.lastDateOfMonth(year, monthNumber);
  const lastDayIndex = calendarHelpers.lastDayIndexOfMonth(year, monthNumber);
  const lastWeek = [];

  for (let i = lastDate - lastDayIndex; i <= lastDate; i += 1) {
    const id = calendarHelpers.createId(year, monthNumber, i);
    lastWeek.push(id);
  }
  let nextYear = year;
  let nextMonth = monthNumber + 1;
  if (nextMonth === 12) {
    nextMonth = 0;
    nextYear += 1;
  }

  let j = 1;
  while (lastWeek.length < 7) {
    const id = calendarHelpers.createId(nextYear, nextMonth, j);
    lastWeek.push(id);
    j += 1;
  }
  return lastWeek;

  // get last day of month
  // see which day of the week that is
  // starting from the date of last day minus the index of the weekday,
  // push in to a week array all days up to the last day
  // then fill in the rest of the week starting from 1 until the length of array is 7 is 7
};

calendarHelpers.allWeekRows = (year, monthNumber) => {
  const firstWeek = calendarHelpers.firstWeekRow(year, monthNumber);
  const lastWeek = calendarHelpers.lastWeekRow(year, monthNumber);
  const firstDayOfSecondWeek = calendarHelpers.dayNumFromId(firstWeek[6]);
  const firstDayOfLastWeek = calendarHelpers.dayNumFromId(lastWeek[0]);
  const allWeeks = [];
  allWeeks.push(firstWeek);
  let dayCounter = 0;
  let currentWeek = [];

  for (let i = firstDayOfSecondWeek + 1; i < firstDayOfLastWeek; i += 1) {
    const id = calendarHelpers.createId(year, monthNumber, i);
    currentWeek.push(id);
    dayCounter += 1;
    if (dayCounter === 7) {
      allWeeks.push(currentWeek);
      currentWeek = [];
      dayCounter = 0;
    }
  }
  allWeeks.push(lastWeek);
  return allWeeks;
};

calendarHelpers.createId = (year, monthNumber, day) => (
  calendarHelpers.roundDecimal((year + monthNumber * 0.01 + day * 0.0001), 4)
);

calendarHelpers.idToLongDate = (id) => {
  const year = Math.floor(id);
  const monthNum = calendarHelpers.monthFromId(id);
  const monthName = calendarHelpers.monthNumToName(monthNum);
  const day = calendarHelpers.dayNumFromId(id);
  const dayOfWeek = calendarHelpers.weekdays[new Date(year, monthNum, day).getDay()];
  return (`${dayOfWeek}, ${monthName} ${day}`);
};

calendarHelpers.weekdayFromId = (id) => {
  const year = Math.floor(id);
  const monthNum = calendarHelpers.monthFromId(id);
  const day = calendarHelpers.dayNumFromId(id);
  return new Date(year, monthNum, day).getDay();
};

calendarHelpers.monthFromId = (id) => (
  Math.round(calendarHelpers.roundDecimal(parseFloat(id) % 1, 2) * 100)
);

calendarHelpers.dayNumFromId = (id) => (
  Math.round(calendarHelpers.roundDecimal(((parseFloat(id) % 1) % 0.01 * 10000), 4))
);

calendarHelpers.roundDecimal = (value, decimals) => (
  // eslint-disable-next-line prefer-template
  Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
);

export default calendarHelpers;
