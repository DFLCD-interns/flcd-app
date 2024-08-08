

export async function mailuser(subject, ebody, recipient) {
    const res = await fetch('http://127.0.0.1:5000/mail', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: `{"subject":"${subject}","body":"${ebody}","recipient":"${recipient}"}`
    })
    return res;
}