import smtplib
from email.mime.text import MIMEText

# subject = "Hello"
# body = "Never gonna give you up, Never gonna let you down, Never gonna run around and desert youuu."
sender = "flcdmailer@gmail.com"
# recipients = ["studentjoshua00@gmail.com"]
password = "nxgy sigk spxa rlfs"


def send_email(subject, body, recipients):
    sender = "flcdmailer@gmail.com"
    password = "nxgy sigk spxa rlfs"
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = recipients
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
       smtp_server.login(sender, password)
       smtp_server.sendmail(sender, recipients, msg.as_string())
    print("Message sent!")


#send_email(subject, body, sender, recipients, password)