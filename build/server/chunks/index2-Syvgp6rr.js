import { format } from 'date-fns';

const statusColors = { declined: "red", pending: "yellow", approved: "green" };
const timeFormat = "MMMM d, yyyy 'at' hh:mm a";
function postgresTimeToReadable(time, _format = timeFormat) {
  if (!time) return "";
  return format(new Date(time), _format);
}
const timeslotFormatExtended = "hh:mm a";
function postgresTimeToTimeslot(time) {
  if (!time || !time[0] || !time[1]) return "";
  return postgresTimeToReadable(time[0]) + " to " + format(new Date(time[1]), timeslotFormatExtended);
}

export { postgresTimeToTimeslot as a, postgresTimeToReadable as p, statusColors as s };
//# sourceMappingURL=index2-Syvgp6rr.js.map
