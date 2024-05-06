

export function howManyMonths(firstEventDatetime: Date | undefined, lastEventDatetime: Date | undefined) {
  if (!firstEventDatetime || !lastEventDatetime) {
    return 0;
  }

  const monthsDiff = lastEventDatetime.getMonth() - firstEventDatetime.getMonth() +
    (12 * (lastEventDatetime.getFullYear() - firstEventDatetime.getFullYear()));
  return monthsDiff + 1;
}