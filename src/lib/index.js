// place files you want to import through the `$lib` alias in this folder.

export const statusColors = { declined: 'red', pending: 'yellow', approved: 'green'};

import { format } from 'date-fns';
const timeFormat = 'MMMM d, yyyy \'at\' hh:mm a';
export function postgresTimeToReadable(time) {
    if (!time) return '(unknown time)';
    return format(new Date(time), timeFormat);
}