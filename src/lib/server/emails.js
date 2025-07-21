import { postgresTimeToReadable } from '$lib';

async function mailuser(subject, body, recipient) {
    try {
        const res = await fetch('http://emailer:5000/mail', {
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

export const emailTypes = {
    SUBMISSION: "SUBMISSION",
    RESPONSE: "RESPONSE",
    CONCLUSION: "CONCLUSION" // variation of RESPONSE; cannot be preselected
    };

/*
MUST HAVES:
request -> statuses, approversEmails, remarks, type, name, requested, assigned, date_start, date_end, (location)
requester -> email, name, (contactNum, department)
approver -> staffEmails, (name
emailType -> emailTypes.SUBMISSION, emailTypes.RESPONSE
*/
export async function mailRequester(request, requester, approver, emailType) {
    if (emailType == emailTypes.SUBMISSION) {
        var subject = `[DFLCD eLaan] Your request was submitted for approval!`;
        var emailText = `has been successfully submitted`
    }
    // considered CONCLUDED if (a) any status is DECLINED or (b) final approver's status is APPROVED
    else if (request.statuses.some((status) => status === "declined") || request.statuses[request.statuses.length-1] === "approved") { 
        emailType = emailTypes.CONCLUSION;
        var subject = `[DFLCD eLaan] Your request has concluded.`;
        var emailText = `has concluded, upon the response of ${approver.name}`
    }
    else if (emailType == emailTypes.RESPONSE) {
        var subject = `[DFLCD eLaan] Your request was submitted for approval!`;
        var emailText = `has a new response by ${approver.name}`
    }
    else {
        var subject = "[DFLCD eLaan] Error email"
        var emailText = `has an error. Please consult the emails below for the exact state of your request. The rest of the details of your request are also listed below`
    }
    
    const recipient = requester.email;
    const staffEmails = approver.staffEmails.join(', ');

    let status = ``;
    let _firstPendingFound;
    request.statuses.forEach((_status, index) => {
        status += "\n\t• ";
        status +=
            _status == 'approved' ?  `approved by ${request.approversEmails[index]}` :
            _status == 'pending' ?   `${_firstPendingFound ? "invisible to" : "pending with"} ${request.approversEmails[index] ?? `any faculty staff (${staffEmails})`}` :
            _status == 'declined' ?  `declined by ${request.approversEmails[index]}` :
                                     `unknown status with ${request.approversEmails[index] ?? '???'}`;
        
        if (_status == 'pending' || _status == 'declined') _firstPendingFound = true;

        if (request.remarks[index])
            status += `\n\t\t"${request.remarks[index]}"`; 
    })

    let requestedItems = request.type == 'equipment' ? 
        '\n\t• ' + request.name.split(', ').join('\n\t• ') : 
        '\n\t• ' + Object.values(request.requested).join('\n\t• ')
    console.log("AWAWA:", request.assigned);
    const assignedItems = request.type == 'equipment' ? (request.assigned == undefined || request.assigned?.filter(x => x != undefined).length == 0 ? `(none)` :
        '\n\t• ' + request.assigned?.filter(_item => _item?.length != 0 && _item != undefined).join('\n\t• ')) : 
        '\n\t• ' + request.assigned?.filter(_item => _item != undefined).join('\n\t• ');

    const date_start = postgresTimeToReadable(request.date_start);
    const date_end = postgresTimeToReadable(request.date_end);

    const body = 
`Dear eLaan user ${requester.name},

Your ${request.type} request for "${request.name}" ${emailText}.

--------------------------------------------------------------------------------------------------------

The following shows your request's status and their accompanying remarks as of ${postgresTimeToReadable(new Date(), 'MMMM d, yyyy \'(\'hh:mm a\')\'')}, in order of approval: ${status}

The "invisible" status means that they are not capable of responding to the request (and may not be aware of it), as it may still be pending with a lower layer approver or it is declined. 

--------------------------------------------------------------------------------------------------------
${emailType != emailTypes.CONCLUSION ? `
The full details of your request are listed below:

Requester Contact Number: ${requester.contactNum}
Requester Department/Section: ${requester.department} 
Coordinating Instructor: ${request.approversEmails[0]}

${request.type == "equipment" ? 
`Scheduled Date of Borrowing: ${date_start}
Scheduled Date of Return: ${date_end}
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

--------------------------------------------------------------------------------------------------------` : ""}

This is an automated email; please redirect all your inquiries to the listed approvers above.`

    // console.log(body);

    return await mailuser(subject, body, recipient);
}