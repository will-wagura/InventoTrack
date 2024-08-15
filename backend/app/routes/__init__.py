import functools
from flask import make_response, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from app.models import User


def admin_required(fn):
    @functools.wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user or not any(
            role.name in ["admin", "superadmin"] for role in user.roles
        ):
            return make_response(
                jsonify({"msg": "Admins only! Access forbidden."}),
                403,
            )
        return fn(*args, **kwargs)

    return wrapper


def superuser_required(fn):
    @functools.wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user or not any(role.name == "superadmin" for role in user.roles):
            return make_response(
                jsonify({"msg": "Superusers only! Access forbidden."}),
                403,
            )
        return fn(*args, **kwargs)

    return wrapper
