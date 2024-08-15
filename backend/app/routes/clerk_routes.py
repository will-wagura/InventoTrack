# from flask_jwt_extended import jwt_required
# from models import db, User, Role
# from flask import Blueprint, request, jsonify

# # Define the Blueprint
# clerk_routes = Blueprint("clerk_routes", __name__)


# @clerk_routes.route("/items", methods=["GET"])
# @jwt_required()
# def get_items():
#     items = Item.query.all()
#     item_list = [item.to_dict() for item in items]
#     return jsonify(item_list), 200
