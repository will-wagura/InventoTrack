from dotenv import load_dotenv
from flask_mail import Message
from app import mail
import os

load_dotenv()


class EmailService:
    @staticmethod
    def send_invitation(email, token):
        invitation_link = f"http://localhost:5173/register?token={token}"
        msg = Message(
            "Admin Invitation",
            sender=os.getenv("MAIL_USERNAME"),
            recipients=[email],
            body=f"Click the link to register: {invitation_link}",
        )
        mail.send(msg)

    @staticmethod
    def send_notification(email, subject, message):
        msg = Message(subject, recipients=[email], body=message)
        mail.send(msg)
