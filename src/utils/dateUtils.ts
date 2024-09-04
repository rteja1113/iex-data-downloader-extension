export const parseDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
};

export const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const generateDateRanges = (
  start: Date,
  end: Date,
  batchSize: number
) => {
  const ranges = [];
  const currentStart = start;
  while (currentStart < end) {
    const currentEnd = new Date(currentStart);
    currentEnd.setDate(currentEnd.getDate() + batchSize - 1);
    if (currentEnd > end) {
      currentEnd.setDate(end.getDate());
    }
    ranges.push({
      start: formatDate(currentStart),
      end: formatDate(currentEnd),
    });
    currentStart.setDate(currentStart.getDate() + batchSize);
  }
  return ranges;
};
