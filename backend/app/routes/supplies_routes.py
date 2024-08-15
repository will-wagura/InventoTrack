from flask import Blueprint, request, jsonify
from app import db
from app.models import SupplyRequest
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_security import roles_required
from . import admin_required

# Define the Blueprint
supplies = Blueprint("supplies_routes", __name__)


@supplies.route("/supply", methods=["GET"])
@jwt_required()
@admin_required
def get_supplies():
    supplies = SupplyRequest.query.all()
    supply_list = [supply.to_dict() for supply in supplies]
    return jsonify(supply_list), 200


@supplies.route("/supply/<int:id>", methods=["GET"])
@jwt_required()
@roles_required("admin")
def get_supply(id):
    supply = SupplyRequest.query.get_or_404(id)
    return jsonify(supply.to_dict()), 200


@supplies.route("/supply", methods=["POST"])
@jwt_required()
@roles_required("admin")
def create_supply():
    data = request.get_json()
    user_id = get_jwt_identity()

    new_supply = SupplyRequest(
        name=data["name"],
        description=data.get("description", ""),
        quantity=data["quantity"],
        created_by=user_id,
    )

    db.session.add(new_supply)
    db.session.commit()

    return jsonify(new_supply.to_dict()), 201


@supplies.route("/supply/<int:id>", methods=["PUT"])
@jwt_required()
@roles_required("admin")
def update_supply(id):
    data = request.get_json()
    supply = SupplyRequest.query.get_or_404(id)

    supply.name = data.get("name", supply.name)
    supply.description = data.get("description", supply.description)
    supply.quantity = data.get("quantity", supply.quantity)

    db.session.commit()

    return jsonify(supply.to_dict()), 200


@supplies.route("/supply/<int:id>", methods=["DELETE"])
@jwt_required()
@roles_required("admin")
def delete_supply(id):
    supply = SupplyRequest.query.get_or_404(id)
    db.session.delete(supply)
    db.session.commit()

    return jsonify({"message": "Supply deleted successfully"}), 200
