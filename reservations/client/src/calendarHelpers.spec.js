/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// use jest --updateSnapshot --'testNamePattern' to re-record snapshot of particular test

import React from 'react';
import calendarHelpers from './calendarHelpers.js';
import testData from './calendarTestData.js';

describe('Calendar Helpers First Day of Month', () => {
  it('should return the correct weekday of the first day of each month', () => {
    const firstDayOfMay2020 = calendarHelpers.firstDayOfMonth(2020, 4);
    const firstDayOfAugust2010 = calendarHelpers.firstDayOfMonth(2010, 7);
    expect(firstDayOfMay2020).toBe('Fri');
    expect(firstDayOfAugust2010).toBe('Sun');
  });
});

describe('Calendar Helpers Last Day Index of Month', () => {
  it('should return the correct weekday of the first day of each month', () => {
    const lastDayIndexOfMay2020 = calendarHelpers.lastDayIndexOfMonth(2020, 4);
    const lastDayIndexOfAugust2010 = calendarHelpers.lastDayIndexOfMonth(2010, 7);
    expect(lastDayIndexOfMay2020).toBe(0);
    expect(lastDayIndexOfAugust2010).toBe(2);
  });
});

describe('Calendar Helpers allWeekRows', () => {
  it('should return an array of the correct dates for all of the month', () => {
    const allRowsOfMay2020 = calendarHelpers.allWeekRows(2020, 4);
    const allRowsOfJanuary2020 = calendarHelpers.allWeekRows(2020, 0);
    const allRowsOfDecember2019 = calendarHelpers.allWeekRows(2019, 11);
    expect(allRowsOfMay2020).toStrictEqual(testData.allMay);
    expect(allRowsOfJanuary2020).toStrictEqual(testData.allJanuary);
    expect(allRowsOfDecember2019).toStrictEqual(testData.allDecember);
  });
});
