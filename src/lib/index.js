// place files you want to import through the `$lib` alias in this folder.
import { format } from 'date-fns';

export const statusColors = { declined: 'red', pending: 'yellow', approved: 'green'};

const timeFormat = 'MMMM d, yyyy \'at\' hh:mm a';
export function postgresTimeToReadable(time) {
    if (!time) return '';
    return format(new Date(time), timeFormat);
}

const timeslotFormatExtended = 'hh:mm a';
// accepts a list with the structure [start, end] where start and end are Dates
export function postgresTimeToTimeslot(time) {
    if (!time || !time[0] || !time[1]) return '';

    return postgresTimeToReadable(time[0]) + ' to ' + format(new Date(time[1]), timeslotFormatExtended);
}