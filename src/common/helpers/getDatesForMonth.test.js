import { getDatesForMonth } from './getDatesForMonth';

const datesAreEqual = (date1, date2) => {
  return date1.toISOString() === date2.toISOString();
};

describe('getDatesForMonth function', () => {
  it('returns dates for current month up to today', () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const expectedDates = [];

    // Generate expected dates for the current month up to today
    for (let i = 1; i <= today.getDate(); i++) {
      expectedDates.push(new Date(year, month, i));
    }

    const result = getDatesForMonth(month, year);

    expect(result.length).toBe(expectedDates.length);
    result.forEach((date, index) => {
      expect(datesAreEqual(date, expectedDates[index])).toBe(true);
    });
  });

  it('returns empty array for future month', () => {
    const futureMonth = new Date().getMonth() + 2; // Month index starts from 0
    const futureYear = new Date().getFullYear();

    const result = getDatesForMonth(futureMonth, futureYear);

    expect(result).toEqual([]);
  });

  it('returns dates for past month', () => {
    const pastMonth = new Date().getMonth() - 1; // Month index starts from 0
    const pastYear = new Date().getFullYear();

    const expectedDates = [];

    // Calculate expected dates for the past month
    const lastDayOfMonth = new Date(pastYear, pastMonth + 1, 0).getDate();
    for (let i = 1; i <= lastDayOfMonth; i++) {
      expectedDates.push(new Date(pastYear, pastMonth, i));
    }

    const result = getDatesForMonth(pastMonth, pastYear);

    expect(result.length).toBe(expectedDates.length);
    result.forEach((date, index) => {
      expect(datesAreEqual(date, expectedDates[index])).toBe(true);
    });
  });

  it('returns dates for February in a leap year', () => {
    const leapYear = 2024;
    const expectedDates = [];

    // Generate expected dates for February in a leap year (2024)
    for (let i = 1; i <= 29; i++) {
      expectedDates.push(new Date(leapYear, 1, i)); 
    }

    const result = getDatesForMonth(1, leapYear); 

    expect(result.length).toBe(expectedDates.length);
    result.forEach((date, index) => {
      expect(datesAreEqual(date, expectedDates[index])).toBe(true);
    });
  });
});
