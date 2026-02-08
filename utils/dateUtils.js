// Utility functions for date and month operations

export const getCurrentMonthKey = () => {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${date.getFullYear()}-${month}`; // e.g., 2026-02
};

export const getMonthName = (monthKey) => {
  const [year, month] = monthKey.split("-");
  const date = new Date(year, parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export const getCurrentMonthName = () => {
  const date = new Date();
  return date.toLocaleDateString("en-US", { month: "short" });
};

export const isCurrentMonth = (monthKey) => {
  return monthKey === getCurrentMonthKey();
};

export const isCurrentMonthOrPast = (monthKey) => {
  const [year, month] = monthKey.split("-");
  const monthDate = new Date(parseInt(year), parseInt(month) - 1);
  const today = new Date();
  return monthDate <= today;
};

export const getAllMonths = () => {
  const months = [];

  // Generate months from January 2026 onwards
  const startDate = new Date(2026, 0); // January 2026
  const today = new Date();

  let currentDate = new Date(startDate);

  // Generate months until today + 12 months ahead
  while (currentDate <= new Date(today.getFullYear(), today.getMonth() + 12)) {
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const monthKey = `${currentDate.getFullYear()}-${month}`;
    months.push(monthKey);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return months.sort(); // Sort chronologically by month number
};

export const getNextMonthKey = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${date.getFullYear()}-${month}`;
};

export const getFormattedTimestamp = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
};
