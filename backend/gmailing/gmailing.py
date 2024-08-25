import smtplib
from email.mime.text import MIMEText

sender = "flcdmailer@gmail.com"
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