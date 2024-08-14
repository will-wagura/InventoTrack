from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required
from flask_mail import Message
from app.utilities import generate_invitation_token
from flask_security import current_user as security_current_user
from flask_security.decorators import roles_required

# Define the Blueprint
bp = Blueprint("email_routes", __name__)


@bp.route("/emails/send-invite", methods=["POST"])
@jwt_required()
@roles_required("superuser")
def send_invite():
    email = request.json.get("email")
    if not email:
        return jsonify({"error": "Email is required"}), 400

    token = generate_invitation_token(email, "admin")
    invitation_link = f"{current_app.config['FRONTEND_URL']}/register?token={token}"

    msg = Message("Admin Invitation", recipients=[email])
    msg.body = f"Click the link to register: {invitation_link}"

    current_app.mail.send(msg)

    return jsonify({"message": "Invitation sent successfully"}), 200


@bp.route("/emails/send-notification", methods=["POST"])
@jwt_required()
def send_notification():
    email = request.json.get("email")
    subject = request.json.get("subject")
    message = request.json.get("message")

    if not email or not subject or not message:
        return jsonify({"error": "Email, subject and message are required"}), 400

    msg = Message(subject, recipients=[email])
    msg.body = message

    current_app.mail.send(msg)

    return jsonify({"message": "Notification sent successfully"}), 200
