from flask import Blueprint, request, jsonify
from . import admin_required
from app.models import Store

# Define the Blueprint

stores_bp = Blueprint("store_routes", __name__)


@stores_bp.route("/stores", methods=["GET"])
# @admin_required
def get_stores():
    stores = Store.query.all()
    store_list = [store.to_dict() for store in stores]
    return jsonify(store_list), 200
