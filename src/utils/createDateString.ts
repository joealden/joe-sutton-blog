/**
 * Formats an ISO date string to the format `date/month/year`.
 *
 * NOTE:
 * `Date.prototype.getMonth()` returns a zero based value.
 * This means that for January, it will return `0`, for
 * February, it will return `1` etc. These values should
 * be displayed as `1` and `2` to the user. For this reason,
 * `1` must be added to the returned value to get the value
 * we actually want to display.
 */

export const createDateString = (ISODateString: string) => {
  const ISODate = new Date(ISODateString);

  const date = ISODate.getDate();
  const month = ISODate.getMonth() + 1;
  const year = ISODate.getFullYear();

  return `${date}/${month}/${year}`;
};
