import { postgresTimeToReadable } from '$lib';

async function mailuser(subject, body, recipient) {
    try {
        const res = await fetch('http://127.0.0.1:5000/mail', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({ subject, body, recipient })
        })        
        return res;
    }
    catch (error) {
        console.error('error sending email (could be faulty internet connection or flask problems):', error);
        return {ok: false};
    }
}

export async function mailRequesterOnResponse(request, requester, approver) {
    const subject = `[DFLCD eLaan] New response to your request!`;
    const recipient = requester.email;

    const staffEmails = approver.staffEmails.join(', ');

    let status = ``;
    
    request.statuses.forEach((_status, index) => {
        status += "\n\t• ";
        status +=
            _status == 'approved' ?  `approved by ${request.approversEmails[index]}` :
            _status == 'pending' ?   `pending with ${request.approversEmails[index] ?? `any faculty staff (${staffEmails})`}` :
            _status == 'declined' ?  `declined by ${request.approversEmails[index]}` :
                                    `unknown status with ${request.approversEmails[index] ?? '???'}`;
        
        if (request.remarks[index])
            status += `\n\t\t"${request.remarks[index]}"`; 
    })

    let requestedItems = request.type == 'equipment' ? 
        '\n\t• ' + request.name.split(', ').join('\n\t• ') : 
        '\n\t• ' + Object.values(request.requested).join('\n\t• ')
    const assignedItems = request.type == 'equipment' ? 
        '\n\t• ' + request.assigned?.filter(_item => _item.length != 0).join('\n\t• ') : 
        '\n\t• ' + request.assigned?.filter(_item => _item != null).join('\n\t• ');

    const date_start = postgresTimeToReadable(request.date_start);
    const date_end = postgresTimeToReadable(request.date_end);

    const body = 
`Dear eLaan user ${requester.name},

Your ${request.type} request for "${request.name}" has a new response by ${approver.name}.

-----------------------------------------------------------------------------------------

The following shows your request's status and their accompanying remarks as of ${postgresTimeToReadable(new Date(), 'MMMM d, yyyy \'(\'hh:mm a\')\'')}: ${status}

-----------------------------------------------------------------------------------------

The full details of your request are listed below:

Requester Contact Number: ${requester.contactNum}
Requester Department/Section: ${requester.department} 
Coordinating Instructor: ${request.approversEmails[0]}

${request.type == "equipment" ? 
`Promised Date of Borrowing: ${date_start}
Promised Date of Return: ${date_end}
Location of Use: ${request.location}
Requested Equipments: ${requestedItems}
Assigned Equipments: ${assignedItems}` 
    : request.type == "venue" ? 
`Start Date: ${date_start}
End Date: ${date_end}
Requested Venues: ${requestedItems}` 
    : 
`Preschool Class Assigned: ${request.name}
Reserved Timeslots: ${requestedItems}
Child Assigned: ${assignedItems}`}

-----------------------------------------------------------------------------------------

This is an automated email; please redirect all your inquiries to the listed approvers above.`

    console.log(body);

    return await mailuser(subject, body, recipient);
}