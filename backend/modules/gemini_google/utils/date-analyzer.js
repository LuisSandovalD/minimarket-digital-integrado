// ========================================
// utils/date-analyzer.js
// ========================================

const getCurrentMonthRange = () => {

  const now = new Date();

  return {
    start: new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
    ),
    end: new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
    ),
  };
};

const getCurrentYearRange = () => {

  const now = new Date();

  return {
    start: new Date(
      now.getFullYear(),
      0,
      1,
    ),
    end: new Date(
      now.getFullYear(),
      11,
      31,
      23,
      59,
      59,
    ),
  };
};

module.exports = {
  getCurrentMonthRange,
  getCurrentYearRange,
};
