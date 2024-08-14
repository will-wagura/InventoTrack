from flask_socketio import emit, disconnect, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from app import socketio, db
from app.models import Message, GroupMessage, ChatGroup, User
from datetime import datetime
import pytz

# Dictionary to track connected users
connected_users = {}

# Handle user connection
@socketio.on('connect')
@jwt_required()
def handle_connect():
    user_id = get_jwt_identity()
    connected_users[user_id] = request.sid
    emit('status', {'message': 'Connected'}, room=request.sid)

# Handle user disconnection
@socketio.on('disconnect')
@jwt_required()
def handle_disconnect():
    user_id = get_jwt_identity()
    if user_id in connected_users:
        del connected_users[user_id]
    emit('status', {'message': 'Disconnected'}, room=request.sid)

# Handle one-on-one chat messages
@socketio.on('send_message')
def handle_send_message(data):
    sender_id = get_jwt_identity()
    recipient_id = data.get('recipient_id')
    content = data.get('content')

    # Save the message to the database
    message = Message(
        sender_id=sender_id,
        recipient_id=recipient_id,
        content=content,
        timestamp=datetime.now(pytz.timezone('EAT'))
    )
    db.session.add(message)
    db.session.commit()

    # Emit the message to the recipient
    if recipient_id in connected_users:
        emit('receive_message', message.to_dict(), room=connected_users[recipient_id])

    # Emit the message back to the sender
    emit('receive_message', message.to_dict(), room=connected_users[sender_id])

# Handle group messages
@socketio.on('send_group_message')
def handle_send_group_message(data):
    sender_id = get_jwt_identity()
    group_id = data.get('group_id')
    content = data.get('content')

    # Save the group message to the database
    group_message = GroupMessage(
        group_id=group_id,
        sender_id=sender_id,
        content=content,
        timestamp=datetime.now(pytz.timezone('EAT'))
    )
    db.session.add(group_message)
    db.session.commit()

    # Emit the message to all members of the group
    group = ChatGroup.query.get(group_id)
    for member in group.members:
        if member.id in connected_users:
            emit('receive_group_message', group_message.to_dict(), room=connected_users[member.id])

# Handle group creation
@socketio.on('create_group')
def handle_create_group(data):
    user_id = get_jwt_identity()
    group_name = data.get('group_name')
    members_ids = data.get('members_ids', [])

    # Create a new chat group
    new_group = ChatGroup(name=group_name)
    db.session.add(new_group)
    db.session.commit()

    # Add members to the group
    members = User.query.filter(User.id.in_(members_ids)).all()
    new_group.members.extend(members)
    db.session.commit()

    # Notify the creator
    emit('group_created', new_group.to_dict(), room=connected_users.get(user_id))

    # Notify all the group members
    for member in members:
        if member.id in connected_users:
            emit('group_invitation', new_group.to_dict(), room=connected_users[member.id])

# Handle adding a user to a group
@socketio.on('add_user_to_group')
def handle_add_user_to_group(data):
    user_id = get_jwt_identity()
    group_id = data.get('group_id')
    new_member_id = data.get('new_member_id')

    group = ChatGroup.query.get(group_id)
    new_member = User.query.get(new_member_id)
    group.members.append(new_member)
    db.session.commit()

    # Notify the group admin
    emit('user_added_to_group', new_member.to_dict(), room=connected_users.get(user_id))

    # Notify the new member
    if new_member.id in connected_users:
        emit('group_invitation', group.to_dict(), room=connected_users[new_member.id])