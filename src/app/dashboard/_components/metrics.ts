export function howManyMonths(
  firstEventDatetime: Date | undefined,
  lastEventDatetime: Date | undefined,
) {
  if (!firstEventDatetime || !lastEventDatetime) {
    return 0;
  }

  const monthsDiff =
    lastEventDatetime.getMonth() -
    firstEventDatetime.getMonth() +
    12 * (lastEventDatetime.getFullYear() - firstEventDatetime.getFullYear());
  return monthsDiff + 1;
}

export function whichMonths(
  firstEventDatetime: Date | undefined,
  lastEventDatetime: Date | undefined,
): string[] {
  if (!firstEventDatetime || !lastEventDatetime) {
    return [];
  }

  const months: string[] = [];
  const currentDate = new Date(firstEventDatetime.getTime());

  while (currentDate <= lastEventDatetime) {
    const month = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();
    const formattedDate = `${month}/${year}`;
    months.push(formattedDate);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return months;
}
