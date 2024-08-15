from flask import Blueprint, request, jsonify
from app import db, bcrypt
from app.utilities import verify_invitation_token
from app.models import User, Role

# Define the Blueprint
bp = Blueprint('auth_routes', __name__)

@bp.route('/register', methods=['POST'])
def register():
    """
    Register a new user.
    """
    data = request.json

    if not data:
        return jsonify({"error": "No data provided"}), 400

    token = data.get('token')
    name = data.get('name')
    email = data.get('email')
    contact = data.get('contact')
    password = data.get('password')
    confirm_password = data.get('confirm_password')

    if not all([token, name, email, contact, password, confirm_password]):
        return jsonify({"error": "All fields are required"}), 400

    if password != confirm_password:
        return jsonify({"error": "Passwords do not match"}), 400

    token_data = verify_invitation_token(token)
    if "error" in token_data:
        return jsonify({"error": token_data["error"]}), 400

    role_name = token_data['role']

    role = Role.query.filter_by(name=role_name).first()
    if not role:
        return jsonify({"error": "Invalid role"}), 400

    if len(password) < 8:
        return jsonify({"error": "Password must be at least 8 characters"}), 400

    new_user = User(
        name=name,
        email=email,
        contact=contact,
        password=bcrypt.generate_password_hash(password).decode('utf-8'),
        active=True
    )
    new_user.roles.append(role)
    db.session.add(new_user)

    try:
        db.session.commit()
        return jsonify({"data": {"message": "Registration successful"}}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Registration failed"}), 500