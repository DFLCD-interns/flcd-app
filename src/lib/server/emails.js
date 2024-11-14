// This function removes tabs (which is 4 spaces, or could be multiple 4s) so VsCode writing is happy
async function mailuser(subject, body, recipient) {
    try {
        const res = await fetch('http://127.0.0.1:5000/mail', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({ subject, body: body.replaceAll(/ {4}/g, ''), recipient })
        })        
        return res;
    }
    catch (error) {
        console.error('error sending email (could be faulty internet connection or flask problems):', error);
        return {ok: false};
    }
}

export async function mailRequesterOnResponse(requesterName, requestName, approverName, remarks, statuses, approversEmails, assignedItems, requesterEmail) {
    const subject = `[FLCD-APP] New response to your request!`
    const recipient = "legara.cedric@gmail.com"
    // const recipient = requesterEmail

    const status = statuses.map((status, index) => 
            status == 'approved' ?  `approved by ${approversEmails[index]}` :
            status == 'pending' ?   `pending with ${approversEmails[index] ?? 'any faculty staff'}` :
            status == 'declined' ?  `declined by ${approversEmails[index]}` :
                                    `unknown status with ${approversEmails[index] ?? '???'}`
    ).join(', ')

    const _assignedItems = assignedItems.filter(_item => _item != null).join('\n• ');

    const body = 
    `Dear DFLCD eLaan user ${requesterName},

    Your ${requestName} request has a new response by ${approverName}, with the following remarks:

    ${remarks ? '\"' + remarks + '\"' : '(no remarks)'}
    
    Your request's status is: ${status}, with the following ${requestName == 'observation' ? 'child' : (requestName + 's')} assigned to you:

    ${_assignedItems ? '• ' + _assignedItems : '(nothing assigned as of now)'}
    
    This is an automated email; please redirect all your inquiries to the listed approvers above.`

    return await mailuser(subject, body, recipient);
}