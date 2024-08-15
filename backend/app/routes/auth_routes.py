from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required
from app import db, bcrypt
from app.utilities import verify_invitation_token
from app.models import User, Role, Token
from flask_wtf.csrf import CSRFProtect, generate_csrf

csrf = CSRFProtect()

# Define the Blueprint
bp = Blueprint("auth_routes", __name__)


@bp.route("/register", methods=["POST"])
def register():
    """
    Register a new user.
    """
    data = request.json

    if not data:
        return jsonify({"error": "No data provided"}), 400

    token = data.get("token")
    name = data.get("name")
    email = data.get("email")
    contact = data.get("contact")
    password = data.get("password")
    confirm_password = data.get("confirm_password")

    if not all([token, name, email, contact, password, confirm_password]):
        return jsonify({"error": "All fields are required"}), 400

    if password != confirm_password:
        return jsonify({"error": "Passwords do not match"}), 400

    token_data = verify_invitation_token(token)
    if "error" in token_data:
        return jsonify({"error": token_data["error"]}), 400

    role_name = token_data["role"]

    role = Role.query.filter_by(name=role_name).first()
    if not role:
        return jsonify({"error": "Invalid role"}), 400

    if len(password) < 8:
        return jsonify({"error": "Password must be at least 8 characters"}), 400

    new_user = User(
        name=name,
        email=email,
        contact=contact,
        password=password,
        active=True,
    )
    new_user.roles.append(role)
    db.session.add(new_user)

    try:
        db.session.commit()
        return jsonify({"data": {"message": "Registration successful"}}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Registration failed"}), 500


@bp.route("/login", methods=["POST"])
@csrf.exempt
def login():
    """
    Login a user and return a JWT token if not expired or create new ones.
    """
    data = request.json

    if not data:
        return jsonify({"error": "No data provided"}), 400

    email = data.get("email")
    password = data.get("password")

    if not all([email, password]):
        return jsonify({"error": "All fields are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "No such user"}), 400

    if not user.active:
        return jsonify({"error": "User is inactive"}), 403

    if not user.verify_password(password):
        return jsonify({"error": "Invalid password"}), 400

    # get the user role
    role = user.role or User.query.filter_by(email=email).first().role

    # Check for existing token
    existing_token = Token.query.filter_by(user_id=user.id, revoked=False).first()

    if existing_token and not existing_token.is_expired():
        # Existing valid token found
        return (
            jsonify(
                {
                    "data": {
                        "message": "Login successful",
                        "access_token": existing_token.access_token,
                        "refresh_token": existing_token.refresh_token,
                        "role": role,
                    }
                }
            ),
            200,
        )

    # Create new JWT tokens
    access_token = create_access_token(
        identity=user.id, expires_delta=None  # Change expiration as needed
    )
    refresh_token = create_refresh_token(identity=user.id)

    # Store new tokens in the database
    new_token = Token(
        user_id=user.id,
        access_token=access_token,
        refresh_token=refresh_token,
        revoked=False,
        expires_at=datetime.utcnow() + timedelta(minutes=15),  # Example expiration time
    )
    db.session.add(new_token)
    db.session.commit()

    return (
        jsonify(
            {
                "data": {
                    "message": "Login successful",
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                    "role": role,
                }
            }
        ),
        200,
    )


@bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    """
    Refresh an expired token.
    """
    data = request.json

    if not data:
        return jsonify({"error": "No data provided"}), 400

    refresh_token = data.get("refresh_token")

    if not refresh_token:
        return jsonify({"error": "Refresh token is required"}), 400

    token = Token.query.filter_by(refresh_token=refresh_token, revoked=False).first()

    if not token or token.is_expired():
        return jsonify({"error": "Invalid or expired refresh token"}), 400

    access_token = create_access_token(identity=token.user_id, expires_delta=None)
    refresh_token = create_refresh_token(identity=token.user_id)

    token.access_token = access_token
    token.refresh_token = refresh_token
    token.expires_at = datetime.utcnow() + timedelta(minutes=15)


@bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    """
    Revoke the current token.
    """
    data = request.json

    if not data:
        return jsonify({"error": "No data provided"}), 400

    access_token = data.get("access_token")

    if not access_token:
        return jsonify({"error": "Access token is required"}), 400

    token = Token.query.filter_by(access_token=access_token, revoked=False).first()

    if not token:
        return jsonify({"error": "Invalid access token"}), 400

    token.revoked = True
    db.session.commit()

    return jsonify({"data": {"message": "Logout successful"}}), 200


# def delete_expired_users():
#     expiration_time = datetime.utcnow() - timedelta(minutes=10)
#     expired_users = PendingUser.query.filter(
#         PendingUser.created_at < expiration_time, PendingUser.is_verified == False
#     ).all()

#     for user in expired_users:
#         db.session.delete(user)
#     db.session.commit()
