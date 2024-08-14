from flask import Blueprint, request, jsonify
from app import db
from app.models import Product
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_security import roles_required
from datetime import datetime

# Define the Blueprint
products = Blueprint('product_routes', __name__)

@products.route('/product', methods=['GET'])
@jwt_required()
@roles_required('admin')
def get_products():
    products = Product.query.all()
    product_list = [product.to_dict() for product in products]
    return jsonify(product_list), 200

@products.route('/product/<int:id>', methods=['GET'])
@jwt_required()
@roles_required('admin')
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.to_dict()), 200

@products.route('/product', methods=['POST'])
@jwt_required()
@roles_required('admin')
def create_product():
    data = request.get_json()
    user_id = get_jwt_identity()
    
    new_product = Product(
        name=data['name'],
        description=data.get('description', ''),
        price=data['price'],
        created_by=user_id
    )
    
    db.session.add(new_product)
    db.session.commit()
    
    return jsonify(new_product.to_dict()), 201

@products.route('/product/<int:id>', methods=['PUT'])
@jwt_required()
@roles_required('admin')
def update_product(id):
    data = request.get_json()
    product = Product.query.get_or_404(id)
    
    product.name = data.get('name', product.name)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    product.updated_at = datetime.utcnow()
    
    db.session.commit()
    
    return jsonify(product.to_dict()), 200

@products.route('/product/<int:id>', methods=['DELETE'])
@jwt_required()
@roles_required('admin')
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    
    return jsonify({"message": "Product deleted successfully"}), 200