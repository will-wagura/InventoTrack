from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Message, User, db

admin_bp = Blueprint("admin", __name__)


@admin_bp.route("/api/admin/send", methods=["POST"])
@jwt_required()
def send_message():
    data = request.get_json()
    sender_id = get_jwt_identity()
    receiver_id = data.get("receiver_id")
    content = data.get("content")

    if not content:
        return jsonify({"error": "Message content is required"}), 400

    if not receiver_id:
        return jsonify({"error": "Receiver ID is required"}), 400

    try:
        receiver = User.query.get(receiver_id)
        if not receiver:
            return jsonify({"error": "Receiver not found"}), 404

        message = Message(sender_id=sender_id, receiver_id=receiver_id, content=content)
        db.session.add(message)
        db.session.commit()

        return (
            jsonify(
                {"message": "Message sent successfully", "data": message.to_dict()}
            ),
            201,
        )
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to send message"}), 500


@admin_bp.route("/api/admin/messages", methods=["GET"])
@jwt_required()
def fetch_messages():
    user_id = get_jwt_identity()
    other_user_id = request.args.get("other_user_id")

    if not other_user_id:
        return jsonify({"error": "Other user ID is required"}), 400

    try:
        messages = (
            Message.query.filter(
                (Message.sender_id == user_id and Message.receiver_id == other_user_id)
                or (
                    Message.sender_id == other_user_id
                    and Message.receiver_id == user_id
                )
            )
            .order_by(Message.timestamp)
            .all()
        )

        return jsonify([message.to_dict() for message in messages]), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch messages"}), 500
