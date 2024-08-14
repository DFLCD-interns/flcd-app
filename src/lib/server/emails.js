

export async function mailuser(subject, ebody, recipient) {
    // console.log(subject, ebody, recipient)
    const santizedBody = ebody.replace(/(\r\n|\n|\r\\.+)/g, ' ')
    const res = await fetch('http://127.0.0.1:5000/mail', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: `{"subject":"${subject}","body":"${santizedBody}","recipient":"${recipient}"}`
    })
    // console.log(res)
    return res;
}