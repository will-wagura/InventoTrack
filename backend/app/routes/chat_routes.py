from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Message, User, db
from sqlalchemy import func

chat_bp = Blueprint('chat', __name__)

# Send a message
@chat_bp.route('/api/chat/send', methods=['POST'])
@jwt_required()
def send_message():
    data = request.get_json()
    sender_id = get_jwt_identity()
    receiver_id = data.get('receiver_id')
    content = data.get('content')

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

        return jsonify({"message": "Message sent successfully", "data": message.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to send message"}), 500

# Fetch messages between users
@chat_bp.route('/api/chat/messages', methods=['GET'])
@jwt_required()
def fetch_messages():
    user_id = get_jwt_identity()
    other_user_id = request.args.get('other_user_id')

    if not other_user_id:
        return jsonify({"error": "Other user ID is required"}), 400

    try:
        messages = Message.query.filter(
            (Message.sender_id == user_id) & (Message.receiver_id == other_user_id) |
            (Message.sender_id == other_user_id) & (Message.receiver_id == user_id)
        ).order_by(Message.timestamp).all()

        return jsonify([message.to_dict() for message in messages]), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch messages"}), 500

# Mark a message as read
@chat_bp.route('/api/chat/mark_read/<int:message_id>', methods=['POST'])
@jwt_required()
def mark_message_read(message_id):
    try:
        message = Message.query.get_or_404(message_id)
        if message.receiver_id != get_jwt_identity():
            return jsonify({"error": "Not authorized to mark this message as read"}), 403

        message.is_read = True
        db.session.commit()

        return jsonify({"message": "Message marked as read"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to mark message as read"}), 500

# Fetch unread message count
@chat_bp.route('/api/chat/unread_count', methods=['GET'])
@jwt_required()
def unread_count():
    user_id = get_jwt_identity()

    try:
        unread_messages = Message.query.filter_by(receiver_id=user_id, is_read=False).count()

        return jsonify({"unread_count": unread_messages}), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch unread message count"}), 500

# Fetch recent chats
@chat_bp.route('/api/chat/recent', methods=['GET'])
@jwt_required()
def recent_chats():
    user_id = get_jwt_identity()

    try:
        # Subquery to get the latest message between user and each contact
        subquery = db.session.query(
            Message.sender_id, 
            Message.receiver_id, 
            func.max(Message.timestamp).label('last_message_time')
        ).filter(
            (Message.sender_id == user_id) | (Message.receiver_id == user_id)
        ).group_by(
            func.least(Message.sender_id, Message.receiver_id),
            func.greatest(Message.sender_id, Message.receiver_id)
        ).subquery()

        # Join the subquery to the ChatMessage table to fetch the latest messages
        recent_chats = db.session.query(Message).join(
            subquery, 
            (Message.sender_id == subquery.c.sender_id) & 
            (Message.receiver_id == subquery.c.receiver_id) & 
            (Message.timestamp == subquery.c.last_message_time)
        ).order_by(Message.timestamp.desc()).all()

        response = []
        for message in recent_chats:
            chat_partner_id = message.receiver_id if message.sender_id == user_id else message.sender_id
            chat_partner = User.query.get(chat_partner_id)
            response.append({
                'chat_partner': {
                    'id': chat_partner.id,
                    'name': chat_partner.name,
                    'email': chat_partner.email,
                },
                'last_message': message.to_dict()
            })

        return jsonify(response), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to fetch recent chats"}), 500