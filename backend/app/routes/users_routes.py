from flask import Blueprint, request, jsonify
from app import db
from app.models import User
from flask_jwt_extended import jwt_required
from flask_security import roles_required

# Define the Blueprint
users_routes = Blueprint("users_routes", __name__)


@users_routes.route("/users", methods=["GET"])
@jwt_required()
@roles_required("superuser")
def get_users():
    users = User.query.all()
    user_list = [user.to_dict() for user in users]
    return jsonify(user_list), 200


@users_routes.route("/user/<int:id>", methods=["GET"])
@jwt_required()
@roles_required("superuser")
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.to_dict()), 200


@users_routes.route("/user/<int:id>", methods=["PUT"])
@jwt_required()
@roles_required("superuser")
def update_user(id):
    data = request.get_json()
    user = User.query.get_or_404(id)

    user.email = data.get("email", user.email)
    user.active = data.get("active", user.active)

    db.session.commit()

    return jsonify(user.to_dict()), 200


@users_routes.route("/user/<int:id>", methods=["DELETE"])
@jwt_required()
@roles_required("superuser")
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"}), 200


@users_routes.route("/test", methods=["GET"])
def test():
    return jsonify({"message": "Test route, shows API is working fine"}), 200
