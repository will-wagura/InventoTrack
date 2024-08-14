from flask_mail import Message
from flask import current_app

class EmailService:
    @staticmethod
    def send_invitation(email, token):
        invitation_link = f"{current_app.config['FRONTEND_URL']}/register?token={token}"
        msg = Message("Admin Invitation",
                      recipients=[email],
                      body=f"Click the link to register: {invitation_link}")
        current_app.mail.send(msg)

    @staticmethod
    def send_notification(email, subject, message):
        msg = Message(subject,
                      recipients=[email],
                      body=message)
        current_app.mail.send(msg)