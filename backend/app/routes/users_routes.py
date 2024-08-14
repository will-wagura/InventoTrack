from datetime import datetime
from itsdangerous import BadSignature, SignatureExpired, URLSafeTimedSerializer
from flask import Blueprint, make_response, request, jsonify, url_for
from flask_mail import Message
from app import db, mail, s, bcrypt
from app.models import User, PendingUser
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_security import roles_required
from . import (
    admin_required,
    superuser_required,
)  # use custom decorators instead of flask_security's roles_required (Too many bugs )
from ..utilities.token import generate_invitation_token
from ..services.email_service import EmailService
import os

# Define the Blueprint
users_routes = Blueprint("users_routes", __name__)


@users_routes.route("/users", methods=["GET"])
@jwt_required()
@superuser_required
def get_users():
    users = User.query.all()
    user_list = [user.to_dict() for user in users]
    return jsonify(user_list), 200


@users_routes.route("/reg_users", methods=["POST"])
@jwt_required()
@superuser_required
def create_user():
    data = request.get_json()
    name = data.get("name")
    # tf_phone_number = data.get("tf_phone_number")
    email = data.get("email")
    password = data.get("password")
    role_name = data.get("role")

    if not all([name, email, password, role_name]):
        return jsonify({"error": "All fields are required"}), 400

    # Check for existing pending user
    if PendingUser.query.filter_by(email=email).first():
        return jsonify({"error": "A pending user with this email already exists"}), 400

    # Check for existing user
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "A user with this email already exists"}), 400

    # # Check if the role exists
    # role = Role.query.filter_by(name=role_name).first()
    # if not role:
    #     return jsonify({"error": "The specified role does not exist"}), 400

    # Create a pending user
    pending_user = PendingUser(
        name=name,
        email=email,
        password=bcrypt.generate_password_hash(password).decode("utf-8"),
        role=role_name,
    )
    db.session.add(pending_user)
    db.session.commit()

    # Generate a token for email verification
    token = s.dumps(email, salt="email-confirm")

    # Send the verification email
    try:
        EmailService.send_invitation(email, token)
    except Exception as e:
        db.session.delete(pending_user)
        db.session.commit()
        return make_response(
            jsonify({"error": f"{e} Email could not be sent. User not created."}), 500
        )

    return (
        jsonify(
            {
                "msg": "User created successfully. Please check your email to confirm your account."
            }
        ),
        201,
    )


@users_routes.route("/confirm_email/<token>", methods=["GET"])
def confirm_email(token):
    try:
        email = s.loads(
            token, salt="email-confirm", max_age=3600
        )  # Token expires after 1 hour
    except SignatureExpired:
        return jsonify({"error": "The confirmation link has expired."}), 400
    except BadSignature:
        return jsonify({"error": "Invalid confirmation token."}), 400

    pending_user = PendingUser.query.filter_by(email=email).first()
    if not pending_user:
        return jsonify({"error": "No pending user found with this email."}), 400

    user = User(
        name=pending_user.name,
        email=pending_user.email,
        password_hash=pending_user.password,  # Ensure password is hashed
        active=True,
        role=pending_user.role,
        confirmed_at=datetime.now(),
    )
    db.session.add(user)
    db.session.delete(pending_user)
    db.session.commit()

    return (
        jsonify({"msg": "Your account has been confirmed and created successfully."}),
        200,
    )


# THIS ALLOWS USER TO COPY AND PASS THE TOKEN TO THE FRONTEND

# @users_routes.route("/confirm_email", methods=["POST"])
# def confirm_email():
#     data = request.get_json()
#     token = data.get("token")

#     if not token:
#         return jsonify({"error": "Token is required"}), 400

#     try:
#         email = s.loads(
#             token, salt="email-confirm", max_age=3600
#         )  # Token expires after 1 hour
#     except SignatureExpired:
#         return jsonify({"error": "The confirmation link has expired."}), 400
#     except BadSignature:
#         return jsonify({"error": "Invalid confirmation token."}), 400

#     pending_user = PendingUser.query.filter_by(email=email).first()
#     if not pending_user:
#         return jsonify({"error": "No pending user found with this email."}), 400

#     # Create a new user and transfer data from the pending user
#     user = User(
#         name=pending_user.name,
#         email=pending_user.email,
#         password_hash=pending_user.password,
#         active=True,
#         confirmed_at=datetime.now(),
#     )
#     db.session.add(user)
#     db.session.delete(pending_user)
#     db.session.commit()

#     return (
#         jsonify({"msg": "Your account has been confirmed and created successfully."}),
#         200,
#     )


@users_routes.route("/user/<int:id>", methods=["GET"])
@jwt_required()
@superuser_required
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.to_dict()), 200


@users_routes.route("/me", methods=["GET"])
@jwt_required()
def who_am_i():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify(user.to_dict()), 200


# revoke user access to system
@users_routes.route("/user/<int:id>", methods=["PATCH"])
@superuser_required
def revoke_user_access(id):
    data = request.get_json()
    user = User.query.get_or_404(id)
    user.active = data.get("active", user.active)
    db.session.commit()
    return jsonify(user.to_dict()), 200


# @users_routes.route("/user/<int:id>", methods=["PUT"])
# @jwt_required()
# @superuser_required
# def update_user(id):
#     data = request.get_json()
#     user = User.query.get_or_404(id)

#     user.email = data.get("email", user.email)
#     user.active = data.get("active", user.active)

#     if user.email != data.get("email"):
#         user.email = data.get("email")
#         user.confirmed_at = None
#     if user.active != data.get("active"):
#         user.active = data.get("active")
#         user.confirmed_at = None

#     db.session.commit()

#     return jsonify(user.to_dict()), 200


@users_routes.route("/user/<int:id>", methods=["DELETE"])
@jwt_required()
@superuser_required
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"}), 200


@users_routes.route("/test", methods=["GET"])
def test():
    return jsonify({"message": "Test route, shows API is working fine"}), 200
